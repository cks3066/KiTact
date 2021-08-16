package com.kitact.data.model;

import com.kitact.data.model.base.Timestamped;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

/**
 * 유저 정보를 담당하는 Entity 클래스입니다.
 */
@Entity
@Getter
@NoArgsConstructor // 기본 생성자를 만들어줍니다.
@Table(name = "tb_user")
public class User extends Timestamped {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long user_id;

    @Column(nullable = false)
    private String username;

    @Column(nullable = false)
    private String password;

    @Column(nullable = false)
    @Enumerated(value = EnumType.STRING)
    private UserRole role;

    public User(String username, String password, UserRole role) {
        this.username = username;
        this.password = password;
        this.role = role;
    }
}
