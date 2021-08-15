package com.example.kitact.repository;

import com.example.kitact.data.model.RestaurantEntity;
import com.example.kitact.data.model.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<UserEntity, Long> {
    Optional<UserEntity> findByUsername(String username);
}