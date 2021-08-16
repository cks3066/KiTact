package com.kitact.controller;

import com.kitact.data.dto.SignUpRequestDTO;
import com.kitact.repository.UserRepository;
import com.kitact.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/user")
public class UserController {
    private final UserRepository userRepository;
    private final UserService userService;

    @Autowired
    public UserController(UserRepository userRepository, UserService userService) {
        this.userRepository = userRepository;
        this.userService = userService;
    }

    @PostMapping("/sign-in")
    public String signIn() {
        return "";
    }

    // 회원가입 로직
    @PostMapping("/sign-up")
    public String signUp(SignUpRequestDTO signUpRequestDTO) {
        userService.signUpUser(signUpRequestDTO);
        return "redirect:/";
    }
}
