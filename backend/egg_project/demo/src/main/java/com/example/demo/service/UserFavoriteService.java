package com.example.demo.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.example.demo.entity.UserFavorite;
import java.util.List;

public interface UserFavoriteService extends IService<UserFavorite> {
    boolean add(Long userId, Long foodId);
    boolean remove(Long userId, Long foodId);
    List<UserFavorite> listByUser(Long userId);
}