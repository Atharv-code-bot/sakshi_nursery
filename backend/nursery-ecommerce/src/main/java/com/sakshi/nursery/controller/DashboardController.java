package com.sakshi.nursery.controller;

import com.sakshi.nursery.dto.DashboardCountResponse;
import com.sakshi.nursery.repository.OrderItemRepository;
import com.sakshi.nursery.repository.ProductRepository;
import com.sakshi.nursery.service.DashboardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api/admin/dashboard")

public class DashboardController {

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private DashboardService dashboardService;

    @GetMapping("/counts")
    public ResponseEntity<Map<String, Long>> getCounts() {
        Map<String, Long> stats = dashboardService.getDashboardStats();
        return ResponseEntity.ok(stats);
    }
}
