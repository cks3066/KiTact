package com.kitact.data.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * 유저의 회원가입 요청시 전달되는 DTO 클래스
 */
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class SignUpRequestDTO {
    private String username;
    private String password;
    private boolean admin = false;
    private boolean owner = false;
    private String adminToken = "";
}
