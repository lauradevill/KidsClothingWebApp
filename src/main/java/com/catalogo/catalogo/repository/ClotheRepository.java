package com.catalogo.catalogo.repository;

import com.catalogo.catalogo.model.Clothe;
import com.catalogo.catalogo.repository.crud.ClotheCrudRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public class ClotheRepository {
    @Autowired
    private ClotheCrudRepository clotheCrudRepository;

    public List<Clothe> getAll(){ return clotheCrudRepository.findAll(); }

    public Optional<Clothe> getByReference(String reference){
        return clotheCrudRepository.findById(reference);
    }

    public Clothe save(Clothe clothe){ return clotheCrudRepository.save(clothe); }

    public void delete(String reference){ clotheCrudRepository.deleteById(reference); }

    public List<Clothe> productByPrice(double price) {
        return clotheCrudRepository.findByPriceLessThanEqual(price);
    }

    public List<Clothe> findByDescriptionLike(String description) {
        return clotheCrudRepository.findByDescriptionLike(description);
    }
}

