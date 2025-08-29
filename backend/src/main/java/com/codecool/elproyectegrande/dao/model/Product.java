package com.codecool.elproyectegrande.dao.model;

import org.jetbrains.annotations.NotNull;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false)
    @NotNull
    private String name;
    private String type;
    private String description;
    private Double price;
    private String image;

    @ManyToOne // Many products to one seller
    @JoinColumn(name = "seller_id") // This maps to the column in the product table
    private Client seller; // Changed from Long seller_id

    @ManyToOne // Many products to one buyer
    @JoinColumn(name = "buyer_id") // This maps to the column in the product table
    private Client buyer; // Changed from Long buyer_id

    public boolean isAvailable(){return buyer == null;} // Updated to use Client object
}