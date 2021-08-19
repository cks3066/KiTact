package com.kitact.controller;

import com.kitact.advice.exception.AuthenticationEntryPointException;
import com.kitact.data.response.BaseResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/exception")
public class ExceptionController {

    @GetMapping("/entrypoint")
    BaseResponse entrypointException() {
        throw new AuthenticationEntryPointException();
    }

    @GetMapping("/access-denied")
    BaseResponse accessDeniedException() {
        throw new AccessDeniedException("");
    }
}
