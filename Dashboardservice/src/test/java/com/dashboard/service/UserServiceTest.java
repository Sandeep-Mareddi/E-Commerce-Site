package com.dashboard.service;

import com.dashboard.model.User;
import com.dashboard.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.security.crypto.password.PasswordEncoder;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class UserServiceTest {

    @Autowired
    private UserService userService;

    @MockBean
    private UserRepository userRepository;

    @MockBean
    private PasswordEncoder passwordEncoder;

    private User user;

    @BeforeEach
    void setUp() {
         user = User.builder()
                .Id(1L)
                .userName("krishna")
                .email("krishna@gmail.com")
                .password("krishna")
                .build();
        User outputUser = User.builder()
                .Id(1L)
                .userName("krishna")
                .email("krishna@gmail.com")
                .password("$2a$04$Ss/t.nIQ9ZJDXYmp6vL8neXg67vPGDhir08/LXh6zqyi4e8aRUvGW")
                .build();

        User inputUser = User.builder()
                .userName("krishna")
                .email("krishna@gmail.com")
                .password("$2a$04$Ss/t.nIQ9ZJDXYmp6vL8neXg67vPGDhir08/LXh6zqyi4e8aRUvGW")
                .build();

        Mockito.when(passwordEncoder.encode("krishna")).thenReturn("$2a$04$Ss/t.nIQ9ZJDXYmp6vL8neXg67vPGDhir08/LXh6zqyi4e8aRUvGW");
        Mockito.when(userRepository.save(inputUser)).thenReturn(outputUser);
    }


    @Test
    @DisplayName("Getting user by using username!!")
    void testingGetUserByUserName() {
        Mockito.when(userRepository.findByUserName("krishna")).thenReturn(user);
        User foundUser = userService.getUserByUserName("krishna");
        assertEquals("krishna@gmail.com", foundUser.getEmail());
    }

    @Test
    @DisplayName("Getting user by using email!!")
    void testingGetUserByEmail() {
        Mockito.when(userRepository.findByEmail("krishna@gmail.com")).thenReturn(user);
        User foundUser = userService.getUserByEmail("krishna@gmail.com");
        assertEquals("krishna", foundUser.getUsername());
    }

    @Test
    @DisplayName("Saving the User details by using PasswordEncoder!!")
    void testingSaveUser() {
        User newUser = User.builder()
                .userName("krishna")
                .email("krishna@gmail.com")
                .password("krishna")
                .build();
        User actualUser = userService.saveUser(newUser);
        assertEquals("$2a$04$Ss/t.nIQ9ZJDXYmp6vL8neXg67vPGDhir08/LXh6zqyi4e8aRUvGW", actualUser.getPassword());
    }
}