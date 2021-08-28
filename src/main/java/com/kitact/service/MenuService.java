package com.kitact.service;

import com.kitact.data.dto.MenuDTO;
import com.kitact.data.dto.SeatDTO;
import com.kitact.data.model.Menu;
import com.kitact.data.model.Restaurant;
import com.kitact.data.model.Seat;
import com.kitact.repository.MenuRepository;
import com.kitact.repository.RestaurantRepository;
import com.kitact.repository.SeatRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional
public class MenuService {
    private final RestaurantRepository restaurantRepository;
    private final MenuRepository menuRepository;

    public Menu enroll(MenuDTO menuDTO) {
        Restaurant restaurant = restaurantRepository.findById(menuDTO.getRestaurantId()).orElseThrow(
                () -> new IllegalArgumentException("해당 음식점을 찾을 수 없습니다.")
        );

        Menu menu = new Menu();
        menu.setRestaurant(restaurant);
        menu.setSrc(menuDTO.getImageUri());
        menu.setMenu_name(menuDTO.getMenuName() == null ? "미정" : menuDTO.getMenuName());
        menu.setMenu_price(menuDTO.getMenuPrice());

        return menuRepository.save(menu);
    }
}