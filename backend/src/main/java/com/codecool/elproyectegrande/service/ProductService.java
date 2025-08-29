package com.codecool.elproyectegrande.service;

import java.util.List;
import java.util.stream.Collectors;

import com.codecool.elproyectegrande.dto.request.CreateProductRequest;
import com.codecool.elproyectegrande.dto.response.ProductResponse;
import com.codecool.elproyectegrande.exception.BusinessLogicException;
import com.codecool.elproyectegrande.exception.ResourceNotFoundException;
import com.codecool.elproyectegrande.mapper.ProductMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.codecool.elproyectegrande.dao.ClientDAO;
import com.codecool.elproyectegrande.dao.ProductDAO;
import com.codecool.elproyectegrande.dao.model.Client;
import com.codecool.elproyectegrande.dao.model.Product;

/**
 * Service layer for product-related business operations.
 * Handles product creation, retrieval, updates, and deletion.
 */
@Service
@RequiredArgsConstructor
@Slf4j
public class ProductService {
    
    private final ProductDAO productDAO;
    private final ClientDAO clientDAO;
    private final ProductMapper productMapper;

    /**
     * Retrieves all products from the database.
     *
     * @return list of product response DTOs
     */
    @Transactional(readOnly = true)
    public List<ProductResponse> getAllProducts() {
        log.debug("Retrieving all products");
        return productDAO.findAll().stream()
                .map(productMapper::toResponse)
                .collect(Collectors.toList());
    }
    
    /**
     * Retrieves a product by its ID.
     *
     * @param id the product ID
     * @return the product response DTO
     * @throws ResourceNotFoundException if product is not found
     */
    @Transactional(readOnly = true)
    public ProductResponse getProductById(Long id) {
        log.debug("Retrieving product with id: {}", id);
        Product product = productDAO.findProductById(id);
        if (product == null) {
            throw new ResourceNotFoundException("Product", id);
        }
        return productMapper.toResponse(product);
    }
    
    /**
     * Creates a new product.
     *
     * @param request the product creation request
     * @return the created product response DTO
     * @throws BusinessLogicException if user is not authenticated
     */
    @Transactional
    public ProductResponse createProduct(CreateProductRequest request) {
        log.info("Creating new product: {}", request.getName());
        
        // Use a default placeholder image since we removed Serper API integration
        String imageUrl = "https://via.placeholder.com/400x300?text=" + request.getName().replace(" ", "+");

        // Get the authenticated user's client for the seller
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String currentUsername = authentication.getName();
        Client seller = clientDAO.findClientByClientName(currentUsername);

        if (seller == null) {
            throw new BusinessLogicException("Authenticated user not found as a client");
        }

        Product newProduct = Product.builder()
                .name(request.getName())
                .type(request.getType())
                .description(request.getDescription())
                .price(request.getPrice())
                .image(imageUrl)
                .seller(seller) // Set the seller object
                .buyer(null) // Initially no buyer
                .build();
        
        Product savedProduct = productDAO.save(newProduct);
        log.info("Successfully created product with id: {}", savedProduct.getId());
        return productMapper.toResponse(savedProduct);
    }

    /**
     * Updates an existing product.
     * Only the seller of the product can update it.
     *
     * @param id the product ID
     * @param updateProduct the updated product data
     * @throws ResourceNotFoundException if product is not found
     * @throws BusinessLogicException if user is not the seller
     */
    @Transactional
    public ProductResponse updateProductById(Long id, Product updateProduct) {
        log.info("Updating product with id: {}", id);
        Product currentProduct = productDAO.findProductById(id);
        if (currentProduct == null) {
            throw new ResourceNotFoundException("Product", id);
        }
        
        // Check if the current user is the seller
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String currentUsername = authentication.getName();
        if (!currentProduct.getSeller().getClientName().equals(currentUsername)) {
            throw new BusinessLogicException("Only the seller can update this product");
        }
        
        if (updateProduct.getName() != null) {
            currentProduct.setName(updateProduct.getName());
        }
        if (updateProduct.getDescription() != null) {
            currentProduct.setDescription(updateProduct.getDescription());
        }
        if (updateProduct.getPrice() != null && updateProduct.getPrice() > 0) {
            currentProduct.setPrice(updateProduct.getPrice());
        }
        if (updateProduct.getType() != null) {
            currentProduct.setType(updateProduct.getType());
        }
        
        Product savedProduct = productDAO.save(currentProduct);
        log.info("Successfully updated product with id: {}", id);
        return productMapper.toResponse(savedProduct);
    }

    /**
     * Deletes a product by its ID.
     * Only the seller of the product can delete it.
     *
     * @param id the product ID
     * @throws ResourceNotFoundException if product is not found
     * @throws BusinessLogicException if user is not the seller
     */
    @Transactional
    public void deleteProductById(Long id) {
        log.info("Deleting product with id: {}", id);
        Product product = productDAO.findProductById(id);
        if (product == null) {
            throw new ResourceNotFoundException("Product", id);
        }
        
        // Check if the current user is the seller
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String currentUsername = authentication.getName();
        if (!product.getSeller().getClientName().equals(currentUsername)) {
            throw new BusinessLogicException("Only the seller can delete this product");
        }
        
        productDAO.deleteById(id);
        log.info("Successfully deleted product with id: {}", id);
    }

    /**
     * Retrieves all available products (products without buyers).
     *
     * @return list of available product response DTOs
     */
    @Transactional(readOnly = true)
    public List<ProductResponse> getAllAvailableProducts() {
        log.debug("Retrieving all available products");
        return productDAO.findAll().stream()
                .filter(product -> product.getBuyer() == null)
                .map(productMapper::toResponse)
                .collect(Collectors.toList());
    }
}