package com.sakshi.nursery.service;

import com.razorpay.Order;
import com.razorpay.RazorpayClient;
import com.sakshi.nursery.config.AuthUtil;
import com.sakshi.nursery.dto.ConfirmPaymentRequestDTO;
import com.sakshi.nursery.dto.PaymentInfoDTO;
import com.sakshi.nursery.model.Cart;
import com.sakshi.nursery.model.CartItem;
import com.sakshi.nursery.model.PaymentOrder;
import com.sakshi.nursery.model.User;
import com.sakshi.nursery.repository.CartItemRepository;
import com.sakshi.nursery.repository.CartRepo;
import com.sakshi.nursery.repository.PaymentOrderRepository;
import org.apache.commons.codec.binary.Hex;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import java.math.BigDecimal;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@Service
public class PaymentService {

    @Autowired
    private RazorpayClient razorpayClient;

    @Autowired
    private PaymentOrderRepository paymentOrderRepository;

    @Autowired
    private AuthUtil authUtil;

    @Autowired
    private OrderService orderService;

    @Autowired
    private CartRepo cartRepository;

    @Autowired
    private CartItemRepository cartItemRepository;

    @Value("${razorpay.key_secret}")
    private String RAZORPAY_SECRET;

    public ResponseEntity<?> createPaymentOrder(Map<String, Object> data) {
        User user = authUtil.getLoggedInUser();

        Cart cart = cartRepository.findByUserId(user.getId())
                .orElseThrow(() -> new RuntimeException("Cart not found"));

        List<CartItem> items = cartItemRepository.findByCartId(cart.getId());
        if (items.isEmpty()) throw new RuntimeException("Cart is empty");


        try {
            int amount = (int) data.get("amount");

            JSONObject options = new JSONObject();
            options.put("amount", amount * 100); // Razorpay expects paise
            options.put("currency", "INR");
            options.put("receipt", "txn_" + UUID.randomUUID());

            Order razorpayOrder = razorpayClient.orders.create(options);

            PaymentOrder paymentOrder = new PaymentOrder();

            BigDecimal amountInINR = BigDecimal.valueOf(amount);
            paymentOrder.setAmount(amountInINR);
            paymentOrder.setCurrency(razorpayOrder.get("currency"));
            paymentOrder.setReceipt(razorpayOrder.get("receipt"));
            paymentOrder.setRazorpayOrderId(razorpayOrder.get("id"));
            paymentOrder.setStatus("CREATED");
            paymentOrderRepository.save(paymentOrder);

            return ResponseEntity.ok(razorpayOrder.toString());

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error creating Razorpay order: " + e.getMessage());
        }
    }

    @Transactional
    public ResponseEntity<?> verifyPayment(ConfirmPaymentRequestDTO request) throws Exception {
        String razorpayOrderId = request.getRazorpayOrderId();
        String razorpayPaymentId = request.getRazorpayPaymentId();
        String razorpaySignature = request.getRazorpaySignature();
        String address=request.getAddress();
        Date deliveryDate=request.getDeliveryDate();

        String payload = razorpayOrderId + "|" + razorpayPaymentId;
        String expectedSignature = hmacSha256(payload, RAZORPAY_SECRET);

        PaymentOrder paymentOrder = paymentOrderRepository.findByRazorpayOrderId(razorpayOrderId)
                .orElseThrow(() -> new RuntimeException("Payment order not found"));

        if (expectedSignature.equals(razorpaySignature)) {
            paymentOrder.setRazorpayPaymentId(razorpayPaymentId);
            paymentOrder.setRazorpaySignature(razorpaySignature);
            paymentOrder.setStatus("SUCCESS");

            // ✅ Create Order and associate it with PaymentOrder
            User user = authUtil.getLoggedInUser();
            com.sakshi.nursery.model.Order order = orderService.placeOrderAfterPayment(
                    user,
                    address,
                    deliveryDate,
                    paymentOrder.getAmount()
            );
            paymentOrder.setOrder(order); // 🟢 Associate order
            paymentOrderRepository.save(paymentOrder);

            return ResponseEntity.ok("Payment verified and order created.");
        } else {
            paymentOrder.setStatus("FAILED");
            paymentOrder.setRazorpaySignature(razorpaySignature);
            paymentOrderRepository.save(paymentOrder);
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("Invalid payment signature");
        }
    }


    private String hmacSha256(String data, String key) throws Exception {
        SecretKeySpec secretKeySpec = new SecretKeySpec(key.getBytes(), "HmacSHA256");
        Mac mac = Mac.getInstance("HmacSHA256");
        mac.init(secretKeySpec);
        byte[] hash = mac.doFinal(data.getBytes());
        return Hex.encodeHexString(hash);
    }


    public PaymentInfoDTO getPaymentInfoByOrderId(String orderId) {
        PaymentOrder paymentOrder = paymentOrderRepository.findByOrder_Id(orderId)
                .orElseThrow(() -> new RuntimeException("Payment info not found for order ID"));

        return new PaymentInfoDTO(
                paymentOrder.getRazorpayOrderId(),
                paymentOrder.getRazorpayPaymentId(),
                paymentOrder.getRazorpaySignature(),
                paymentOrder.getAmount(),
                paymentOrder.getCurrency(),
                paymentOrder.getReceipt(),
                paymentOrder.getStatus()
        );
    }

}

