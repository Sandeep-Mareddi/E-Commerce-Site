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
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class CustomUserDetailsServiceTest {

    @Autowired
    private CustomUserDetailsService customUserDetailsService;

    @MockBean
    private UserRepository userRepository;

    @BeforeEach
    void setUp() {
        User user = User.builder()
                .Id(1L)
                .userName("krishna")
                .email("krishna@gmail.com")
                .password("krishna")
                .build();

        Mockito.when(userRepository.findByUserName("krishna")).thenReturn(user);

    }

    @Test
    @DisplayName("When the user is loaded by using username!")
    void testingLoadUserByUsername() {
        User foundUser = customUserDetailsService.loadUserByUsername("krishna");
        assertEquals("krishna@gmail.com" , foundUser.getEmail());
    }

    @Test
    @DisplayName("checking the UsernameNotFoundException when wrong username is given!! ")
    void testingExceptionWhenWrongUsernameGiven(){
        assertThrows(UsernameNotFoundException.class, () -> customUserDetailsService.loadUserByUsername("Ram"));
    }
}