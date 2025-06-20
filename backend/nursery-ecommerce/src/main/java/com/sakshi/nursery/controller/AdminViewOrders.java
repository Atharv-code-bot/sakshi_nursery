package com.sakshi.nursery.controller;
import com.sakshi.nursery.dto.AcceptStatus;
import com.sakshi.nursery.dto.OrderResponseDTO;
import com.sakshi.nursery.dto.PaymentInfoDTO;
import com.sakshi.nursery.service.OrderService;
import com.sakshi.nursery.service.PaymentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/admin/orders")
//@PreAuthorize("hasRole('ADMIN')")
public class AdminViewOrders {
    @Autowired
    private OrderService orderService;

    @Autowired
    private PaymentService paymentService;

//    @GetMapping(value = "/OrderByUsername", produces = "application/json")
//    public List<OrderResponseDTO> getUserOrdersByUsername(@RequestParam String username) {
//        return orderService.getOrdersByUserName(username);
//    }

    @GetMapping("/AllOrders")
    public ResponseEntity<List<OrderResponseDTO>> getAllOrdersForAdmin() {
        List<OrderResponseDTO> orders = orderService.getAllOrdersStructured();
        return ResponseEntity.ok(orders);
    }

    @GetMapping("/orderByOrderId")
    public ResponseEntity<OrderResponseDTO> getUserOrderByID(@RequestBody Map<String, String> body) {
        String orderId = body.get("orderId");

        OrderResponseDTO order = orderService.getOrderByOrderId(orderId);
        return ResponseEntity.ok(order);
    }

    @GetMapping("/payment-info")
    public ResponseEntity<PaymentInfoDTO> getPaymentInfo(@RequestBody Map<String, String> body) {
        String orderId = body.get("orderId");
        return ResponseEntity.ok(paymentService.getPaymentInfoByOrderId(orderId));
    }




//    @PutMapping("/update")
//    public String updateOrdered(@RequestBody AdminOrderResponseDTO adminOrderResponseDTO,@RequestParam Long id,@RequestParam  Long productid){
//        orderService.updateSingleOrderItemByCustomerNameAndAddress(adminOrderResponseDTO,id,productid);
//        return "Updated Succesfully";
//    }



    @PutMapping("/update-status")
    public String updateStatus(@RequestBody AcceptStatus acceptStatus) {
        return orderService.updateOrderStatus(acceptStatus);
    }



}
