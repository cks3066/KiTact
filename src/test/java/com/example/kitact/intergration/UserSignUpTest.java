package com.example.kitact.intergration;


import com.example.kitact.data.dto.SignUpRequestDTO;
import com.example.kitact.data.model.UserEntity;
import com.example.kitact.data.model.UserRole;
import com.example.kitact.repository.UserRepository;
import com.example.kitact.service.UserService;
import org.junit.jupiter.api.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@TestInstance(TestInstance.Lifecycle.PER_CLASS)
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
public class UserSignUpTest {
    @Autowired
    UserRepository userRepository;

    @Autowired
    UserService userService;

    @Test
    @DisplayName("유저(고객)를 회원가입한다.")
    public void signUpCustomer() {
        String username = "jungyoon";
        String password = "jungyoon";
        UserRole userRole = UserRole.CUSTOMER_ROLE;
        UserEntity customer = userService.signUpUser(
                new SignUpRequestDTO(
                        username,
                        password,
                        userRole
                )
        );

        assertEquals(customer.getUsername(), username);
        assertNotEquals(customer.getPassword(), password);
        assertEquals(customer.getRole(), userRole);
    }
}
