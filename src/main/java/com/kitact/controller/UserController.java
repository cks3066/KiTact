package com.kitact.controller;

import com.kitact.data.dto.SignUpRequestDTO;
import com.kitact.repository.UserRepository;
import com.kitact.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
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

    // 로그인 페이지로 Redirect
    @GetMapping("/sign-in")
    public String signIn() {
        return "sign-in";
    }

    // 회원가입 페이지로 Redirect
    @GetMapping("/sign-up")
    public String signUp() {
        return "sign-up";
    }

    // 회원가입 로직
    @PostMapping("/sign-up")
    public String signUp(SignUpRequestDTO signUpRequestDTO) {
        userService.signUpUser(signUpRequestDTO);
        return "redirect:/";
    }
}
