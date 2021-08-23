package com.kitact.controller;

import com.kitact.data.model.Restaurant;
import com.kitact.data.model.User;
import com.kitact.repository.RestaurantRepository;
import com.kitact.service.RestaurantService;
import com.kitact.data.dto.RestaurantDto;
import com.kitact.configuration.security.UserDetailsImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.InternalAuthenticationServiceException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/restaurant")
public class RestaurantController {
    private final RestaurantRepository restaurantRepository;
    private final RestaurantService restaurantService;

    @Autowired
    public RestaurantController(RestaurantRepository restaurantRepository, RestaurantService restaurantService) {
        this.restaurantRepository = restaurantRepository;
        this.restaurantService = restaurantService;
    }

    // 식당 검색
    @GetMapping("/show")
    @PreAuthorize("hasAnyRole('CUSTOMER', 'OWNER')")
    List<Restaurant> all() {
        return restaurantRepository.findAll();
    }

    // 식당 등록
    @PostMapping("/enroll")
    @PreAuthorize("hasRole('OWNER')")
    @Secured("ROLE_OWNER")
    public String enroll(
            Authentication authentication,
            @AuthenticationPrincipal UserDetailsImpl userDetails,
            @RequestBody RestaurantDto restaurantDTO) throws AuthenticationException {
        if (userDetails == null) {
            throw new InternalAuthenticationServiceException("Authentication is null");
        }
        String user_role = authentication.getAuthorities().toString();
        if (user_role != null && user_role.equals("ROLE_OWNER")) {
            throw new BadCredentialsException("Role is different");
        }
        else {
            User user = userDetails.getUser();
            restaurantService.enroll(user, restaurantDTO);
        }
        return "redirect:/";
    }

    // 식당 삭제
    @DeleteMapping("/delete/{restaurant_id}")
    @PreAuthorize("hasRole('OWNER')")
    @Secured("ROLE_OWNER")
    public Map<String, Object> delete(@PathVariable("restaurant_id") long restaurant_id,
                                      @AuthenticationPrincipal UserDetailsImpl userDetails) {
        Map<String, Object> response = new HashMap<>();

        if (restaurantService.delete(restaurant_id) > 0) {
            response.put("result", "SUCCESS");
        } else {
            response.put("result", "FAIL");
            response.put("reason", "일치하는 회원 정보가 없습니다. 확인해주세요.");
        }

        return response;
    }

    // 식당 수정
    @PatchMapping("/patch/{restaurant_id}")
    @PreAuthorize("hasRole('OWNER')")
    @Secured("ROLE_OWNER")
    public Map<String, Object> patch(@PathVariable("restaurant_id") long restaurant_id,
                                     @RequestBody RestaurantDto restaurantDto) {
        Map<String, Object> response = new HashMap<>();

        if (restaurantService.patch(restaurant_id, restaurantDto) > 0) {
            response.put("result", "SUCCESS");
        } else {
            response.put("result", "FAIL");
            response.put("reason", "일치하는 회원 정보가 없습니다. 확인해주세요.");
        }

        return response;
    }
}

