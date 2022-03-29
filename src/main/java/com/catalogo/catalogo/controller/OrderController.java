package com.catalogo.catalogo.controller;

import com.catalogo.catalogo.model.Order;
import com.catalogo.catalogo.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/order")
@CrossOrigin("*")
/**
 * Class to map order collection
 */
public class OrderController {
    /**
     * Instance of OrderService Class
     */
    @Autowired
    private OrderService orderService;

    /**
     * Map the order collection and bring all orders
     * @return a list of orders in DB
     */
    @GetMapping("/all")
    public List<Order> getAllOrders() {
        return orderService.getAll();
    }

    /**
     * Map the order collection and bring an order by its id
     * @return a list of orders in DB
     */
    @GetMapping("/{id}")
    public Optional<Order> getOrder(@PathVariable("id") int idOrder){ return orderService.getById(idOrder); }

    /**
     * Allows to map a new order registration
     * @param order
     * @return new order register or the order
     */
    @PostMapping("/new")
    @ResponseStatus(HttpStatus.CREATED)
    public Order orderRegister(@RequestBody Order order) { return orderService.save(order); }

    /**
     * Allows to map an update of an order
     * @param order
     * @return an update order or the order if it exits
     */
    @PutMapping("/update")
    @ResponseStatus(HttpStatus.CREATED)
    public Order orderUpdate(@RequestBody Order order) { return orderService.update(order); }

    /**
     * Delete an order
     * @param idOrder
     */
    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)//204
    public boolean orderDelete(@PathVariable("id") int idOrder) { return orderService.delete(idOrder); }

    /**
     * Map the order collection and bring all orders by its salesman zone
     * * @return a list of orders in DB
     */
    @GetMapping("zona/{zone}")
    public List<Order> getOrdersByZone(@PathVariable("zone") String zone){ return orderService.findByZone(zone); }
    /**
     * Map the order collection and bring all orders by its salesman id
     * * @return a list of orders in DB
     */
    @GetMapping("/salesman/{id}")
    public List<Order> ordersSalesManByID(@PathVariable("id") Integer salesmanId) {
        return orderService.ordersSalesManByID(salesmanId);
    }

    @GetMapping("/state/{state}/{id}")
    public List<Order> ordersSalesManByState(@PathVariable("state") String state, @PathVariable("id")
            Integer salesmanid) {
        return orderService.ordersSalesManByState(state, salesmanid);
    }

    @GetMapping("/date/{date}/{id}")
    public List<Order> ordersSalesManByDate(@PathVariable("date") String dateStr,
                                            @PathVariable("id") Integer salesmanId){
        return orderService.ordersSalesManByDate(dateStr, salesmanId);
    }
}
