package com.example.demo.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.example.demo.entity.Food;
import java.util.List;

public interface FoodService extends IService<Food> {
    List<Food> getListByCategoryId(Long categoryId);
    List<Food> search(String keyword);
}