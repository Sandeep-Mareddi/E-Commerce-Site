package com.dashboard.filter;

import com.dashboard.helper.JwtHelper;
import com.dashboard.model.User;
import com.dashboard.service.CustomUserDetailsService;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.MalformedJwtException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
public class JwtAuthenticationFilter  extends OncePerRequestFilter {

    private final Logger logger = LoggerFactory.getLogger(OncePerRequestFilter.class);

    @Autowired
    private JwtHelper jwtHelper;
    @Autowired
    private CustomUserDetailsService customUserDetailsService;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        String requestHeader = request.getHeader("Authorization");
        logger.info("Header: {}", requestHeader);
        String username = null;
        String token = null;
        if(requestHeader != null && requestHeader.startsWith("Bearer")){
            token = requestHeader.substring(7);
            try {
                username = this.jwtHelper.getUsernameFromToken(token);
            }catch (IllegalArgumentException e){
                logger.error("Illegal Argument while fetching the username");
                throw new IllegalArgumentException();
            }catch (ExpiredJwtException e){
                logger.error("Given jwt token is expired !!");
                throw new ExpiredJwtException(e.getHeader(), e.getClaims(), e.getMessage());
            }catch (MalformedJwtException e){
                logger.error("Some changes has done in token !! Invalid Token");
                throw new MalformedJwtException(e.getMessage());
            }catch (Exception e){
                logger.error("Exception occurred in the JwtAuthenticationFilter class");
                throw new RuntimeException();
            }
        }else{
            logger.error("Invalid Header value!!");
        }

        if(username != null && SecurityContextHolder.getContext().getAuthentication() == null){
            User user = this.customUserDetailsService.loadUserByUsername(username);
            Boolean validationToken = this.jwtHelper.validateToken(token, user);
            if(validationToken){
                UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(user, null, user.getAuthorities());
                authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                SecurityContextHolder.getContext().setAuthentication(authentication);
            }else{
                logger.info("validation fails !!");
            }
        }

        filterChain.doFilter(request, response);
    }
}
