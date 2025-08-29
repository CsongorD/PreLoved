package com.codecool.elproyectegrande.mapper;

import com.codecool.elproyectegrande.dao.model.Product;
import com.codecool.elproyectegrande.dto.response.ProductResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

/**
 * Mapper for converting between Product entities and DTOs.
 */
@Component
@RequiredArgsConstructor
public class ProductMapper {
    
    private final ClientMapper clientMapper;
    
    /**
     * Converts a Product entity to a ProductResponse DTO.
     *
     * @param product the product entity
     * @return the product response DTO
     */
    public ProductResponse toResponse(Product product) {
        if (product == null) {
            return null;
        }
        
        return ProductResponse.builder()
                .id(product.getId())
                .name(product.getName())
                .type(product.getType())
                .description(product.getDescription())
                .price(product.getPrice())
                .image(product.getImage())
                .seller(clientMapper.toResponse(product.getSeller()))
                .buyer(clientMapper.toResponse(product.getBuyer()))
                .available(product.isAvailable())
                .build();
    }
}