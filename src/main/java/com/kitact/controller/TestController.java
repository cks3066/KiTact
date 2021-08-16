package com.kitact.controller;

import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.*;

import java.text.SimpleDateFormat;
import java.util.Date;

@RestController
@RequestMapping("/test")
public class TestController {
    @GetMapping("/time")
    String getTime() {
        return new SimpleDateFormat("yyyy년 MM월 dd일 hh:mm:ss").format(new Date().getTime());
    }

    @GetMapping
    String getTest() {
        return "get";
    }

    @PostMapping
    String postTest() {
        return "post";
    }
    @PutMapping
    String putTest() {
        return "put";
    }
    @DeleteMapping
    String deleteTest() {
        return "delete";
    }
}
