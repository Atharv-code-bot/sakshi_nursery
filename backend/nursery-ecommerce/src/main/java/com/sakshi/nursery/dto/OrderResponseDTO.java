package com.sakshi.nursery.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.sakshi.nursery.model.OrderStatus;
import com.sakshi.nursery.model.PaymentStatus;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;

@Data
@AllArgsConstructor
public class OrderResponseDTO {
    private String orderId;
    @JsonFormat(pattern = "yyyy-MM-dd", timezone = "Asia/Kolkata")
    private Date deliveryDate;

    @JsonFormat(pattern = "yyyy-MM-dd", timezone = "Asia/Kolkata")
    private Date bookingDate;
    private String address;
    private OrderStatus orderStatus;
    private BigDecimal totalPrice;
    private BigDecimal pricePaid;
    private List<OrderItemResponseDTO> items;
}
