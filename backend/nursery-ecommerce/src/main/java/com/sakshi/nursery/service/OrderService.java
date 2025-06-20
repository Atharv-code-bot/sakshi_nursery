package com.sakshi.nursery.service;

import com.sakshi.nursery.dto.*;
import com.sakshi.nursery.model.*;
import com.sakshi.nursery.repository.*;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.math.BigDecimal;
import java.util.*;

@Service
@Transactional
public class OrderService {
    @PersistenceContext
    private EntityManager entityManager;
    private static final int MIN = 9921;
    private static final int MAX = 999999;
    @Autowired
    private CartItemRepository cartItemRepository;
    @Autowired
    private OrderRepository orderRepo;
    @Autowired
    private ProductRepository productRepo;
    @Autowired
    private OrderItemRepository orderItemRepo;
    @Autowired
    private CartRepo cartRepo;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private ProductRepository productRepository;

    public Order placeOrderAfterPayment(User user, String address, Date deliveryDate, BigDecimal amountFromPayment) {
        Cart cart = cartRepo.findByUserId(user.getId())
                .orElseThrow(() -> new RuntimeException("Cart not found"));

        List<CartItem> cartItems = cart.getItems();
        if (cartItems.isEmpty()) throw new RuntimeException("Cart is empty");

        Order order = new Order();
        order.setId(UUID.randomUUID().toString());
        order.setUser(user);
        order.setStatus(OrderStatus.PENDING);
        order.setBookingDate(new java.sql.Date(System.currentTimeMillis()));
        order.setAddress(address);
        order.setDeliveryDate(deliveryDate);
        order.setPricePaid(amountFromPayment);

        List<OrderItem> orderItemList = new ArrayList<>();
        BigDecimal totalOrderAmount = BigDecimal.ZERO;

        for (CartItem cartItem : cartItems) {
            Product product = productRepository.findById(cartItem.getProduct().getId())
                    .orElseThrow(() -> new RuntimeException("Product not found"));

            int changedQuantity = product.getStockQuantity() - cartItem.getQuantity();
            if (changedQuantity < 500) {
                product.setStatus(ProductStatus.OUT_OF_STOCK);
            }
            product.setStockQuantity(changedQuantity);
            productRepository.save(product);

            BigDecimal itemPrice = product.getPrice();
            BigDecimal totalItemPrice = itemPrice.multiply(BigDecimal.valueOf(cartItem.getQuantity()));

            OrderItem item = new OrderItem();
            item.setOrder(order);
            item.setProduct(product);
            item.setQuantity(cartItem.getQuantity());
            item.setPrice(itemPrice);


            orderItemList.add(item);
            totalOrderAmount = totalOrderAmount.add(totalItemPrice);

            // 🟢 Clean cart item
            cartItemRepository.delete(cartItem);
        }

        order.setItems(orderItemList);
        order.setTotalPrice(totalOrderAmount);

        Order savedOrder = orderRepo.save(order);

        return savedOrder;
    }

    public List<OrderResponseDTO> getOrdersByUserID(long userId) {
        List<Order> orders = orderRepo.findAllByUserId(userId);
        if (orders.isEmpty()) throw new RuntimeException("No orders found for user");

        List<OrderResponseDTO> responseList = new ArrayList<>();

        for (Order order : orders) {
            List<OrderItemResponseDTO> itemDTOs = new ArrayList<>();
            for (OrderItem item : order.getItems()) {
                itemDTOs.add(new OrderItemResponseDTO(
                        new ProductResponseDTO(item.getProduct()),
                        item.getQuantity(),
                        item.getPrice()
                ));
            }

            OrderResponseDTO dto = new OrderResponseDTO(
                    order.getId(),
                    order.getDeliveryDate(),
                    order.getBookingDate(),
                    order.getAddress(),
                    order.getStatus(),
                    order.getTotalPrice(),
                    order.getPricePaid(),
                    itemDTOs
            );

            responseList.add(dto);
        }

        return responseList;
    }


    public List<OrderResponseDTO> getAllOrdersStructured() {
        List<Order> allOrders = orderRepo.findAll();

        return allOrders.stream().map(order -> {
            List<OrderItemResponseDTO> itemDTOs = order.getItems().stream()
                    .map(item -> new OrderItemResponseDTO(
                            new ProductResponseDTO(item.getProduct()),
                            item.getQuantity(),
                            item.getPrice()
                    )).toList();

            return new OrderResponseDTO(
                    order.getId(),
                    order.getDeliveryDate(),
                    order.getBookingDate(),
                    order.getAddress(),
                    order.getStatus(),
                    order.getTotalPrice(),
                    order.getPricePaid(),
                    itemDTOs
            );
        }).toList();
    }

//    public void updateSingleOrderItemByCustomerNameAndAddress(AdminOrderResponseDTO dto, Long userId, Long productId) {
//        // Find user by name
//        User user = userRepository.findById(userId).orElse(null);
//        if (user == null) throw new RuntimeException("user Not found");
//
//        Product product = productRepository.findByName(dto.getProductName()).orElseThrow(() -> new RuntimeException("not Found"));
//
//
//        // Find orders for this user
//        Order orders = orderRepo.findByUserId(user.getId()).orElse(null);
//
//        if (orders == null) {
//            throw new RuntimeException("No orders found for user: " + dto.getCustomerName());
//        }
//        OrderItem orderItem = orderItemRepo.findByOrder_IdAndProduct_Id(orders.getId(), productId).orElseThrow(() -> new RuntimeException("not found"));
//        orderItem.setDeliveryDate(dto.getDeliveryDate());
//        orderItem.setPaymentStatus(dto.getPaymentStatus());
//        System.out.println(orderItem.getPaymentStatus());
//        orderItem.setStatus(dto.getStatus());
//        orderItem.setPrice(dto.getPrice());
//        orderItem.setOrder(new Order(orders.getId()));
//        orderItem.setPrice(dto.getPrice());
//        orderItem.setQuantity(dto.getQuantity());
//        orderItem.setTotalPrice(dto.getTotalPrice());
//        orderItem.setProduct(new Product(product.getId()));
//        orderItemRepo.save(orderItem);
//
//    }
    private String generateRandomSixDigitId() {
        Random random = new Random();
        int randomNum = random.nextInt(MAX - MIN + 1) + MIN;
        return String.format("%06d", randomNum);
    }
    public OrderResponseDTO getOrderByOrderId(String orderId) {
        Order order = orderRepo.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found"));

        List<OrderItemResponseDTO> itemDTOs = order.getItems().stream()
                .map(item -> new OrderItemResponseDTO(
                        new ProductResponseDTO(item.getProduct()),
                        item.getQuantity(),
                        item.getPrice()
                )).toList();

        return new OrderResponseDTO(
                order.getId(),
                order.getDeliveryDate(),
                order.getBookingDate(),
                order.getAddress(),
                order.getStatus(),
                order.getTotalPrice(),
                order.getPricePaid(),
                itemDTOs
        );
    }

//    public List<OrderResponseDTO> getOrdersByUserName(String username) {
//        List<User> user = userRepository.findByName(username)
//                .orElseThrow(() -> new RuntimeException("User not found"));
//
//        List<Order> orders = orderRepo.findAllByUserId(user.getId());
//        if (orders.isEmpty()) throw new RuntimeException("No orders found for user");
//
//        return orders.stream().map(order -> {
//            List<OrderItemResponseDTO> items = order.getItems().stream()
//                    .map(item -> new OrderItemResponseDTO(
//                            new ProductResponseDTO(item.getProduct()),
//                            item.getQuantity(),
//                            item.getPrice()
//                    )).toList();
//
//            return new OrderResponseDTO(
//                    order.getId(),
//                    order.getDeliveryDate(),
//                    order.getAddress(),
//                    order.getStatus(),
//                    order.getTotalPrice(),
//                    order.getPricePaid(),
//                    items
//            );
//        }).toList();
//    }


    public String updateOrderStatus(AcceptStatus acceptStatus) {
        Order order = orderRepo.findById(acceptStatus.getOrderID())
                .orElseThrow(() -> new RuntimeException("Order not found"));

        order.setStatus(acceptStatus.getNewstatus());
        orderRepo.save(order);

        return "Order status updated successfully.";
    }

}
