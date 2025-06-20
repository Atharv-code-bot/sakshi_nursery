package com.sakshi.nursery.controller;

import com.razorpay.Order;
import com.razorpay.RazorpayClient;
import com.razorpay.RazorpayException;
import com.sakshi.nursery.dto.ConfirmPaymentRequestDTO;
import com.sakshi.nursery.model.PaymentOrder;
import com.sakshi.nursery.repository.OrderRepository;
import com.sakshi.nursery.repository.PaymentOrderRepository;
import com.sakshi.nursery.service.PaymentService;
import org.apache.commons.codec.binary.Hex;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/api/payment")
public class PaymentController {

    @Autowired
    private PaymentService paymentService;

    @PostMapping("/create-order")
    public ResponseEntity<?> createOrder(@RequestBody Map<String, Object> data) {
        return paymentService.createPaymentOrder(data);
    }

    @PostMapping("/verify")
    public ResponseEntity<?> verifyPayment(@RequestBody ConfirmPaymentRequestDTO confirmPaymentRequestDTO) throws Exception {
        return paymentService.verifyPayment(confirmPaymentRequestDTO);
    }
}
