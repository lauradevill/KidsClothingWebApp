package com.catalogo.catalogo.repository.crud;

import com.catalogo.catalogo.model.Order;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.List;
import java.util.Optional;

public interface OrderCrudRepository extends MongoRepository<Order, Integer> {
    //Return orders according to the zone
    @Query("{'salesMan.zone': ?0}")//Zone is not an order attribute; then I have to write where is zone
    List<Order> findByZone(final String zone);

    //Return orders according to the status
    @Query("{'status: ?0}")
    List<Order> findByStatus(final String status);

    //Return maximum id order
    Optional<Order> findTopByOrderByIdDesc();
}
