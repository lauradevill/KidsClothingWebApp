package com.catalogo.catalogo.controller;

import com.catalogo.catalogo.model.Clothe;
import com.catalogo.catalogo.service.ClotheService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/clothe")
@CrossOrigin("*")
public class ClotheController {
    /**
     * Instance of ClotheService Class
     */
    @Autowired
    private ClotheService clotheService;

    /**
     * Map the clothe collection and bring all clothes
     * @return a list of clothes in DB
     */
    @GetMapping("/all")
    public List<Clothe> getAllClothes() {
        return clotheService.getAll();
    }

    /**
     * Map the clothe collection and bring a clothe by its id
     * @return a list of users in DB
     */
    @GetMapping("/{id}")
    public Optional<Clothe> getClothe(@PathVariable("id") String reference){ return clotheService.getByReference(reference); }

    /**
     * Allows to map a new clothe registration
     * @param clothe
     * @return new clothe register or the clothe
     */
    @PostMapping("/new")
    @ResponseStatus(HttpStatus.CREATED)
    public Clothe clotheRegister(@RequestBody Clothe clothe) { return clotheService.save(clothe); }

    /**
     * Allows to map if an email exits or not
     * @param email
     * @return true or false

    @GetMapping("/emailExist/{email}")
    public boolean emailExist(@PathVariable("email") String email) { return userService.emailExist(email); }*/

    /**
     * Allows to map if an user exist or not in the DB
     * @param email
     * @param password
     * @return the user or user with undefined name

    @GetMapping("/{email}/{password}")
    public User userAuthentication(@PathVariable("email") String email, @PathVariable("password") String password) {
        return userService.userAuthentication(email, password);
    }*/

    /**
     * Allows to map an update of a clothe
     * @param clothe
     * @return an update clothe or the clothe if it exits
     */
    @PutMapping("/update")
    @ResponseStatus(HttpStatus.CREATED)
    public Clothe clotheUpdate(@RequestBody Clothe clothe) { return clotheService.update(clothe); }

    /**
     * Delete a clothe
     * @param cReference
     */
    @DeleteMapping("/{reference}")
    @ResponseStatus(HttpStatus.NO_CONTENT)//204
    public boolean clotheDelete(@PathVariable("reference") String cReference) {
        return clotheService.delete(cReference);
    }

    @GetMapping("/price/{price}")
    public List<Clothe> productByPrice(@PathVariable("price") double price) {
        return clotheService.productByPrice(price);
    }

    @GetMapping("/description/{description}")
    public List<Clothe> findByDescriptionLike(@PathVariable("description") String description) {
        return clotheService.findByDescriptionLike(description);
    }
}
