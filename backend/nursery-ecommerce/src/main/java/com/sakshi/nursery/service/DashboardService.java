package com.sakshi.nursery.service;

import com.sakshi.nursery.model.OrderStatus;
import com.sakshi.nursery.repository.OrderItemRepository;
import com.sakshi.nursery.repository.OrderRepository;
import com.sakshi.nursery.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class DashboardService {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private ProductRepository productRepository;

    public Map<String, Long> getDashboardStats() {
        long totalOrders = orderRepository.countByStatusNot(OrderStatus.DELIVERED);
        long totalProducts = productRepository.count();

        Map<String, Long> stats = new HashMap<>();
        stats.put("totalOrders", totalOrders);
        stats.put("totalProducts", totalProducts);

        return stats;
    }
}
