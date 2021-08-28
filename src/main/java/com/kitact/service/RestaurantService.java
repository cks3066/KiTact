package com.kitact.service;

import com.kitact.data.dto.*;
import com.kitact.data.model.User;
import com.kitact.data.model.Restaurant;
import com.kitact.repository.MenuRepository;
import com.kitact.repository.SeatRepository;
import com.kitact.repository.UserRepository;
import com.kitact.repository.RestaurantRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class RestaurantService {
    private final UserRepository userRepository;
    private final RestaurantRepository restaurantRepository;
    private final MenuRepository menuRepository;
    private final SeatRepository seatRepository;
    private final NaverSearchService naverSearchService;

    // 식당 검색
    public RestaurantDTO search(String query) {

        // 지역 검색
        SearchLocalRequestDTO searchLocalRequestDTO = new SearchLocalRequestDTO();
        searchLocalRequestDTO.setQuery(query);

        SearchLocalResponseDTO searchLocalResponseDTO = naverSearchService.localSearch(searchLocalRequestDTO);

        if (searchLocalResponseDTO.getTotal() > 0) {
            SearchLocalResponseDTO.SearchLocalItem localItem = searchLocalResponseDTO.getItems().stream().findFirst().get();

            RestaurantDTO restaurant = new RestaurantDTO();
            restaurant.setRestaurant_name(localItem.getTitle().replaceAll("<[^>]*>", " "));
            restaurant.setLarge_category("식당");
            restaurant.setMedium_category(localItem.getCategory().split(">")[0]);
            restaurant.setSmall_category(localItem.getCategory().split(">")[1]);
            restaurant.setAddress(localItem.getAddress());
            restaurant.setTel(localItem.getTelephone());
            restaurant.setDetail(localItem.getDescription());
            restaurant.setLng(localItem.getMapx());
            restaurant.setLat(localItem.getMapy());

            // 이미지 검색
            String imageQuery = localItem.getTitle().replaceAll("<[^>]*>", "");
            SearchImageRequestDTO searchImageRequestDTO = new SearchImageRequestDTO();
            searchImageRequestDTO.setQuery(imageQuery);

            SearchImageResponseDTO searchImageResponseDTO = naverSearchService.imageSearch(searchImageRequestDTO);

            if (searchImageResponseDTO.getTotal() > 0) {
                SearchImageResponseDTO.SearchImageItem imageItem = searchImageResponseDTO.getItems().stream().findFirst().get();
                restaurant.setImg(imageItem.getThumbnail());
            }
            // 결과를 리턴
            return restaurant;
        }
        throw new IllegalArgumentException("음식점이 없습니다!");
    }

    public RestaurantDTON search(int lat, int lng) {
        RestaurantDTON restaurantDTO = new RestaurantDTON();
        Restaurant restaurant = restaurantRepository.findByLatAndLng(lat, lng).orElseThrow(
                () -> new IllegalArgumentException("해당 좌표를 가진 음식점을 찾지 못했습니다.")
        );

        List<SeatDTO> seats = seatRepository.findAllByRestaurant(restaurant).stream().map(
                SeatDTO::new
        ).collect(Collectors.toList());

        List<MenuDTO> menus = menuRepository.findAllByRestaurant(restaurant).stream().map(
                MenuDTO::new
        ).collect(Collectors.toList());

        restaurantDTO.setRestaurantId(restaurant.getRestaurant_id());
        restaurantDTO.setRestaurantName(restaurant.getRestaurant_name());
        restaurantDTO.setOwnerName(restaurant.getOwner());
        restaurantDTO.setLargeCategory(restaurant.getLarge_category());
        restaurantDTO.setMidiumCategory(restaurant.getMedium_category());
        restaurantDTO.setSmallCategory(restaurant.getSmall_category());
        restaurantDTO.setImageUri(restaurant.getImg());
        restaurantDTO.setAddress(restaurant.getAddress());
        restaurantDTO.setTel(restaurant.getTel());
        restaurantDTO.setDetail(restaurant.getDetail());
        //restaurantDTO.setTotalSeatCount(restaurant.getTotal_seat_count());
        //restaurantDTO.setVacancyCount(restaurant.getVacancy_count());
        restaurantDTO.setLat(restaurant.getLat());
        restaurantDTO.setLng(restaurant.getLng());
        restaurantDTO.setOpenTime(restaurant.getOpentime());
        restaurantDTO.setCloseTime(restaurant.getClosetime());
        restaurantDTO.setHoliday(restaurant.getHoliday());
        restaurantDTO.setSeats(seats);
        restaurantDTO.setMenus(menus);

        return restaurantDTO;
    }

    public RestaurantDTON search(Long restaurantId) {
        RestaurantDTON restaurantDTO = new RestaurantDTON();
        Restaurant restaurant = restaurantRepository.findById(restaurantId).orElseThrow(
                () -> new IllegalArgumentException("해당 PK를 가진 음식점을 찾지 못했습니다.")
        );

        List<SeatDTO> seats = seatRepository.findAllByRestaurant(restaurant).stream().map(
                SeatDTO::new
        ).collect(Collectors.toList());

        List<MenuDTO> menus = menuRepository.findAllByRestaurant(restaurant).stream().map(
                MenuDTO::new
        ).collect(Collectors.toList());

        restaurantDTO.setRestaurantId(restaurant.getRestaurant_id());
        restaurantDTO.setRestaurantName(restaurant.getRestaurant_name());
        restaurantDTO.setOwnerName(restaurant.getOwner());
        restaurantDTO.setLargeCategory(restaurant.getLarge_category());
        restaurantDTO.setMidiumCategory(restaurant.getMedium_category());
        restaurantDTO.setSmallCategory(restaurant.getSmall_category());
        restaurantDTO.setImageUri(restaurant.getImg());
        restaurantDTO.setAddress(restaurant.getAddress());
        restaurantDTO.setTel(restaurant.getTel());
        restaurantDTO.setDetail(restaurant.getDetail());
        //restaurantDTO.setTotalSeatCount(restaurant.getTotal_seat_count());
        //restaurantDTO.setVacancyCount(restaurant.getVacancy_count());
        restaurantDTO.setLat(restaurant.getLat());
        restaurantDTO.setLng(restaurant.getLng());
        restaurantDTO.setOpenTime(restaurant.getOpentime());
        restaurantDTO.setCloseTime(restaurant.getClosetime());
        restaurantDTO.setHoliday(restaurant.getHoliday());
        restaurantDTO.setSeats(seats);
        restaurantDTO.setMenus(menus);

        return restaurantDTO;
    }

    // 식당 등록
    public Restaurant enroll(User user, RestaurantDTO restaurantDto) {
        Restaurant restaurant = new Restaurant();
        restaurant.setUser(user);
        restaurant.setRestaurant_name(restaurantDto.getRestaurant_name());
        restaurant.setLarge_category("식당");
        restaurant.setMedium_category(restaurantDto.getMedium_category());
        restaurant.setSmall_category(restaurantDto.getSmall_category());
        restaurant.setImg(restaurantDto.getImg());
        restaurant.setAddress(restaurantDto.getAddress());
        restaurant.setTel(restaurantDto.getTel());
        restaurant.setOpentime(restaurantDto.getOpentime());
        restaurant.setClosetime(restaurantDto.getClosetime());
        restaurant.setHoliday(restaurantDto.getHoliday());
        restaurant.setDetail(restaurantDto.getDetail());
        restaurant.setTags(restaurantDto.getTags());
        restaurant.setLng(restaurantDto.getLng());
        restaurant.setLat(restaurantDto.getLat());
        restaurant.setTotal_seat_count(restaurantDto.getTotal_seat_count());
        if (restaurantDto.getVacancy_count() != null)
            restaurant.setVacancy_count(restaurantDto.getVacancy_count());
        else
            restaurant.setVacancy_count(restaurantDto.getTotal_seat_count());

        return restaurantRepository.save(restaurant);
    }

    // 식당 삭제
    public void delete(long restaurant_id) {
        restaurantRepository.delete(restaurantRepository.findById(restaurant_id).orElseThrow(
                () -> new IllegalArgumentException("해당 PK를 가진 음식점을 찾지 못했습니다.")
        ));
    }

    // 식당 수정
    public void patch(long restaurant_id, RestaurantDTO restaurantDto) {
        Restaurant restaurant = restaurantRepository.findById(restaurant_id).orElseThrow(
                () -> new IllegalArgumentException("해당 PK를 가진 음식점을 찾지 못했습니다.")
        );
        restaurant.setRestaurant_name(restaurantDto.getRestaurant_name() != null ? restaurantDto.getRestaurant_name() : restaurant.getRestaurant_name());
        restaurant.setLarge_category(restaurantDto.getLarge_category() != null ? restaurantDto.getLarge_category() : restaurant.getLarge_category());
        restaurant.setMedium_category(restaurantDto.getMedium_category() != null ? restaurantDto.getMedium_category() : restaurant.getMedium_category());
        restaurant.setSmall_category(restaurantDto.getSmall_category() != null ? restaurantDto.getSmall_category() : restaurant.getSmall_category());
        restaurant.setAddress(restaurantDto.getAddress() != null ? restaurantDto.getAddress() : restaurant.getAddress());
        restaurant.setTel(restaurantDto.getTel() != null ? restaurantDto.getTel() : restaurant.getTel());
        restaurant.setOpentime(restaurantDto.getOpentime() != null ? restaurantDto.getOpentime() : restaurant.getOpentime());
        restaurant.setClosetime(restaurantDto.getClosetime() != null ? restaurantDto.getClosetime() : restaurant.getClosetime());
        restaurant.setHoliday(restaurantDto.getHoliday() != null ? restaurantDto.getHoliday() : restaurant.getHoliday());
        restaurant.setDetail(restaurantDto.getDetail() != null ? restaurantDto.getDetail() : restaurant.getDetail());
        restaurant.setTags(restaurantDto.getTags() != null ? restaurantDto.getTags() : restaurant.getTags());
        restaurant.setLng(restaurantDto.getLng() != null ? restaurantDto.getLng() : restaurant.getLng());
        restaurant.setLat(restaurantDto.getLat() != null ? restaurantDto.getLat() : restaurant.getLat());
        restaurant.setTotal_seat_count(restaurantDto.getTotal_seat_count() != null ? restaurantDto.getTotal_seat_count() : restaurant.getTotal_seat_count());
        restaurant.setVacancy_count(restaurantDto.getVacancy_count() != null ? restaurantDto.getVacancy_count() : restaurant.getVacancy_count());
        restaurantRepository.save(restaurant);
    }
}
