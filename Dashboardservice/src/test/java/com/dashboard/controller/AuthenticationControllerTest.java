package com.dashboard.controller;

import com.dashboard.helper.JwtHelper;
import com.dashboard.model.AuthenticationRequest;
import com.dashboard.model.AuthenticationResponse;
import com.dashboard.model.User;
import com.dashboard.service.CustomUserDetailsService;
import com.dashboard.service.UserService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.test.web.servlet.MockMvc;


import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc

class AuthenticationControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private CustomUserDetailsService customUserDetailsService;
    @MockBean
    private AuthenticationManager authenticationManager;
    @MockBean
    private UserService userService;

    @MockBean
    private JwtHelper jwtHelper;
    @Autowired
    private ObjectMapper objectMapper;
    private User user;


    @BeforeEach
    void setUp() {
        user = User.builder()
                .Id(1L)
                .userName("krishna")
                .email("krishna@gmail.com")
                .password("krishna")
                .build();
    }

    @Test
    @DisplayName("Creating a new User by taking details!!")
    void createUser() throws Exception {
        User inputUser = User.builder()
                .userName("krishna")
                .email("krishna@gmail.com")
                .password("krishna")
                .build();
        String json = this.objectMapper.writeValueAsString(inputUser);
        Mockito.when(userService.saveUser(inputUser)).thenReturn(user);
        mockMvc.perform(post("/auth/signup").contentType(MediaType.APPLICATION_JSON)
                .content(json)).andExpect(status().isCreated())
                .andExpect(content().string("User successfully Created!!"));
    }

    @Test
    @DisplayName("Checking when the username already exist!!")
    void whenUserNameAlreadyExist() throws Exception {
        Mockito.when(userService.getUserByUserName("krishna")).thenReturn(user);
        mockMvc.perform(post("/auth/signup").contentType(MediaType.APPLICATION_JSON)
                .content("""
                        {
                            "userName" : "krishna",
                            "email" : "krishna@gmail.com",
                            "password" : "krishna"
                        }""")).andExpect(status().isNotAcceptable())
                .andExpect(content().string("Username already Exists!!"));
    }

    @Test
    @DisplayName("Checking when the email already exist!!")
    void whenUserEmailAlreadyExist() throws Exception {
        Mockito.when(userService.getUserByEmail("krishna@gmail.com")).thenReturn(user);
        mockMvc.perform(post("/auth/signup").contentType(MediaType.APPLICATION_JSON)
                .content("""
                        {
                            "userName" : "krishna",
                            "email" : "krishna@gmail.com",
                            "password" : "krishna"
                        }""")).andExpect(status().isNotAcceptable())
                .andExpect(content().string("User email already exists!!"));
    }

    @Test
    @DisplayName("when user successfully login!!")
    void whenUserSuccessfullyLogin() throws Exception{
        AuthenticationRequest authenticationRequest = AuthenticationRequest.builder()
                .username("krishna")
                .password("krishna")
                .build();
        AuthenticationResponse authenticationResponse = AuthenticationResponse.builder()
                .username("krishna")
                .isValid(true)
                .jwtToken("eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJrcmlzaG5hIiwiaWF0IjoxNzA0NjEyMDA4LCJleHAiOjE3MDQ2NDgwMDh9.YN7gZ6ez7olGWGqgq7x5xk-4lK-5LA-FONfDXzu2gDMN3DK6EKMZ4dnMJ6D8kPIPihA5ULS7rVQKp_TNO64vsA")
                .build();
        String token = "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJrcmlzaG5hIiwiaWF0IjoxNzA0NjEyMDA4LCJleHAiOjE3MDQ2NDgwMDh9.YN7gZ6ez7olGWGqgq7x5xk-4lK-5LA-FONfDXzu2gDMN3DK6EKMZ4dnMJ6D8kPIPihA5ULS7rVQKp_TNO64vsA";
        String request = this.objectMapper.writeValueAsString(authenticationRequest);
        String response = this.objectMapper.writeValueAsString(authenticationResponse);
        Mockito.when(customUserDetailsService.loadUserByUsername("krishna")).thenReturn(user);
        Mockito.when(jwtHelper.generateToken(user)).thenReturn(token);
        mockMvc.perform(post("/auth/login").contentType(MediaType.APPLICATION_JSON)
                .content(request)
                .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(content().string(response));
    }
    @Test
    @DisplayName("When the user password is incorrect!!")
    void whenUserPasswordIsIncorrect() throws Exception {
        AuthenticationRequest authenticationRequest = AuthenticationRequest.builder()
                        .username("krishna")
                        .password("krishna1").build();
        String request = this.objectMapper.writeValueAsString(authenticationRequest);
        Mockito.when(authenticationManager.authenticate(new UsernamePasswordAuthenticationToken("krishna","krishna1")))
                .thenThrow(BadCredentialsException.class);
        mockMvc.perform(post("/auth/login").contentType(MediaType.APPLICATION_JSON)
                        .content(request)
                        .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$.message").value("Invalid password!"));
    }

    @Test
    @DisplayName("When username is incorrect!!")
    void whenUserDoesNotExist() throws Exception{
        AuthenticationRequest authenticationRequest = AuthenticationRequest.builder()
                .username("krishna1")
                .password("krishna").build();
        String request = this.objectMapper.writeValueAsString(authenticationRequest);
        Mockito.when(customUserDetailsService.loadUserByUsername("krishna1")).thenThrow(UsernameNotFoundException.class);

        mockMvc.perform(post("/auth/login").contentType(MediaType.APPLICATION_JSON)
                .content(request)
                .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$.httpStatus").value("NOT_ACCEPTABLE"));
    }
}