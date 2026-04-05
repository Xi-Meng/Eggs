package com.example.demo.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.example.demo.entity.UserFavorite;
import com.example.demo.mapper.UserFavoriteMapper;
import com.example.demo.service.UserFavoriteService;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class UserFavoriteServiceImpl extends ServiceImpl<UserFavoriteMapper, UserFavorite>
        implements UserFavoriteService {

    @Override
    public boolean add(Long userId, Long foodId) {
        UserFavorite fav = new UserFavorite();
        fav.setUserId(userId);
        fav.setFoodId(foodId);
        fav.setCreatedAt(LocalDateTime.now());
        return save(fav);
    }

    @Override
    public boolean remove(Long userId, Long foodId) {
        LambdaQueryWrapper<UserFavorite> wrapper = new LambdaQueryWrapper<>();
        wrapper.eq(UserFavorite::getUserId, userId);
        wrapper.eq(UserFavorite::getFoodId, foodId);
        return remove(wrapper);
    }

    @Override
    public List<UserFavorite> listByUser(Long userId) {
        LambdaQueryWrapper<UserFavorite> wrapper = new LambdaQueryWrapper<>();
        wrapper.eq(UserFavorite::getUserId, userId);
        return list(wrapper);
    }
}