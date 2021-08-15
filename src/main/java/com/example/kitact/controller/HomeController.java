package com.example.kitact.controller;

import com.example.kitact.configuration.security.UserDetailsImpl;
import com.example.kitact.data.model.UserRole;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.persistence.EnumType;
import javax.persistence.Enumerated;

@Controller
@RequestMapping("/")
public class HomeController {
    @GetMapping
    public String home(Model model, @AuthenticationPrincipal UserDetailsImpl userDetails) {
        model.addAttribute("username", userDetails.getUsername());
        return "index";
    }
}
