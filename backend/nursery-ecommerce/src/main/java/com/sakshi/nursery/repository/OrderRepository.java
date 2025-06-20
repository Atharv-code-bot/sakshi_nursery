package com.sakshi.nursery.repository;
import com.sakshi.nursery.model.Order;
import com.sakshi.nursery.model.OrderStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {
    Optional<Order> findByUserId(Long userId);

    List<Order> findAllByUserId(long userId);

    long countByStatusNot(OrderStatus status);

    Optional<Order> findById(String orderId);
}

