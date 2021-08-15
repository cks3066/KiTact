package com.kitact.data.model;

import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

class UserTest {
    @Test
    void test() {
        User user = new User();
        user.setUsername("이름");
        user.setPassword("123");

        System.out.println(">>> " + user);
    }

}