package com.kitact.configuration.security;

import com.kitact.data.model.UserRole;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import javax.servlet.http.HttpServletRequest;
import java.nio.charset.StandardCharsets;
import java.util.Base64;
import java.util.Date;
import java.util.List;

/**
 * JWT 생성 및 검증 모듈입니다.
 */
@RequiredArgsConstructor
@Component
public class JWTProvider {
    //application.properties 에서 해당 항목을 찾아 값을 넣어줍니다.
    @Value("spring.jwt.secret")
    private String secretKey;

    // 토큰 만료시간, 24시간 동안 유효합니다.
    private long tokenValidMilisecond = 1000L * 60 * 60 * 24;

    private final UserDetailsService userDetailsService;

    @PostConstruct
    protected void init() {
        secretKey = Base64.getEncoder().encodeToString(secretKey.getBytes());
    }

    // JWT 생성
    public String createToken(String userPK, UserRole role) {
        Date now = new Date();
        Claims claims = Jwts.claims().setSubject(userPK);
        claims.put("roles", role);
        return Jwts.builder()
                .setClaims(claims) // JWT 데이터
                .setIssuedAt(now) // JWT 발행일자
                .setExpiration(new Date(now.getTime() + tokenValidMilisecond)) // JWT 만료일자
                .signWith(SignatureAlgorithm.HS256, secretKey) // 암호화 알고리즘, secret 값 세팅
                .compact();
    }

    // JWT으로 인증 정보를 조회
    public Authentication getAuthentication(String token) {
        UserDetails userDetails = userDetailsService.loadUserByUsername(this.getUserPK(token));
        return new UsernamePasswordAuthenticationToken(userDetails, "", userDetails.getAuthorities());
    }

    // JWT에서 회원 구별 정보(user Primary Key) 추출
    public String getUserPK(String token) {
        return Jwts.parser()
                .setSigningKey(secretKey)
                .parseClaimsJws(token)
                .getBody()
                .getSubject();
    }

    // Request의 Header에서 X-AUTH-TOKEN(JWT) 파싱
    public String resolveToken(HttpServletRequest request) {
        return request.getHeader("X-AUTH-TOKEN");
    }

    // JWT의 유효성과 만료일자를 확인합니다.
    public boolean validateToken(String token) {
        try {
            Jws<Claims> claimsJws = Jwts.parser()
                    .setSigningKey(secretKey)
                    .parseClaimsJws(token);
            return !claimsJws.getBody().getExpiration().before(new Date());
        } catch (Exception e) {
            return false;
        }
    }
}
