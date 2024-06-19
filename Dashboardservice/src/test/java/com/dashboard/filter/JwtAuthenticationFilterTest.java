package com.dashboard.filter;

import com.dashboard.helper.JwtHelper;
import com.dashboard.model.User;
import com.dashboard.service.CustomUserDetailsService;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.MalformedJwtException;
import jakarta.servlet.ServletException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.mock.web.MockFilterChain;
import org.springframework.mock.web.MockHttpServletRequest;
import org.springframework.mock.web.MockHttpServletResponse;

import java.io.IOException;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class JwtAuthenticationFilterTest {

    @Autowired
    private JwtAuthenticationFilter jwtAuthenticationFilter;

    @MockBean
    private CustomUserDetailsService customUserDetailsService;

    @MockBean
    private JwtHelper jwtHelper;

    MockHttpServletRequest request;
    MockHttpServletResponse response;

    MockFilterChain filterChain;

    User user;

    String token ="eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJrcmlzaG5hIiwiaWF0IjoxNzA0NjEyMDA4LCJleHAiOjE3MDQ2NDgwMDh9.YN7gZ6ez7olGWGqgq7x5xk-4lK-5LA-FONfDXzu2gDMN3DK6EKMZ4dnMJ6D8kPIPihA5ULS7rVQKp_TNO64vsA";

    @BeforeEach
    void setUp() {
        String bearerToken = "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJrcmlzaG5hIiwiaWF0IjoxNzA0NjEyMDA4LCJleHAiOjE3MDQ2NDgwMDh9.YN7gZ6ez7olGWGqgq7x5xk-4lK-5LA-FONfDXzu2gDMN3DK6EKMZ4dnMJ6D8kPIPihA5ULS7rVQKp_TNO64vsA";
        request = new MockHttpServletRequest();
        response = new MockHttpServletResponse();
        filterChain = new MockFilterChain();

        request.addHeader("Authorization", bearerToken);

        user = User.builder()
                .Id(1L)
                .userName("krishna")
                .email("krishna@gmail.com")
                .password("krishna")
                .build();
    }

    @Test
    void testingDoFilterInternalIllegalArgumentException() {
        Mockito.when(jwtHelper.getUsernameFromToken(token)).thenThrow(IllegalArgumentException.class);
        assertThrows(IllegalArgumentException.class,() ->jwtAuthenticationFilter.doFilterInternal(request,response,filterChain));
    }

    @Test
    void testingDoFilterInternalExpiredJwtException() {
        Mockito.when(jwtHelper.getUsernameFromToken(token)).thenThrow(ExpiredJwtException.class);
        assertThrows(ExpiredJwtException.class,() ->jwtAuthenticationFilter.doFilterInternal(request,response,filterChain));
    }

    @Test
    void testingDoFilterInternalMalformedJwtException() {
        Mockito.when(jwtHelper.getUsernameFromToken(token)).thenThrow(MalformedJwtException.class);
        assertThrows(MalformedJwtException.class,() ->jwtAuthenticationFilter.doFilterInternal(request,response,filterChain));
    }

    @Test
    void testingDoFilterInternalRuntimeException() {
        Mockito.when(jwtHelper.getUsernameFromToken(token)).thenThrow(RuntimeException.class);
        assertThrows(RuntimeException.class,() ->jwtAuthenticationFilter.doFilterInternal(request,response,filterChain));
    }

    @Test
    void testingDoFilterInternalValidationFail() throws ServletException, IOException {
        Mockito.when(jwtHelper.getUsernameFromToken(token)).thenReturn("krishna");
        Mockito.when(customUserDetailsService.loadUserByUsername("krishna")).thenReturn(user);
        Mockito.when(jwtHelper.validateToken(this.token, this.user)).thenReturn(false);

        jwtAuthenticationFilter.doFilterInternal(request, response, filterChain);
    }
}