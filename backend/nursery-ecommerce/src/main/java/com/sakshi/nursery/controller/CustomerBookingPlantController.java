package com.sakshi.nursery.controller;

import com.sakshi.nursery.config.AuthUtil;

import com.sakshi.nursery.dto.OrderResponseDTO;
import com.sakshi.nursery.model.User;
import com.sakshi.nursery.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
@RestController
@RequestMapping("/api/Customer/orders")
//@PreAuthorize("hasRole('CUSTOMER')")
public class CustomerBookingPlantController {
    @Autowired
    private OrderService orderService;

    @Autowired
    private AuthUtil authUtil;


//    @PostMapping("/bookOrder")  //BookOrder
//    public ResponseEntity<CustomerOrderResponseDTO> placeOrder(@RequestParam long productID, @RequestBody BookingDTO bookingDTO) {
//        User user=authUtil.getLoggedInUser();
//
//        return ResponseEntity.ok(orderService.CustomerOrderPlant(user.getId(), productID,bookingDTO));
//    }

    @GetMapping("/customerAllBooking")      //CustomerAllBooking
    public List<OrderResponseDTO>getUserOrdersById() {
        User user=authUtil.getLoggedInUser();
        return orderService.getOrdersByUserID(user.getId());
    }


}

