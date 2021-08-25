package com.kitact.controller;

import com.kitact.data.model.User;
import com.kitact.data.response.BaseResponse;
import com.kitact.naver.NaverClient;
import com.kitact.repository.RestaurantRepository;
import com.kitact.service.ResponseService;
import com.kitact.service.RestaurantService;
import com.kitact.data.dto.RestaurantDto;
import com.kitact.configuration.security.UserDetailsImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
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
    @PreAuthorize("hasAnyRole('CUSTOMER', 'OWNER')")
    public RestaurantDto search(@RequestParam String query) {
        return restaurantService.search(query);
    }

    // 식당 data 전체 불러오기
    @GetMapping("/show")
    @PreAuthorize("hasAnyRole('CUSTOMER', 'OWNER')")
    BaseResponse all() {
        return responseService.getMultiResponse(restaurantRepository.findAll());
    }

    // 식당 등록
    @PostMapping("/enroll")
    @PreAuthorize("hasRole('OWNER')")
    @Secured("ROLE_OWNER")
    public BaseResponse enroll(Authentication authentication, @AuthenticationPrincipal UserDetailsImpl userDetails, @RequestBody RestaurantDto restaurantDTO) {
        User user = userDetails.getUser();
        String user_role = authentication.getAuthorities().toString();

        if (user == null) {
            throw new IllegalArgumentException("일치하는 회원 정보가 없습니다. 확인해주세요.");
        }
        if (user_role != null && user_role.equals("ROLE_OWNER")) {
            throw new IllegalArgumentException("관리자 권한이 필요합니다.");
        }

        restaurantService.enroll(user, restaurantDTO);
        return responseService.getSuccessResponse();
    }

    // 식당 삭제
    @DeleteMapping("/{restaurant_id}")
    @PreAuthorize("hasRole('OWNER')")
    @Secured("ROLE_OWNER")
    public BaseResponse delete(@PathVariable("restaurant_id") long restaurant_id, @AuthenticationPrincipal UserDetailsImpl userDetails) {
        if (restaurantService.delete(restaurant_id) < 0) {
            throw new IllegalArgumentException("일치하는 회원 정보가 없습니다. 확인해주세요.");
        }
        return responseService.getSuccessResponse();
    }

    // 식당 수정
    @PatchMapping("/{restaurant_id}")
    @PreAuthorize("hasRole('OWNER')")
    @Secured("ROLE_OWNER")
    public BaseResponse patch(@PathVariable("restaurant_id") long restaurant_id, @RequestBody RestaurantDto restaurantDto) {
        if (restaurantService.patch(restaurant_id, restaurantDto) < 0) {
            throw new IllegalArgumentException("일치하는 회원 정보가 없습니다. 확인해주세요.");
        }
        return responseService.getSuccessResponse();

    @GetMapping("/search")
    public BaseResponse search(@RequestParam String query) {
        return responseService.getSingleResponse(restaurantService.search(query));
    }
}

