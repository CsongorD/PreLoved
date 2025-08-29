package com.codecool.elproyectegrande.dto.response;

import lombok.Builder;
import lombok.Data;

/**
 * Response DTO for product information.
 */
@Data
@Builder
public class ProductResponse {
    private Long id;
    private String name;
    private String type;
    private String description;
    private Double price;
    private String image;
    private ClientResponse seller;
    private ClientResponse buyer;
    private boolean available;
}