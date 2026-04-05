package com.example.demo.controller;

import lombok.Data;

@Data
public class DetectDTO {
    private Double temperature; // 温度
    private Double salinity;    // 盐度
    private String deviceSn;    // 设备编号（蓝牙设备ID）
    private String foodType;    // 食物类型（牛肉/鸡蛋等）
}