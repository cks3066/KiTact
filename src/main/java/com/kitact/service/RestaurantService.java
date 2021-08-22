package com.kitact.service;

import com.kitact.data.model.User;
import com.kitact.data.model.Restaurant;
import com.kitact.repository.UserRepository;
import com.kitact.repository.RestaurantRepository;
import com.kitact.data.dto.RestaurantDto;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;
import java.util.Optional;


@Service
@AllArgsConstructor
@Transactional
public class RestaurantService {
    private final UserRepository userRepository;
    private final RestaurantRepository restaurantRepository;

    // 식당 등록
    public Restaurant enroll(User user, RestaurantDto restaurantDto) {
        String restaurant_name = restaurantDto.getRestaurant_name();
        String tag = restaurantDto.getTag();
        String address = restaurantDto.getAddress();
        String telephone = restaurantDto.getTelephone();
        String openinghours = restaurantDto.getOpeninghours();
        String big_category = restaurantDto.getBig_category();
        String small_category = restaurantDto.getSmall_category();
        Double lat = restaurantDto.getLat();
        Double lng = restaurantDto.getLng();

        Restaurant restaurant = new Restaurant();
        restaurant.setUser(user);
        restaurant.setRestaurant_name(restaurant_name);
        restaurant.setTag(tag);
        restaurant.setAddress(address);
        restaurant.setTelephone(telephone);
        restaurant.setOpeninghours(openinghours);
        restaurant.setBig_category(big_category);
        restaurant.setSmall_category(small_category);
        restaurant.setLat(lat);
        restaurant.setLng(lng);
        return restaurantRepository.save(restaurant);
    }

    // 식당 삭제
    public int delete(long restaurant_id) {
        Optional<Restaurant> found = restaurantRepository.findById(restaurant_id);
        if (found.isPresent()) {
            restaurantRepository.delete(found.get());
            return 1;
        }
        return 0;
    }

    // 식당 수정
    public int patch(long restaurant_id, RestaurantDto restaurantDto) {
        Optional<Restaurant> found = restaurantRepository.findById(restaurant_id);
        if (found.isPresent()) {
            Restaurant restaurant = found.get();
            if (StringUtils.hasLength(restaurantDto.getRestaurant_name()))
                restaurant.setRestaurant_name(restaurantDto.getRestaurant_name());
            if (StringUtils.hasLength(restaurantDto.getTag()))
                restaurant.setTag(restaurantDto.getTag());
            if (StringUtils.hasLength(restaurantDto.getAddress()))
                restaurant.setAddress(restaurantDto.getAddress());
            if (StringUtils.hasLength(restaurantDto.getTelephone()))
                restaurant.setTelephone(restaurantDto.getTelephone());
            if (StringUtils.hasLength(restaurantDto.getOpeninghours()))
                restaurant.setOpeninghours(restaurantDto.getOpeninghours());
            if (StringUtils.hasLength(restaurantDto.getBig_category()))
                restaurant.setBig_category(restaurantDto.getBig_category());
            if (StringUtils.hasLength(restaurantDto.getSmall_category()))
                restaurant.setSmall_category(restaurantDto.getSmall_category());
            if (restaurantDto.getLng() != null)
                restaurant.setLng(restaurantDto.getLng());
            if (restaurantDto.getLat() != null)
                restaurant.setLat(restaurantDto.getLat());

            restaurantRepository.save(restaurant);
            return 1;
        }
        return 0;
    }
}
