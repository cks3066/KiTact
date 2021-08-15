package com.example.kitact.controller;

import com.example.kitact.data.dto.SignUpRequestDTO;
import com.example.kitact.data.model.RestaurantEntity;
import com.example.kitact.data.model.UserEntity;
import com.example.kitact.repository.UserRepository;
import com.example.kitact.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/user")
public class UserController {
    private final UserRepository userRepository;
    private final UserService userService;

    @Autowired
    public UserController(UserRepository userRepository, UserService userService) {
        this.userRepository = userRepository;
        this.userService = userService;
    }

    @GetMapping("/sign-in")
    public String signIn() {
        return "sign-in";
    }

    @GetMapping("/sign-up")
    public String signUp() {
        return "sign-up";
    }

    @PostMapping("/sign-up")
    public String signUp(SignUpRequestDTO signUpRequestDTO) {
        userService.signUpUser(signUpRequestDTO);
        return "redirect:/";
    }
}
