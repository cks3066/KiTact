package com.kitact.controller;

import com.kitact.advice.exception.AuthenticationEntryPointException;
import com.kitact.data.model.User;
import com.kitact.data.model.UserRole;
import com.kitact.data.response.BaseResponse;
import com.kitact.repository.RestaurantRepository;
import com.kitact.service.ResponseService;
import com.kitact.service.RestaurantService;
import com.kitact.data.dto.RestaurantDTO;
import com.kitact.configuration.security.UserDetailsImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/restaurant")
public class RestaurantController {
    private final RestaurantRepository restaurantRepository;
    private final RestaurantService restaurantService;
    private final ResponseService responseService;

    // 식당 검색
    @GetMapping("/search")
    public BaseResponse search(@RequestParam String query) {
        return responseService.getSingleResponse(restaurantService.search(query));
    }

    @GetMapping("/search/{restaurant-id}")
    BaseResponse searchByRestaurantId(@PathVariable("restaurant-id") long restaurantId) {
        return responseService.getSingleResponse(restaurantService.search(restaurantId));
    }

    @GetMapping("/search/coordinate")
    BaseResponse searchByCoordinate(@RequestParam("lat") int lat, @RequestParam("lng") int lng) {
        return responseService.getSingleResponse(restaurantService.search(lat, lng));
    }

    // 식당 data 전체 불러오기
    @GetMapping("/show")
    BaseResponse searchAll() {
        return responseService.getMultiResponse(restaurantRepository.findAll());
    }

    // 식당 등록
    @PostMapping("/enroll")
    public BaseResponse enroll(@AuthenticationPrincipal UserDetailsImpl userDetails, @RequestBody RestaurantDTO restaurantDTO) {
        if (!userDetails.getAuthorities().toString().contains(UserRole.OWNER.name())) {
            throw new AuthenticationEntryPointException();
        }
        restaurantService.enroll(userDetails.getUser(), restaurantDTO);
        return responseService.getSuccessResponse();
    }

    // 식당 삭제
    @DeleteMapping("/{restaurant_id}")
    public BaseResponse delete(@AuthenticationPrincipal UserDetailsImpl userDetails, @PathVariable("restaurant_id") long restaurant_id) {
        if (!userDetails.getAuthorities().toString().contains(UserRole.OWNER.name())) {
            throw new AuthenticationEntryPointException();
        }
        restaurantService.delete(restaurant_id);
        return responseService.getSuccessResponse();
    }

    // 식당 수정
    @PatchMapping("/{restaurant_id}")
    public BaseResponse patch(@AuthenticationPrincipal UserDetailsImpl userDetails, @PathVariable("restaurant_id") long restaurant_id, @RequestBody RestaurantDTO restaurantDto) {
        if (!userDetails.getAuthorities().toString().contains(UserRole.OWNER.name())) {
            throw new AuthenticationEntryPointException();
        }
        restaurantService.patch(restaurant_id, restaurantDto);
        return responseService.getSuccessResponse();
    }
}

