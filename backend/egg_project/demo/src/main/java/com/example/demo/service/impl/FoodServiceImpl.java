package com.example.demo.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.example.demo.entity.Food;
import com.example.demo.mapper.FoodMapper;
import com.example.demo.service.FoodService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FoodServiceImpl extends ServiceImpl<FoodMapper, Food> implements FoodService {

    @Override
    public List<Food> getListByCategoryId(Long categoryId) {
        LambdaQueryWrapper<Food> wrapper = new LambdaQueryWrapper<>();
        wrapper.eq(Food::getCategoryId, categoryId);
        return list(wrapper);
    }
    @Override
    public List<Food> search(String keyword) {
        LambdaQueryWrapper<Food> wrapper = new LambdaQueryWrapper<>();
        // 修正为 Food::getFoodName（对应实体的 foodName 属性）
        wrapper.like(Food::getName, keyword);
        return list(wrapper);
    }
}