package com.example.kitact.service;

import com.example.kitact.data.dto.SignUpRequestDTO;
import com.example.kitact.data.model.UserEntity;
import com.example.kitact.data.model.UserRole;
import com.example.kitact.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;

    @Autowired
    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder, AuthenticationManager authenticationManager) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.authenticationManager = authenticationManager;
    }

    //회원가입
    public UserEntity signUpUser(SignUpRequestDTO signUpRequestDTO) {
        String username = signUpRequestDTO.getUsername();

        Optional<UserEntity> found = userRepository.findByUsername(username);
        if (found.isPresent()) {
            throw new IllegalArgumentException("사용자 이름 : "+username+"을 누군가 사용중입니다!");
        }

        //패스워드 인코딩
        String password = passwordEncoder.encode(signUpRequestDTO.getPassword());
        UserRole userRole = signUpRequestDTO.getRole();

        //입력된 정보를 이용하여 DB에 저장합니다.
        UserEntity userEntity = new UserEntity(username, password, userRole);
        return userRepository.save(userEntity);
    }
}
