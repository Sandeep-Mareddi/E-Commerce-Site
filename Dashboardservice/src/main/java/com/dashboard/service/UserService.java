package com.dashboard.service;

import com.dashboard.model.User;


public interface UserService {

    public User getUserByUserName(String userName);

    public User getUserByEmail(String email);

    public User saveUser(User user);
}
