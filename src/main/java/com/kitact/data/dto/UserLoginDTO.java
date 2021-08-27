package com.kitact.data.dto;

import lombok.*;

/**
 * 유저의 로그인 요청이 성공된 이후 유저에게 전달될 DTO 클래스
 */
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class UserLoginDTO {
    private String token;
}
