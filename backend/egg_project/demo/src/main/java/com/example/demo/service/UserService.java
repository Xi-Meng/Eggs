package com.example.demo.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.example.demo.entity.SysUser;
import com.example.demo.util.Result;

public interface UserService extends IService<SysUser> {
    Result<SysUser> login(String email, String password);
    Result<String> register(String email, String password);
}