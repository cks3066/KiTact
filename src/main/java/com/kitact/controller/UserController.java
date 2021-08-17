package com.kitact.controller;

import com.kitact.configuration.security.JWTProvider;
import com.kitact.data.dto.SignInRequestDTO;
import com.kitact.data.dto.SignUpRequestDTO;
import com.kitact.data.model.User;
import com.kitact.repository.UserRepository;
import com.kitact.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/user")
public class UserController {
    private final UserRepository userRepository;
    private final UserService userService;

    @PostMapping("/sign-in")
    public String signIn(@RequestBody SignInRequestDTO signInRequestDTO) {
        return userService.signInUser(signInRequestDTO);
    }

    // 회원가입 로직
    @PostMapping("/sign-up")
    public String signUp(@RequestBody SignUpRequestDTO signUpRequestDTO) {
        userService.signUpUser(signUpRequestDTO);
        return "redirect:/";
    }
}
