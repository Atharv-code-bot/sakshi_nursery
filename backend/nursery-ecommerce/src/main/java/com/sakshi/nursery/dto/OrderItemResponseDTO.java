package com.sakshi.nursery.dto;

import com.sakshi.nursery.model.Product;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.math.BigDecimal;

@Data
@AllArgsConstructor
public class OrderItemResponseDTO {
    private ProductResponseDTO productDTO;
    private int quantity;
    private BigDecimal price;
}
