package com.kitact.service;

import com.kitact.data.dto.SearchImageReqDto;
import com.kitact.data.dto.SearchReqDto;
import com.kitact.data.dto.SearchResDto;
import com.kitact.data.model.User;
import com.kitact.data.model.Restaurant;
import com.kitact.naver.NaverClient;
import com.kitact.repository.UserRepository;
import com.kitact.repository.RestaurantRepository;
import com.kitact.data.dto.RestaurantDto;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import javax.transaction.Transactional;
import java.util.Optional;


@Service
@AllArgsConstructor
@Transactional
public class RestaurantService {
    private final UserRepository userRepository;
    private final RestaurantRepository restaurantRepository;
    private final NaverClient naverClient;

    // 식당 검색
    public RestaurantDto search(String query) {
        // 지역 검색
        var searchLocalReq = new SearchReqDto();
        searchLocalReq.setQuery(query);

        var searchLocalRes = naverClient.localSearch(searchLocalReq);
        if(searchLocalRes.getTotal() > 0) {
            var localItem = searchLocalRes.getItems().stream().findFirst().get();

            // 이미지 검색
            var imageQuery = localItem.getTitle().replaceAll("<[^>]*>", "");
            var searchImageReq = new SearchImageReqDto();
            searchImageReq.setQuery(imageQuery);

            var searchImageRes = naverClient.searchImage(searchImageReq);

            if (searchImageRes.getTotal() > 0) {
                var imageItem = searchImageRes.getItems().stream().findFirst().get();
                // 결과를 리턴
                var restaurant = new RestaurantDto();
                restaurant.setRestaurant_name(localItem.getTitle());
                restaurant.setLarge_category("식당");
                restaurant.setMedium_category(localItem.getCategory().split(">")[0]);
                restaurant.setSmall_category(localItem.getCategory().split(">")[1]);
                restaurant.setImg(imageItem.getLink());
                restaurant.setAddress(localItem.getAddress());
                restaurant.setTel(localItem.getTelephone());
                restaurant.setDetail(localItem.getDescription());
                restaurant.setLng(localItem.getMapx());
                restaurant.setLat(localItem.getMapy());

                return restaurant;
            }
        }
        return new RestaurantDto();
    }


    // 식당 등록
    public Restaurant enroll(User user, RestaurantDto restaurantDto) {
        Restaurant restaurant = new Restaurant();
        restaurant.setUser(user);
        restaurant.setRestaurant_name(restaurantDto.getRestaurant_name());
        restaurant.setLarge_category("식당");
        restaurant.setMedium_category(restaurantDto.getMedium_category());
        restaurant.setSmall_category(restaurantDto.getSmall_category());
        restaurant.setImg(restaurantDto.getImg());
        restaurant.setAddress(restaurantDto.getAddress());
        restaurant.setTel(restaurantDto.getTel());
        restaurant.setDetail(restaurantDto.getDetail());
        restaurant.setLng(restaurantDto.getLng());
        restaurant.setLat(restaurantDto.getLat());

        restaurant.setTime(restaurantDto.getTime());
        restaurant.setTags(restaurantDto.getTags());
        restaurant.setTotal_seat_count(restaurantDto.getTotal_seat_count());

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
            if (StringUtils.hasLength(restaurantDto.getLarge_category()))
                restaurant.setLarge_category(restaurantDto.getLarge_category());
            if (StringUtils.hasLength(restaurantDto.getMedium_category()))
                restaurant.setMedium_category(restaurantDto.getMedium_category());
            if (StringUtils.hasLength(restaurantDto.getSmall_category()))
                restaurant.setSmall_category(restaurantDto.getSmall_category());
            if (StringUtils.hasLength(restaurantDto.getAddress()))
                restaurant.setAddress(restaurantDto.getAddress());
            if (StringUtils.hasLength(restaurantDto.getTel()))
                restaurant.setTel(restaurantDto.getTel());
            if (StringUtils.hasLength(restaurantDto.getDetail()))
                restaurant.setDetail(restaurantDto.getDetail());
            if (StringUtils.hasLength(restaurantDto.getTags()))
                restaurant.setTags(restaurantDto.getTags());
            if (StringUtils.hasLength(restaurantDto.getTime()))
                restaurant.setTime(restaurantDto.getTime());

            if (restaurantDto.getLng() != null)
                restaurant.setLng(restaurantDto.getLng());
            if (restaurantDto.getLat() != null)
                restaurant.setLat(restaurantDto.getLat());
            if (restaurantDto.getTotal_seat_count() != null)
                restaurant.setTotal_seat_count(restaurantDto.getTotal_seat_count());

            restaurantRepository.save(restaurant);
            return 1;
        }
        return 0;
    }
}
