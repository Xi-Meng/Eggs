package com.example.demo.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.example.demo.entity.FoodCategory;
import com.example.demo.mapper.FoodCategoryMapper;
import com.example.demo.service.FoodCategoryService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FoodCategoryServiceImpl extends ServiceImpl<FoodCategoryMapper, FoodCategory>
        implements FoodCategoryService {

    @Override
    public List<FoodCategory> getAllCategory() {
        return list();
    }
}