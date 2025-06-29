package com.sakshi.nursery.dto;

import com.sakshi.nursery.model.Category;
import com.sakshi.nursery.model.ProductStatus;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProductRequestDTO {
    private String name;
    private String description;
    private BigDecimal price;
    private Integer stockQuantity;
    private CategoryDTO category;
    private ProductStatus status; // Should match ProductStatus enum
}
