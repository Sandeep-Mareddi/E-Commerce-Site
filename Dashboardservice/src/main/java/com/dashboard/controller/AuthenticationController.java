package com.dashboard.controller;

import com.dashboard.helper.JwtHelper;
import com.dashboard.model.AuthenticationRequest;
import com.dashboard.model.AuthenticationResponse;
import com.dashboard.model.User;
import com.dashboard.service.CustomUserDetailsService;
import com.dashboard.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "*")
@Tag(name = "AuthController", description = "APIs for Authentications!!")
public class AuthenticationController {

    private static final Logger logger = LoggerFactory.getLogger(AuthenticationController.class);

    @Autowired
    private UserService userService;

    @Autowired
    private CustomUserDetailsService customUserDetailsService;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtHelper jwtHelper;

    @Operation(summary = "Creating new user!!", description = "This API is used for sign up")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Success | OK"),
            @ApiResponse(responseCode = "201", description = "new user created"),
            @ApiResponse(responseCode = "406", description = "Enter valid details")
    })
    @PostMapping("/signup")
    public ResponseEntity<String> createUser(@RequestBody User user) {
        User user1 = userService.getUserByUserName(user.getUsername());
        User user2 = userService.getUserByEmail(user.getEmail());
        if (user1 == null && user2 == null) {
            userService.saveUser(user);
            logger.info("User Successfully created!!");
            return ResponseEntity.status(HttpStatus.CREATED).body("User successfully Created!!");
        } else {
            if (user1 != null) {
                logger.info("username already exists!!");
                return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body("Username already Exists!!");
            }
            logger.info("user email already exists!!");
            return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body("User email already exists!!");
        }
    }

    @PostMapping("/login")
    public ResponseEntity<AuthenticationResponse> login(@Valid @RequestBody AuthenticationRequest request){
        try{
            User user = customUserDetailsService.loadUserByUsername(request.getUsername());
        this.doAuthentication(request.getUsername(), request.getPassword());
        String token = this.jwtHelper.generateToken(user);
        AuthenticationResponse response = AuthenticationResponse.builder().jwtToken(token)
                .username(user.getUsername()).isValid(true).build();
        logger.info("successfully login!!");
        return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (UsernameNotFoundException e) {
            logger.info(e.getMessage());
            throw new UsernameNotFoundException(e.getMessage());
        }
    }

    private void doAuthentication(String username, String password){
        UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(username, password );
        try{
            authenticationManager.authenticate(authentication);
        }catch (BadCredentialsException e){
            logger.info("Invalid password!");
            throw new BadCredentialsException("Invalid password!");
        }
    }
}

