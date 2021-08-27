package com.kitact.configuration;

import com.kitact.data.dto.SignUpRequestDTO;
import com.kitact.data.model.User;
import com.kitact.service.RestaurantService;
import com.kitact.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Configuration;

import java.util.ArrayList;

/**
 * 테스트용 더미 데이터 생성 클래스
 */
@Configuration
@RequiredArgsConstructor
public class DumpDataConfiguration implements CommandLineRunner {

    private final UserService userService;
    private final RestaurantService restaurantService;

    @Override
    public void run(String... args) throws Exception {
        ArrayList<User> customers = new ArrayList<>();
        ArrayList<User> owners = new ArrayList<>();

        //회원가입
        for (int i = 0; i < 3; i++) {
            SignUpRequestDTO customerSignUpDTO = new SignUpRequestDTO();
            customerSignUpDTO.setUsername("customer" + i);
            customerSignUpDTO.setPassword("customer" + i);
            customers.add(userService.signUpUser(customerSignUpDTO));
        }

        for (int i = 0; i < 3; i++) {
            SignUpRequestDTO ownerSignUpDTO = new SignUpRequestDTO();
            ownerSignUpDTO.setUsername("owner" + i);
            ownerSignUpDTO.setPassword("owner" + i);
            ownerSignUpDTO.setOwner(true);
            owners.add(userService.signUpUser(ownerSignUpDTO));
        }

        restaurantService.enroll(owners.get(0), restaurantService.search("치킨"));
        restaurantService.enroll(owners.get(1), restaurantService.search("국밥"));
        restaurantService.enroll(owners.get(2), restaurantService.search("고기"));
    }
}
