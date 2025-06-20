package com.sakshi.nursery.dto;

import com.sakshi.nursery.model.Product;
import com.sakshi.nursery.model.ProductStatus;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProductNotificationDTO {
    private Long id;
    private String name;
    private String description;
    private String categoryName;
    private ProductStatus status;


    public ProductNotificationDTO(ProductResponseDTO dto) {
        this.id = dto.getId();
        this.name = dto.getName();
        this.description = dto.getDescription();
        this.categoryName = dto.getCategory().getName();
        this.status = dto.getStatus();

    }



}
