package com.sakshi.nursery.controller;

import com.sakshi.nursery.dto.ProductNotificationDTO;
import com.sakshi.nursery.dto.ProductRequestDTO;
import com.sakshi.nursery.dto.ProductResponseDTO;
import com.sakshi.nursery.model.Category;
import com.sakshi.nursery.model.PushNotificationRequest;
import com.sakshi.nursery.service.ProductService;
import com.sakshi.nursery.service.PushNotificationService;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
//import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/admin/products")
@PreAuthorize("hasRole('ADMIN')")
public class AdminProductController {

    private final ProductService productService;
    private final PushNotificationService pushNotificationService;

    public AdminProductController(ProductService productService, PushNotificationService pushNotificationService) {
        this.productService = productService;
        this.pushNotificationService = pushNotificationService;
    }

    @GetMapping("/all")
    public ResponseEntity<List<ProductResponseDTO>> getAllProducts() {
        return ResponseEntity.ok(productService.getAllProducts());
    }

    @GetMapping("/category/{name}")
    public ResponseEntity<List<ProductResponseDTO>> getProductsByCategory(@PathVariable String name) {
        return ResponseEntity.ok(productService.getProductsByCategoryName(name));
    }

    @PostMapping(path = "/create",consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<ProductResponseDTO> createProduct( @RequestPart("file") MultipartFile[] file,
                                                             @RequestPart("product") ProductRequestDTO productDTO,
                                                             @RequestParam("token") String token)
    {

        ProductResponseDTO savedProduct = productService.createProduct(productDTO, file);
        ProductNotificationDTO dto= new ProductNotificationDTO(savedProduct);

        pushNotificationService.sendPushNotificationToToken(token, dto);
        return new ResponseEntity<>(savedProduct, HttpStatus.CREATED);
    }

    @PutMapping(value = "/update/{productId}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<ProductResponseDTO> updateProduct(
            @PathVariable Long productId,
            @RequestPart("product") ProductRequestDTO productDTO,
            @RequestPart(value = "file", required = false) MultipartFile[] file) {

        ProductResponseDTO updatedProduct = productService.updateProduct(productId, productDTO, file);
        return ResponseEntity.ok(updatedProduct);
    }

    @DeleteMapping("/deleteByName/{name}")
    public ResponseEntity<Void> deleteProductByName(@PathVariable String name) {
        productService.deleteProductByName(name);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/product/{name}")
    public ResponseEntity<ProductResponseDTO> getProductByName(@PathVariable String name) {
        return ResponseEntity.ok(productService.getProductByName(name));
    }

    @GetMapping("/categories")
    public ResponseEntity<List<Category>> getAllCategories() {
        return ResponseEntity.ok(productService.getAllCategoryDTOs());
    }
}
