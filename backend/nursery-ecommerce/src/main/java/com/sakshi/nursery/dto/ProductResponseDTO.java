package com.sakshi.nursery.dto;
import com.sakshi.nursery.model.Product;
import com.sakshi.nursery.model.ProductStatus;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.List;
import java.util.stream.Collectors;

@NoArgsConstructor

@Data
public class ProductResponseDTO {
    private Long id;
    private String name;
    private String description;
    private BigDecimal price;
    private Integer stockQuantity;
    private List<String> imageUrls; // ✅ Change from single imageUrl to list
    private CategoryDTO category;
    private ProductStatus status;


    public ProductResponseDTO(Product product) {
        this.id = product.getId();
        this.name = product.getName();
        this.description = product.getDescription();
        this.price = product.getPrice();
        this.stockQuantity = product.getStockQuantity();
        this.status=product.getStatus();

        // Remove base path to make paths relative
        String basePath = "C:\\Users\\DEll\\OneDrive\\Desktop\\NurseryBackend\\backend\\nursery-ecommerce\\";

        this.imageUrls = product.getImages().stream()
                .map(img -> img.getImagePath().replace(basePath, "").replace("\\", "/"))
                .collect(Collectors.toList());

        this.category = new CategoryDTO(
                product.getCategory().getId(),
                product.getCategory().getName()
        );
    }



    // Getters and Setters (or use Lombok @Getter/@Setter if you prefer)
}
