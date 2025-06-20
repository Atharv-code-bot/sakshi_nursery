package com.sakshi.nursery.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class DashboardCountResponse {
    private long totalOrders;
    private long totalProducts;
}
