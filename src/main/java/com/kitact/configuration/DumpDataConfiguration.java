package com.kitact.configuration;

import com.kitact.data.dto.MenuDTO;
import com.kitact.data.dto.SeatDTO;
import com.kitact.data.dto.SignUpRequestDTO;
import com.kitact.data.model.Restaurant;
import com.kitact.data.model.User;
import com.kitact.service.MenuService;
import com.kitact.service.RestaurantService;
import com.kitact.service.SeatService;
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
    private final SeatService seatService;
    private final MenuService menuService;

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

        Restaurant restaurant1 = restaurantService.enroll(owners.get(0), restaurantService.search("치킨"));
        Restaurant restaurant2 = restaurantService.enroll(owners.get(1), restaurantService.search("국밥"));
        Restaurant restaurant3 = restaurantService.enroll(owners.get(2), restaurantService.search("고기"));

        MenuDTO menuDTO = new MenuDTO();
        menuDTO.setRestaurantId(restaurant1.getRestaurant_id());
        menuDTO.setImageUri("http://www.kyochon.com/uploadFiles/TB_ITEM/브랜드_list_15-10-221047(3).png");
        menuDTO.setMenuName("후라이드 치킨");
        menuDTO.setMenuPrice(15000);
        menuDTO.setActive(false);
        menuDTO.setQuantity(0);
        menuService.enroll(menuDTO);

        menuDTO.setImageUri("http://www.kyochon.com/uploadFiles/TB_ITEM/레드순살r(2).png");
        menuDTO.setMenuName("양념 치킨");
        menuDTO.setMenuPrice(16000);
        menuDTO.setActive(false);
        menuDTO.setQuantity(0);
        menuService.enroll(menuDTO);

        menuDTO.setImageUri("http://www.kyochon.com/uploadFiles/TB_ITEM/브랜드_list_15-10-221025.png");
        menuDTO.setMenuName("간장 치킨");
        menuDTO.setMenuPrice(16000);
        menuDTO.setActive(false);
        menuDTO.setQuantity(0);
        menuService.enroll(menuDTO);

        menuDTO.setImageUri("http://www.kyochon.com/uploadFiles/TB_ITEM/브랜드_list_15-10-221035.png");
        menuDTO.setMenuName("마늘 치킨");
        menuDTO.setMenuPrice(17000);
        menuDTO.setActive(false);
        menuDTO.setQuantity(0);
        menuService.enroll(menuDTO);

        SeatDTO seatDTO = new SeatDTO();
        seatDTO.setRestaurantId(restaurant1.getRestaurant_id());
        seatDTO.setPosX(520);
        seatDTO.setPosY(90);
        seatDTO.setType("seat");
        seatDTO.setPeople(3);
        seatDTO.setVacancy(true);
        seatService.enroll(seatDTO);

        seatDTO.setPosX(520);
        seatDTO.setPosY(300);
        seatDTO.setPeople(4);
        seatDTO.setVacancy(true);
        seatService.enroll(seatDTO);

        seatDTO.setPosX(320);
        seatDTO.setPosY(90);
        seatDTO.setPeople(1);
        seatDTO.setVacancy(false);
        seatDTO.setClient("Henrietta");
        seatService.enroll(seatDTO);

        seatDTO.setPosX(140);
        seatDTO.setPosY(90);
        seatDTO.setPeople(2);
        seatDTO.setVacancy(false);
        seatDTO.setClient("Leavitt");
        seatService.enroll(seatDTO);

        seatDTO.setPosX(320);
        seatDTO.setPosY(300);
        seatDTO.setPeople(2);
        seatDTO.setVacancy(true);
        seatService.enroll(seatDTO);

        seatService.search(restaurant1.getRestaurant_id());

        restaurantService.search(restaurant1.getRestaurant_id());
    }
}
