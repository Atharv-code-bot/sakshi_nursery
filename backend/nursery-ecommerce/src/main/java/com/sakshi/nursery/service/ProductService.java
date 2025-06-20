package com.sakshi.nursery.service;

import com.sakshi.nursery.dto.ProductRequestDTO;
import com.sakshi.nursery.dto.ProductResponseDTO;
import com.sakshi.nursery.model.Category;
import com.sakshi.nursery.model.OrderItem;
import com.sakshi.nursery.model.Product;
import com.sakshi.nursery.model.ProductImage;
import com.sakshi.nursery.repository.CategoryRepository;
import com.sakshi.nursery.repository.OrderItemRepository;
import com.sakshi.nursery.repository.ProductImageRepository;
import com.sakshi.nursery.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;
import java.util.stream.Collectors;

@Service
@Transactional
public class ProductService {

    private final ProductRepository productRepository;
    private final ProductImageRepository productImageRepository;
    private final OrderItemRepository orderItemRepository;
    private final CategoryRepository categoryRepository;

    @Autowired
    public ProductService(ProductRepository productRepository,
                          ProductImageRepository productImageRepository,
                          OrderItemRepository orderItemRepository,
                          CategoryRepository categoryRepository) {
        this.productRepository = productRepository;
        this.productImageRepository = productImageRepository;
        this.orderItemRepository = orderItemRepository;
        this.categoryRepository = categoryRepository;
    }

    public List<ProductResponseDTO> getAllProducts() {
        return productRepository.findAllWithImages()
                .stream()
                .map(ProductResponseDTO::new)
                .collect(Collectors.toList());
    }

    public ProductResponseDTO getProductByName(String name) {
        Product product = productRepository.findByName(name)
                .orElseThrow(() -> new RuntimeException("Product not found with name: " + name));
        return new ProductResponseDTO(product);
    }

    public ProductResponseDTO createProduct(ProductRequestDTO dto, MultipartFile[] files) {
        if (productRepository.findByName(dto.getName()).isPresent()) {
            throw new RuntimeException("Product name already exists: " + dto.getName());
        }

        Category category = getOrCreateCategoryByName(dto.getCategory());

        Product product = new Product();
        mapDtoToProduct(dto, product);
        product.setCategory(category);

        Product savedProduct = productRepository.save(product);
        uploadImages(savedProduct, files);

        return new ProductResponseDTO(productRepository.save(savedProduct));
    }

    public ProductResponseDTO updateProduct(Long id, ProductRequestDTO dto, MultipartFile[] files) {
        Product existing = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found with ID: " + id));

        mapDtoToProduct(dto, existing);
        existing.setCategory(getOrCreateCategoryByName(dto.getCategory()));

        if (files != null && files.length > 0) {
            deleteExistingImages(existing);
            uploadImages(existing, files);
        }

        return new ProductResponseDTO(productRepository.save(existing));
    }

    public void deleteProductByName(String name) {
        Product product = productRepository.findByName(name)
                .orElseThrow(() -> new RuntimeException("Product not found with name: " + name));

        deleteExistingImages(product);
        productImageRepository.deleteAll(product.getImages());
        orderItemRepository.deleteAll(orderItemRepository.findByProduct(product));
        productRepository.delete(product);
    }

    public List<ProductResponseDTO> getProductsByCategoryName(String name) {
        Category category = categoryRepository.findByName(name);
        if (category == null) {
            throw new RuntimeException("Category not found: " + name);
        }

        return productRepository.findByCategoryId(category.getId())
                .stream()
                .map(ProductResponseDTO::new)
                .collect(Collectors.toList());
    }

    public List<Category> getAllCategoryDTOs() {
        return categoryRepository.findAll();
    }

    // ---------- PRIVATE HELPER METHODS ------------

    private void mapDtoToProduct(ProductRequestDTO dto, Product product) {
        product.setName(dto.getName());
        product.setDescription(dto.getDescription());
        product.setPrice(dto.getPrice());
        product.setStockQuantity(dto.getStockQuantity());
        product.setStatus(dto.getStatus());
    }

    private Category getOrCreateCategoryByName(String categoryName) {
        Category category = categoryRepository.findByName(categoryName);
        if (category == null) {
            category = new Category();
            category.setName(categoryName);
            category = categoryRepository.save(category);
        }
        return category;
    }

    private void uploadImages(Product product, MultipartFile[] files) {
        if (files == null) return;

        for (MultipartFile file : files) {
            if (!file.isEmpty()) {
                try {
                    File uploadPath = new File("Products/" + product.getCategory().getName() + "/" + product.getName());
                    if (!uploadPath.exists()) uploadPath.mkdirs();

                    Path filePath = Paths.get(uploadPath.getAbsolutePath(), file.getOriginalFilename());
                    Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);

                    ProductImage image = new ProductImage();
                    image.setImagePath(filePath.toString());
                    image.setProduct(product);
                    product.getImages().add(image);
                } catch (IOException e) {
                    throw new RuntimeException("File storage failed: " + e.getMessage());
                }
            }
        }
    }

    private void deleteExistingImages(Product product) {
        List<ProductImage> oldImages = product.getImages();
        for (ProductImage image : oldImages) {
            File file = new File(image.getImagePath());
            if (file.exists()) file.delete();
        }
        oldImages.clear();
    }
}
