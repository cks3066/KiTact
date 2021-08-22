package com.kitact.repository;

import com.kitact.data.model.Restaurant;
import com.kitact.data.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface RestaurantRepository extends JpaRepository<Restaurant, Long> {
//    Optional<Restaurant> findByUser_id(Long user_id);
}
