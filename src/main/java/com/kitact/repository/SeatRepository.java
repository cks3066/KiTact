package com.kitact.repository;

import com.kitact.data.model.Restaurant;
import com.kitact.data.model.Seat;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import java.util.List;

@RepositoryRestResource(collectionResourceRel = "seat", path = "seat")
public interface SeatRepository extends JpaRepository<Seat, Long> {
    List<Seat> findAllByRestaurant(Long restaurant_id);
    List<Seat> findByClient(@Param("client") String client);
}
