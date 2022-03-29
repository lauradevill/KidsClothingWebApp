package com.catalogo.catalogo.repository.crud;

import com.catalogo.catalogo.model.Clothe;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.List;

public interface ClotheCrudRepository extends MongoRepository<Clothe, String> {
    public List<Clothe> findByPriceLessThanEqual(double price);

    @Query("{'description':{'$regex':'?0','$options':'i'}}")
    public List<Clothe> findByDescriptionLike(String description);
}
