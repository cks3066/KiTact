package com.kitact.service;

import com.kitact.data.model.User;
import com.kitact.data.model.Restaurant;
import com.kitact.repository.UserRepository;
import com.kitact.repository.RestaurantRepository;
import com.kitact.data.dto.RestaurantEnrollDto;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.persistence.criteria.CriteriaBuilder;
import java.util.Optional;

@Service
@AllArgsConstructor
public class RestaurantService {
    private final UserRepository userRepository;
    private final RestaurantRepository restaurantRepository;

    // 식당 등록
    public Restaurant enrollRestaurant(RestaurantEnrollDto restaurantEnrollDto) {
        String username = restaurantEnrollDto.getUsername();
        String restaurant_name = restaurantEnrollDto.getRestaurant_name();
        String category = restaurantEnrollDto.getCategory();
        String address = restaurantEnrollDto.getAddress();
        String telephone = restaurantEnrollDto.getTelephone();
        String openinghours = restaurantEnrollDto.getOpeninghours();
        Integer mapx = restaurantEnrollDto.getMapx();
        Integer mapy = restaurantEnrollDto.getMapy();

        Optional<User> found = userRepository.findByUsername(username);
        Long user_id = found.get().getUser_id();

        Optional<Restaurant> found1 = restaurantRepository.findByUser_id(user_id);
        if (found1.isPresent()) {
            throw new IllegalArgumentException("사용자 이름 : " + username + "으로 이미 식당이 등록되어 있습니다!");
        }

        Restaurant restaurant = new Restaurant();
        restaurant.setUser_id(user_id);
        restaurant.setRestaurant_name(restaurant_name);
        restaurant.setCategory(category);
        restaurant.setAddress(address);
        restaurant.setTelephone(telephone);
        restaurant.setOpeninghours(openinghours);
        restaurant.setMapx(mapx);
        restaurant.setMapy(mapy);
        return restaurantRepository.save(restaurant);
    }

}
