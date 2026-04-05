package com.example.demo.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.example.demo.entity.FoodCategory;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface FoodCategoryMapper extends BaseMapper<FoodCategory> {
}