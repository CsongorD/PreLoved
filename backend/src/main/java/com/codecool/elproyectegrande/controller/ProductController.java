package com.codecool.elproyectegrande.controller;


import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.codecool.elproyectegrande.dao.model.Product;
import com.codecool.elproyectegrande.dto.request.CreateProductRequest;
import com.codecool.elproyectegrande.dto.response.ProductResponse;
import com.codecool.elproyectegrande.service.ProductService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

/**
 * REST controller for product-related operations.
 * Handles HTTP requests for product management.
 */
@RestController
@RequestMapping("/products")
@RequiredArgsConstructor
public class ProductController {

    private final ProductService productService;

    /**
     * Retrieves all products.
     *
     * @return list of product response DTOs
     */
    @GetMapping("/all")
    public ResponseEntity<List<ProductResponse>> getAllProducts() {
        List<ProductResponse> products = productService.getAllProducts();
        return ResponseEntity.ok(products);
    }

    /**
     * Retrieves all available products.
     *
     * @return list of available product response DTOs
     */
    @GetMapping("/available")
    public ResponseEntity<List<ProductResponse>> getAvailableProducts() {
        List<ProductResponse> products = productService.getAllAvailableProducts();
        return ResponseEntity.ok(products);
    }

    /**
     * Retrieves a product by ID.
     *
     * @param id the product ID
     * @return the product response DTO
     */
    @GetMapping("/{id}")
    public ResponseEntity<ProductResponse> getProductById(@PathVariable Long id) {
        ProductResponse product = productService.getProductById(id);
        return ResponseEntity.ok(product);
    }

    /**
     * Creates a new product.
     *
     * @param request the product creation request
     * @return the created product response DTO
     */
    @PostMapping
    public ResponseEntity<ProductResponse> createProduct(@Valid @RequestBody CreateProductRequest request) {
        ProductResponse createdProduct = productService.createProduct(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdProduct);
    }

    /**
     * Updates an existing product.
     *
     * @param id the product ID
     * @param updatedProduct the updated product data
     * @return the updated product response DTO
     */
    @PutMapping("/{id}")
    public ResponseEntity<ProductResponse> updateProductById(@PathVariable("id") Long id, @RequestBody Product updatedProduct) {
        ProductResponse product = productService.updateProductById(id, updatedProduct);
        return ResponseEntity.ok(product);
    }

    /**
     * Deletes a product by ID.
     *
     * @param id the product ID
     * @return success response
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProductById(@PathVariable("id") Long id) {
        productService.deleteProductById(id);
        return ResponseEntity.noContent().build();
    }

}