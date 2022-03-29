package com.catalogo.catalogo.service;

import com.catalogo.catalogo.model.Order;
import com.catalogo.catalogo.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class OrderService {
    @Autowired
    private OrderRepository orderRepository;

    public List<Order> getAll(){
        return orderRepository.getAll();
    }

    public Optional<Order> getById(Integer id){
        return orderRepository.getById(id);
    }

    public Order save(Order order) {
        Optional<Order> orderMaxId = orderRepository.lastOrderId();
        if (order.getId() == null) {
            if (orderMaxId.isEmpty()) {
                order.setId(1);
            } else {
                order.setId(orderMaxId.get().getId() + 1);
            }
        }
        Optional<Order> element = orderRepository.getById(order.getId());
        if (element.isEmpty()) {
            return orderRepository.save(order);
        } else {
            return order;
        }
    }

    public Order update(Order order){
        if(order.getId()!=null){
            Optional<Order> element=orderRepository.getById(order.getId());
            if(!element.isEmpty()){
                if(order.getRegisterDay()!=null){
                    element.get().setRegisterDay(order.getRegisterDay());
                }
                if(order.getStatus()!=null){
                    element.get().setStatus(order.getStatus());
                }
                if(order.getSalesMan()!=null){
                    element.get().setSalesMan(order.getSalesMan());
                }
                if(order.getProducts()!=null){
                    element.get().setProducts(order.getProducts());
                }
                if(order.getQuantities()!=null){
                    element.get().setQuantities(order.getQuantities());
                }
                orderRepository.save(element.get());
                return element.get();
            }else{
                return order;
            }
        }else{
            return order;
        }
    }

    public boolean delete(int id){
        Boolean aBoolean = getById(id).map(order -> {
            orderRepository.delete(id);
            return true;
        }).orElse(aBoolean = false);
        return aBoolean;
    }

    public List<Order> findByZone(String zone){ return orderRepository.findByZone(zone); }

    public List<Order> ordersSalesManByID(Integer id){
        return orderRepository.ordersSalesManByID(id);
    }

    public List<Order> ordersSalesManByState(String state, Integer id){
        return orderRepository.ordersSalesManByState(state, id);
    }

    public List<Order> ordersSalesManByDate(String dateStr, Integer id){
        return orderRepository.ordersSalesManByDate(dateStr, id);
    }
}
