//package com.example.demo.controller;
//
//import com.example.demo.entity.FoodCategory;
//import com.example.demo.service.FoodCategoryService;
//import com.example.demo.util.Result;
//import org.springframework.web.bind.annotation.GetMapping;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.RestController;
//
//import javax.annotation.Resource;
//import java.util.List;
//
//@RestController
//@RequestMapping("/food/category")
//public class FoodCategoryController {
//
//    @Resource
//    private FoodCategoryService foodCategoryService;
//
//    // 获取所有食物分类（顶部分类栏）
//    @GetMappng("/list")
//    public Result<List<FoodCategory>> list() {
//        List<FoodCategory> list = foodCategoryService.getAllCategory();
//        return Result.success(list);
//    }
//}