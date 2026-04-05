package com.example.demo.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.example.demo.entity.SysUser;
import com.example.demo.mapper.SysUserMapper;
import com.example.demo.service.UserService;
import com.example.demo.util.Result;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl extends ServiceImpl<SysUserMapper, SysUser> implements UserService {

    @Override
    public Result<SysUser> login(String email, String password) {
        LambdaQueryWrapper<SysUser> wrapper = new LambdaQueryWrapper<>();
        wrapper.eq(SysUser::getEmail, email);
        SysUser user = getOne(wrapper);

        if (user == null) {
            return Result.error("用户不存在");
        }
        if (!user.getPassword().equals(password)) {
            return Result.error("密码错误");
        }
        return Result.success(user);
    }

    @Override
    public Result<String> register(String email, String password) {
        LambdaQueryWrapper<SysUser> wrapper = new LambdaQueryWrapper<>();
        wrapper.eq(SysUser::getEmail, email);
        if (count(wrapper) > 0) {
            return Result.error("邮箱已被注册");
        }

        SysUser user = new SysUser();
        user.setEmail(email);
        user.setPassword(password);
        save(user);

        return Result.success("注册成功");
    }
}