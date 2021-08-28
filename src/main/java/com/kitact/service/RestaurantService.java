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
    public RestaurantDTON search(String query) {

        // 지역 검색
        SearchLocalRequestDTO searchLocalRequestDTO = new SearchLocalRequestDTO();
        searchLocalRequestDTO.setQuery(query);

        SearchLocalResponseDTO searchLocalResponseDTO = naverSearchService.localSearch(searchLocalRequestDTO);

        if (searchLocalResponseDTO.getTotal() > 0) {
            SearchLocalResponseDTO.SearchLocalItem localItem = searchLocalResponseDTO.getItems().stream().findFirst().get();

            RestaurantDTON restaurantDTO = new RestaurantDTON();
            restaurantDTO.setRestaurantName(localItem.getTitle().replaceAll("<[^>]*>", " "));
            restaurantDTO.setLargeCategory("식당");
            restaurantDTO.setMediumCategory(localItem.getCategory().split(">")[0]);
            restaurantDTO.setSmallCategory(localItem.getCategory().split(">")[1]);
            restaurantDTO.setAddress(localItem.getAddress());
            restaurantDTO.setTel(localItem.getTelephone());
            restaurantDTO.setDetail(localItem.getDescription());
            restaurantDTO.setLng(localItem.getMapx());
            restaurantDTO.setLat(localItem.getMapy());

            // 이미지 검색
            String imageQuery = localItem.getTitle().replaceAll("<[^>]*>", "");
            SearchImageRequestDTO searchImageRequestDTO = new SearchImageRequestDTO();
            searchImageRequestDTO.setQuery(imageQuery);

            SearchImageResponseDTO searchImageResponseDTO = naverSearchService.imageSearch(searchImageRequestDTO);

            if (searchImageResponseDTO.getTotal() > 0) {
                SearchImageResponseDTO.SearchImageItem imageItem = searchImageResponseDTO.getItems().stream().findFirst().get();
                restaurantDTO.setImageUrl(imageItem.getThumbnail());
            }
            // 결과를 리턴
            return restaurantDTO;
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
        restaurantDTO.setMediumCategory(restaurant.getMedium_category());
        restaurantDTO.setSmallCategory(restaurant.getSmall_category());
        restaurantDTO.setImageUrl(restaurant.getImg());
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
        restaurantDTO.setMediumCategory(restaurant.getMedium_category());
        restaurantDTO.setSmallCategory(restaurant.getSmall_category());
        restaurantDTO.setImageUrl(restaurant.getImg());
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
    public Restaurant enroll(User user,  RestaurantDTO restaurantDTO) {
        Restaurant restaurant = new Restaurant();
        restaurant.setUser(user);
        restaurant.setRestaurant_name(restaurantDTO.getRestaurantName());
        restaurant.setLarge_category("식당");
        restaurant.setMedium_category(restaurantDTO.getMediumCategory());
        restaurant.setSmall_category(restaurantDTO.getSmallCategory());
        restaurant.setImg(restaurantDTO.getImageUrl());
        restaurant.setAddress(restaurantDTO.getAddress());
        restaurant.setTel(restaurantDTO.getTel());
        restaurant.setOpentime(restaurantDTO.getOpenTime());
        restaurant.setClosetime(restaurantDTO.getCloseTime());
        restaurant.setHoliday(restaurantDTO.getHoliday());
        restaurant.setDetail(restaurantDTO.getDetail());
        restaurant.setLng(restaurantDTO.getLng());
        restaurant.setLat(restaurantDTO.getLat());
        restaurant.setTotal_seat_count(restaurantDTO.getTotalSeatCount());
        if (restaurantDTO.getVacancyCount() == null)
            restaurant.setVacancy_count(restaurantDTO.getVacancyCount());
        else
            restaurant.setVacancy_count(restaurantDTO.getTotalSeatCount());

        restaurant.setOwner(restaurantDTO.getOwnerName());

        return restaurantRepository.save(restaurant);
    }

    // 식당 삭제
    public void delete(long restaurant_id) {
        restaurantRepository.delete(restaurantRepository.findById(restaurant_id).orElseThrow(
                () -> new IllegalArgumentException("해당 PK를 가진 음식점을 찾지 못했습니다.")
        ));
    }

    // 식당 수정
    public void patch(long restaurant_id, RestaurantDTON restaurantDto) {
        Restaurant restaurant = restaurantRepository.findById(restaurant_id).orElseThrow(
                () -> new IllegalArgumentException("해당 PK를 가진 음식점을 찾지 못했습니다.")
        );
        restaurant.setRestaurant_name(restaurantDto.getRestaurantName() != null ? restaurantDto.getRestaurantName() : restaurant.getRestaurant_name());
        restaurant.setLarge_category(restaurantDto.getLargeCategory() != null ? restaurantDto.getLargeCategory() : restaurant.getLarge_category());
        restaurant.setMedium_category(restaurantDto.getMediumCategory() != null ? restaurantDto.getMediumCategory() : restaurant.getMedium_category());
        restaurant.setSmall_category(restaurantDto.getSmallCategory() != null ? restaurantDto.getSmallCategory() : restaurant.getSmall_category());
        restaurant.setAddress(restaurantDto.getAddress() != null ? restaurantDto.getAddress() : restaurant.getAddress());
        restaurant.setTel(restaurantDto.getTel() != null ? restaurantDto.getTel() : restaurant.getTel());
        restaurant.setOpentime(restaurantDto.getOpenTime() != null ? restaurantDto.getOpenTime() : restaurant.getOpentime());
        restaurant.setClosetime(restaurantDto.getCloseTime() != null ? restaurantDto.getCloseTime() : restaurant.getClosetime());
        restaurant.setHoliday(restaurantDto.getHoliday() != null ? restaurantDto.getHoliday() : restaurant.getHoliday());
        restaurant.setDetail(restaurantDto.getDetail() != null ? restaurantDto.getDetail() : restaurant.getDetail());
        restaurant.setLng(restaurantDto.getLng() != null ? restaurantDto.getLng() : restaurant.getLng());
        restaurant.setLat(restaurantDto.getLat() != null ? restaurantDto.getLat() : restaurant.getLat());
        restaurant.setTotal_seat_count(restaurantDto.getTotalSeatCount() != null ? restaurantDto.getTotalSeatCount() : restaurant.getTotal_seat_count());
        restaurant.setVacancy_count(restaurantDto.getVacancyCount() != null ? restaurantDto.getVacancyCount() : restaurant.getVacancy_count());
        restaurantRepository.save(restaurant);
    }
}
