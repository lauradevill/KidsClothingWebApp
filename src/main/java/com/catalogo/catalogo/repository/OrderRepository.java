package com.catalogo.catalogo.repository;

import com.catalogo.catalogo.model.Order;
import com.catalogo.catalogo.repository.crud.OrderCrudRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Optional;


@Repository
public class OrderRepository {
    @Autowired
    private OrderCrudRepository orderCrudRepository;

    //Relationship attribute
    @Autowired
    private MongoTemplate mongoTemplate;

    public List<Order> getAll(){ return orderCrudRepository.findAll(); }

    //This function bring an order according with its id
    public Optional<Order> getById(Integer id){
        return orderCrudRepository.findById(id);
    }

    public Order save(Order order){ return orderCrudRepository.save(order); }

    public void delete(Integer id){
        orderCrudRepository.deleteById(id);
    }

    public Optional<Order> lastOrderId(){
        return orderCrudRepository.findTopByOrderByIdDesc();
    }

    public List<Order> findByZone(String zone){ return orderCrudRepository.findByZone(zone); }

    //You can do these methods from crud repository, similar to orders by zone method, here, we are using MongoTemplate
    public List<Order> ordersSalesManByID(Integer id){
        Query query = new Query();
        Criteria dateCriteria = Criteria.where("salesMan.id").is(id);
        query.addCriteria(dateCriteria);
        List<Order> orders = mongoTemplate.find(query, Order.class);
        return orders;
    }

    public List<Order> ordersSalesManByState(String state, Integer id){
        Query query = new Query();
        Criteria dateCriteria = Criteria.where("salesMan.id").is(id).and("status").is(state);
        query.addCriteria(dateCriteria);
        List<Order> orders = mongoTemplate.find(query, Order.class);
        return orders;
    }

    public List<Order> ordersSalesManByDate(String dateStr, Integer id){
        DateTimeFormatter dtf = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        Query query = new Query();
        Criteria dateCriteria = Criteria.where("registerDay")
                .gte(LocalDate.parse(dateStr, dtf).minusDays(1).atStartOfDay())
                .lt(LocalDate.parse(dateStr, dtf).plusDays(1).atStartOfDay())
                .and("salesMan.id").is(id);
        query.addCriteria(dateCriteria);
        List<Order> orders = mongoTemplate.find(query, Order.class);
        return orders;
    }


}

