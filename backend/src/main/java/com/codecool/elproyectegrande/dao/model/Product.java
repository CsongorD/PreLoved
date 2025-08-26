```java
package com.codecool.elproyectegrande.dao.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.*;
import org.jetbrains.annotations.NotNull;

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
    private double price;
    private String image;

    @ManyToOne // Many products to one seller
    @JoinColumn(name = "seller_id") // This maps to the column in the product table
    private Client seller; // Changed from Long seller_id

    @ManyToOne // Many products to one buyer
    @JoinColumn(name = "buyer_id") // This maps to the column in the product table
    private Client buyer; // Changed from Long buyer_id

    public boolean isAvailable(){return buyer == null;} // Updated to use Client object
}
```