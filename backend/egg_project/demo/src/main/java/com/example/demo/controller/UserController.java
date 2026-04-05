package com.example.demo.controller;

import com.example.demo.entity.SysUser;
import com.example.demo.service.UserService;
import com.example.demo.util.Result;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;

@RestController
@RequestMapping("/user")
public class UserController {

    // 你自己的 Service，完全不变
    @Resource
    private UserService userService;

    /**
     * 登录接口
     */
    @GetMapping("/login")
    public Result<SysUser> login(
            @RequestParam String email,
            @RequestParam String password
    ) {
        return userService.login(email, password);
    }

    /**
     * 注册接口
     */
    @GetMapping("/register")
    public Result<String> register(
            @RequestParam String email,
            @RequestParam String password
    ) {
        return userService.register(email, password);
    }


}