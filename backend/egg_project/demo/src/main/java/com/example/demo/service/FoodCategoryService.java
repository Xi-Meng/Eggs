package com.example.demo.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.example.demo.entity.FoodCategory;
import java.util.List;

public interface FoodCategoryService extends IService<FoodCategory> {
    List<FoodCategory> getAllCategory();
}