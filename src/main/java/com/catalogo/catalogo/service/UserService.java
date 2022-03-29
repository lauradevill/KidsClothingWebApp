package com.catalogo.catalogo.service;

import com.catalogo.catalogo.model.User;
import com.catalogo.catalogo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

/**
 * Author: Laura De Villeros
 */
@Service
public class UserService {
    /**
     * UserRepository instance
     */
    @Autowired
    private UserRepository userRepository;

    /**
     * Method to bring all users
     */
    public List<User> getAll(){
        return userRepository.getAll();
    }
    /**
     * Method to bring a user by its ID
     */
    public Optional<User> getById(Integer id){
        return userRepository.getById(id);
    }
    /**
     * Method to save a user in DB
     */
    public User save(User user) {
        Optional<User> userMaxId = userRepository.lastUserId();
        if (user.getId() == null) {
            if (userMaxId.isEmpty()) {
                user.setId(1);
            } else {
                user.setId(userMaxId.get().getId() + 1);
            }
        }

        Optional<User> element = userRepository.getById(user.getId());
        if (element.isEmpty()) {
            if (emailExist(user.getEmail()) == false) {
                return userRepository.save(user);
            } else {
                return user;
            }
        } else {
            return user;
        }
    }
    /**
     * Method update a user in DB
     */
    public User update(User user){
        if(user.getId()!=null){
            Optional<User> element=userRepository.getById(user.getId());
            if(!element.isEmpty()){
                if(user.getIdentification()!=null){
                    element.get().setIdentification(user.getIdentification());
                }
                if(user.getName()!=null){
                    element.get().setName(user.getName());
                }
                if(user.getAddress()!=null){
                    element.get().setAddress(user.getAddress());
                }
                if(user.getCellPhone()!=null){
                    element.get().setCellPhone(user.getCellPhone());
                }
                if(user.getEmail()!=null){
                    element.get().setEmail(user.getEmail());
                }
                if(user.getPassword()!=null){
                    element.get().setPassword(user.getPassword());
                }
                if(user.getZone()!=null){
                    element.get().setZone(user.getZone());
                }
                userRepository.save(element.get());
                return element.get();
            }else{
                return user;
            }
        }else{
            return user;
        }
    }
    /**
     * Method to verify if a user exits
     */
    public boolean emailExist(String email) {
        return userRepository.emailExist(email);
    }
    /**
     * Method for user authentication
     */
    public User userAuthentication(String email, String password) {
        Optional<User> userElement = userRepository.userAuthentication(email, password);

        if (userElement.isEmpty()) {
            return new User();
            //return new User(null, null,null,null,
                    //null,email, password,null,null);
        } else {
            return userElement.get();
        }
    }
    /**
     * Method to delete a user
     */
    public boolean delete(int id){
        Boolean aBoolean = getById(id).map(user -> {
            userRepository.delete(id);
            return true;
        }).orElse(aBoolean = false);
        return aBoolean;
    }
    /**
     * Method to list users by its birthday
     */
    public List<User> birthtDayList(String monthBirthtDay) {
        return userRepository.birthtDayList(monthBirthtDay);
    }

}
