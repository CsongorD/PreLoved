```java
package com.codecool.elproyectegrande.service;

import com.codecool.elproyectegrande.controller.dto.NewProductDTO;
import com.codecool.elproyectegrande.dao.model.Product;
import com.codecool.elproyectegrande.dao.ProductDAO;
import com.codecool.elproyectegrande.dao.ClientDAO;
import com.codecool.elproyectegrande.security.Role;
import okhttp3.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Value; // Import Value
import com.fasterxml.jackson.databind.JsonNode; // Import JsonNode
import com.fasterxml.jackson.databind.ObjectMapper; // Import ObjectMapper
import org.springframework.security.core.Authentication; // Import Authentication
import org.springframework.security.core.context.SecurityContextHolder; // Import SecurityContextHolder
import com.codecool.elproyectegrande.dao.model.Client; // Import Client

import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors; // Import Collectors

@Service
public class ProductService {
    private ProductDAO productDAO;
    private final ClientDAO clientDAO;

    @Value("${serper.api.key}") // Inject Serper API key
    private String serperApiKey;

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
    public void addNewProduct(NewProductDTO product) throws IOException {

        OkHttpClient client = new OkHttpClient().newBuilder()
                .build();
        MediaType mediaType = MediaType.parse("application/json");
        RequestBody body = RequestBody.create(mediaType, "{\"q\":\""+product.name()+"\"}");
        Request request = new Request.Builder()
                .url("https://google.serper.dev/search")
                .method("POST", body)
                .addHeader("X-API-KEY", serperApiKey) // Use injected API key
                .addHeader("Content-Type", "application/json")
                .build();
        Response response = client.newCall(request).execute();

        if (!response.isSuccessful()) {
            throw new IOException("Unexpected response from Serper API: " + response.code() + " " + response.message());
        }

        String responseData = response.body().string();

        ObjectMapper objectMapper = new ObjectMapper();
        JsonNode rootNode = objectMapper.readTree(responseData);

        String imageUrl = "https://via.placeholder.com/150"; // Default placeholder image

        // Safely navigate the JSON structure to find the image URL
        // Assuming the image URL is in the first organic result's thumbnail
        JsonNode organicResults = rootNode.get("organic_results");
        if (organicResults != null && organicResults.isArray() && organicResults.size() > 0) {
            JsonNode firstResult = organicResults.get(0);
            JsonNode thumbnail = firstResult.get("thumbnail");
            if (thumbnail != null && thumbnail.has("imageUrl")) {
                imageUrl = thumbnail.get("imageUrl").asText();
            }
        }

        // Get the authenticated user's client for the seller
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String currentUsername = authentication.getName();
        Client seller = clientDAO.findClientByClientName(currentUsername); // Assuming ClientDAO has this method

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

    public List<Product> getAllAvailableProducts(){ // Uncommented and fixed
        return productDAO.findAll().stream()
                                 .filter(product -> product.getBuyer() == null) // Filter where buyer is null
                                 .collect(Collectors.toList());
    }
}
```