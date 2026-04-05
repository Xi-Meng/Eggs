//package com.example.demo.controller;
//
//import org.springframework.web.bind.annotation.GetMapping;
//import org.springframework.web.bind.annotation.RequestParam;
//import org.springframework.web.bind.annotation.RestController;
//
//// 全部清空，只留这个！
//@RestController
//public class TestController {
//
//    // 1. 测试连通（你已经能用）
//    @GetMapping("/hello")
//    public String hello() {
//        return "✅ 后端公网连通成功！";
//    }
//
//    // 2. 给硬件获取ID（必通）
//    @GetMapping("/get-id")
//    public String getId() {
//        return "2040365833505034241";
//    }
//
//    // 3. 硬件上传温度（最简单接收）
//    @GetMapping("/upload-temp")
//    public String uploadTemp(@RequestParam String value) {
//        System.out.println("📶 硬件上传成功：" + value);
//        return "ok";
//    }
//
//}