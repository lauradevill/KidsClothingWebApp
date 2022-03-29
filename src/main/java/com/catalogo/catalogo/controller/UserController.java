package com.catalogo.catalogo.controller;

import com.catalogo.catalogo.model.User;
import com.catalogo.catalogo.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/user")
@CrossOrigin("*")
/**
 * Class to map user collection
 */
public class UserController {
    /**
     * Instance of UserService Class
     */
    @Autowired
    private UserService userService;

    /**
     * Map the user collection and bring all users
     * @return a list of users in DB
     */
    @GetMapping("/all")
    public List<User> getAllUsers() {
        return userService.getAll();
    }

    /**
     * Map the user collection and bring an user by its id
     * @return a list of users in DB
     */
    @GetMapping("/{id}")
    public Optional<User> getUser(@PathVariable("id") int idUser){ return userService.getById(idUser); }

    /**
     * Allows to map a new user registration
     * @param user
     * @return new user register or the user
     */
    @PostMapping("/new")
    @ResponseStatus(HttpStatus.CREATED)
    public User userRegister(@RequestBody User user) { return userService.save(user); }

    /**
     * Allows to map if an email exits or not
     * @param email
     * @return true or false
     */
    @GetMapping("/emailexist/{email}")
    public boolean emailExist(@PathVariable("email") String email) { return userService.emailExist(email); }

    /**
     * Allows to map if an user exist or not in the DB
     * @param email
     * @param password
     * @return the user or user with undefined name
     */
    @GetMapping("/{email}/{password}")
    public User userAuthentication(@PathVariable("email") String email, @PathVariable("password") String password) {
        return userService.userAuthentication(email, password);
    }

    /**
     * Allows to map an update of an user
     * @param user
     * @return an update user or the user if it exits
     */
    @PutMapping("/update")
    @ResponseStatus(HttpStatus.CREATED)
    public User userUpdate(@RequestBody User user) { return userService.update(user); }

    /**
     * Delete an user
     * @param idUser
     */
    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)//204
    public boolean userDelete(@PathVariable("id") int idUser) { return userService.delete(idUser); }

    @GetMapping("/birthday/{month}")
    public List<User> birthtDayList(@PathVariable("month") String monthBirthtDay) {
        return userService.birthtDayList(monthBirthtDay);
    }
}

