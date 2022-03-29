package com.catalogo.catalogo.repository;

import com.catalogo.catalogo.model.User;
import com.catalogo.catalogo.repository.crud.UserCrudRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

/**
 * Author: Laura De villeros
 */
@Repository
public class UserRepository {
    /**
     * Instance of UserCrudRepository
     */
    @Autowired
    private UserCrudRepository userCrudRepository;

    /**
     * Method to get all users
     */
    public List<User> getAll(){ return userCrudRepository.findAll(); }

    /**
     * This function bring an user according with its id
     */
    public Optional<User> getById(Integer id){
        return userCrudRepository.findById(id);
    }
    /**
     * This function save an user
     */
    public User save(User user){ return userCrudRepository.save(user); }

    /**
     * Verify if the user with an email exist
     * @param email
     * @return true or false
     */
    public boolean emailExist(String email) {
        Optional<User> userWithEmail = userCrudRepository.findByEmail(email);

        return !userWithEmail.isEmpty();
    }

    /**
     * Allows to authenticate the user if its email and password exits in the DB
     * @param email
     * @param password
     * @return the user
     */
    public Optional<User> userAuthentication(String email, String password) {
        return userCrudRepository.findByEmailAndPassword(email, password);
    }

    /**
     * This function delete an user by its ID
     */
    public void delete(Integer id){
        userCrudRepository.deleteById(id);
    }

    /**
     * This function bring the last user according with its ID
     */
    public Optional<User> lastUserId(){
        return userCrudRepository.findTopByOrderByIdDesc();
    }

    /**
     * This function bring a list of users acordding with its Birthday
     */
    public List<User> birthtDayList(String monthBirthtDay) {
        return userCrudRepository.findByMonthBirthtDay(monthBirthtDay);
    }
}

