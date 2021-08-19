package com.kitact.advice;

import com.kitact.advice.exception.AuthenticationEntryPointException;
import com.kitact.data.response.BaseResponse;
import com.kitact.service.ResponseService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import javax.servlet.http.HttpServletRequest;

@RequiredArgsConstructor
@RestControllerAdvice
public class ExceptionAdvice {
    private final ResponseService responseService;

    @ExceptionHandler(RuntimeException.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    protected BaseResponse exception(HttpServletRequest request, RuntimeException exception) {
        return responseService.getFailResponse(ResponseService.Response.NOT_DEFINE_ERROR);
    }

    @ExceptionHandler(AuthenticationEntryPointException.class)
    @ResponseStatus(HttpStatus.FORBIDDEN)
    protected BaseResponse authenticationEntryPointException(HttpServletRequest request, AuthenticationEntryPointException exception) {
        return responseService.getFailResponse(ResponseService.Response.ACCESS_DENIED);
    }

    @ExceptionHandler(AccessDeniedException.class)
    @ResponseStatus(HttpStatus.FORBIDDEN)
    protected BaseResponse accessDeniedException(HttpServletRequest request, AccessDeniedException exception) {
        return responseService.getFailResponse(ResponseService.Response.ACCESS_DENIED);
    }
}
