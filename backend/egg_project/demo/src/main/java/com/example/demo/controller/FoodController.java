package com.example.demo.controller;

import com.example.demo.entity.Food;
import com.example.demo.entity.SmokeLog;
import com.example.demo.service.FoodService;
import com.example.demo.service.SmokeLogService;
import com.example.demo.util.Result;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/food")
@CrossOrigin
public class FoodController {
    @Resource
    private FoodService foodService;

    // 前端调用此接口：获取所有食物列表供选择
    @GetMapping("/list")
    public Result<List<Food>> list() {
        return Result.success(foodService.list());
    }

    // 前端点击具体食物后：获取该食物的所有参考参数（最佳温度、盐度区间等）
    @GetMapping("/detail/{id}")
    public Result<Food> getDetail(@PathVariable Long id) {
        return Result.success(foodService.getById(id));
    }
}