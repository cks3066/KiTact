package com.kitact.repository;

import com.kitact.data.model.Menu;
import com.kitact.data.model.Restaurant;
import com.kitact.data.model.Seat;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MenuRepository extends JpaRepository<Menu, Long> {
    List<Menu> findAllByRestaurant(Restaurant restaurant);
}
