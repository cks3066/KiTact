package com.kitact.controller;

import com.kitact.advice.exception.AccessDeniedException;
import com.kitact.data.response.BaseResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/exception")
public class ExceptionController {

    @GetMapping("/entrypoint")
    BaseResponse entrypointException() {
        throw new AccessDeniedException();
    }

    @GetMapping("/access-denied")
    BaseResponse accessDeniedException() {
        throw new AccessDeniedException();
    }
}
