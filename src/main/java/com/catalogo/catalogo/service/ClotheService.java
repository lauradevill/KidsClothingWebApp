package com.catalogo.catalogo.service;

import com.catalogo.catalogo.model.Clothe;
import com.catalogo.catalogo.repository.ClotheRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ClotheService {
    @Autowired
    private ClotheRepository clotheRepository;

    public List<Clothe> getAll(){
        return clotheRepository.getAll();
    }

    public Optional<Clothe> getByReference(String reference){
        return clotheRepository.getByReference(reference);
    }

    public Clothe save(Clothe clothe){
        if(clothe.getReference() == "")
            return clothe;//En el reto hay obtener el id de alguna manera

        Optional<Clothe> clotheExits= clotheRepository.getByReference(clothe.getReference());
        if (clotheExits.isPresent()){
            return clothe;
        }

        return clotheRepository.save(clothe);
    }

    public Clothe update(Clothe clothe){
        if(clothe.getReference()!=null){
            Optional<Clothe> element=clotheRepository.getByReference(clothe.getReference());
            if(!element.isEmpty()){
                if(clothe.getCategory()!=null){
                    element.get().setCategory(clothe.getCategory());
                }
                if(clothe.getSize()!=null){
                    element.get().setSize(clothe.getSize());
                }
                if(clothe.getDescription()!=null){
                    element.get().setDescription(clothe.getDescription());
                }
                if(clothe.getAvailability()!=null){
                    element.get().setAvailability(clothe.getAvailability());
                }
                if(clothe.getPrice()!=null){
                    element.get().setPrice(clothe.getPrice());
                }
                if(clothe.getQuantity()!=null){
                    element.get().setQuantity(clothe.getQuantity());
                }
                if(clothe.getPhotography()!=null){
                    element.get().setPhotography(clothe.getPhotography());
                }
                clotheRepository.save(element.get());
                return element.get();
            }else{
                return clothe;
            }
        }else{
            return clothe;
        }
    }

    public boolean delete(String reference){
        Boolean aBoolean=getByReference(reference).map(user -> {
            clotheRepository.delete(reference);
            return true;
        }).orElse(aBoolean=false);
        return aBoolean;
    }

    public List<Clothe> productByPrice(double price) {
        return clotheRepository.productByPrice(price);
    }

    public List<Clothe> findByDescriptionLike(String description) {
        return clotheRepository.findByDescriptionLike(description);
    }
}
