package com.catalogo.catalogo.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection ="clothes")
public class Clothe {
    @Id
    private String reference;
    private String category;
    private String size;
    private String description;
    private Boolean availability=true;
    private Double price;
    private Integer quantity;
    private String photography;

}
