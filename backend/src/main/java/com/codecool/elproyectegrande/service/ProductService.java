package com.codecool.elproyectegrande.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.codecool.elproyectegrande.controller.dto.NewProductDTO;
import com.codecool.elproyectegrande.dao.ClientDAO;
import com.codecool.elproyectegrande.dao.ProductDAO;
import com.codecool.elproyectegrande.dao.model.Client;
import com.codecool.elproyectegrande.dao.model.Product;

@Service
public class ProductService {
    private ProductDAO productDAO;
    private final ClientDAO clientDAO;

    @Autowired
    public ProductService(ProductDAO productDAO,
                          ClientDAO clientDAO) {
        this.productDAO = productDAO;
        this.clientDAO = clientDAO;
    }
    public List<Product> getAllProducts() {
        return productDAO.findAll();
    }
    public Product getProductById(Long id) {
        return productDAO.findProductById(id);
    }
    
    public void addNewProduct(NewProductDTO product) {
        // Use a default placeholder image since we removed Serper API integration
        String imageUrl = "https://via.placeholder.com/400x300?text=" + product.name().replace(" ", "+");

        // Get the authenticated user's client for the seller
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String currentUsername = authentication.getName();
        Client seller = clientDAO.findClientByClientName(currentUsername);

        if (seller == null) {
            throw new IllegalStateException("Authenticated user not found as a client.");
        }

        Product newProduct = Product.builder()
                .name(product.name())
                .description(product.description())
                .price(product.price())
                .image(imageUrl)
                .type(product.type())
                .seller(seller) // Set the seller object
                .buyer(null) // Initially no buyer
                .build();
        productDAO.save(newProduct);
    }

    public void updateProductById(Long id, Product updateProduct){
        Product currentProduct = getProductById(id);
        if (currentProduct == null) {
            // Handle case where product is not found, e.g., throw an exception
            return;
        }
        if (updateProduct.getName() != null) currentProduct.setName(updateProduct.getName());
        if (updateProduct.getDescription() != null) currentProduct.setDescription(updateProduct.getDescription());
        if (updateProduct.getPrice() != 0) currentProduct.setPrice(updateProduct.getPrice());
        // Uncomment and update these lines if you want to allow updating seller/buyer
        // if (updateProduct.getSeller() != null) currentProduct.setSeller(updateProduct.getSeller());
        // if (updateProduct.getBuyer() != null) currentProduct.setBuyer(updateProduct.getBuyer());
        productDAO.save(currentProduct); // Save the updated product
    }

    public void deleteProductById(Long id){
        productDAO.deleteById(id);
    }

    public List<Product> getAllAvailableProducts(){
        return productDAO.findAll().stream()
                                 .filter(product -> product.getBuyer() == null) // Filter where buyer is null
                                 .collect(Collectors.toList());
    }
}