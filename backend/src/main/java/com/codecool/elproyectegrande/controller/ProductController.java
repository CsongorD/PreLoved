package com.codecool.elproyectegrande.controller;


import com.codecool.elproyectegrande.controller.dto.NewProductDTO;
import com.codecool.elproyectegrande.dao.model.Product;
import com.codecool.elproyectegrande.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.slf4j.Logger; // Import Logger
import org.slf4j.LoggerFactory; // Import LoggerFactory

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/products")
public class ProductController {

    private static final Logger logger = LoggerFactory.getLogger(ProductController.class); // Initialize logger

    private ProductService productService;

    @Autowired
    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @GetMapping("/all")
    public List<Product> getAllProducts(){
       return productService.getAllProducts();
    }

    @GetMapping("/available") // Uncommented
    public List<Product> getAvailableProducts(){
       return productService.getAllAvailableProducts();
    }

    @GetMapping("/{id}")
    public Product getProductByID(@PathVariable Long id){
        return productService.getProductById(id);
    }

    @PostMapping
    public ResponseEntity<?> addNewProduct(@RequestBody NewProductDTO productDTO) { // Removed throws IOException
        try {
            productService.addNewProduct(productDTO);
            return ResponseEntity.ok().build();
        } catch (IOException e) {
            logger.error("Failed to add product due to image service error: " + e.getMessage(), e);
            return ResponseEntity.internalServerError().body("Failed to add product due to image service error.");
        }
    }

    @PutMapping("/{id}")
    public void updateProductById(@PathVariable("id") Long id, @RequestBody Product updatedProduct) {
        productService.updateProductById(id, updatedProduct);
    }

    @DeleteMapping("/{id}")
    public void deleteProductById(@PathVariable("id") Long id){
        productService.deleteProductById(id);
    }

}