package com.codecool.elproyectegrande.dao.model;

import com.codecool.elproyectegrande.security.Role;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.*;
import org.jetbrains.annotations.NotNull;

import java.util.List;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Client {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false, unique = true)
    @NotNull
    private String clientName;
    @Column(nullable = false)
    @NotNull
    private String password;
    @Enumerated(EnumType.STRING) // Use EnumType.STRING to store enum name as string
    private Role role; // Change type from String to Role

    @OneToMany( mappedBy = "seller")
    @JsonManagedReference(value="seller-products") // Unique value for this relationship
    private List<Product> productsToSell;

    @OneToMany( mappedBy = "buyer")
    @JsonManagedReference(value="buyer-products") // Unique value for this relationship
    private List<Product> productsBought;
}