package com.kitact.Integration;


import com.kitact.repository.UserRepository;
import com.kitact.service.UserService;
import org.junit.jupiter.api.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@TestInstance(TestInstance.Lifecycle.PER_CLASS)
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
public class UserSignUpTest {
    @Autowired
    UserRepository userRepository;

    @Autowired
    UserService userService;

    @Test
    @DisplayName("유저(고객) 회원가입")
    public void signUpCustomer() {

    }

    @Test
    @DisplayName("유저(점주) 회원가입")
    public void signUpOwner() {

    }

    @Test
    @DisplayName("유저(관리자) 회원가입")
    public void signUpAdmin() {

    }
}
