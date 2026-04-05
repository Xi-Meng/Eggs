package com.example.demo.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import lombok.Data;
import java.time.LocalDateTime;

@Data
public class CookHistory {
    // CookHistory.java
    @TableId(type = IdType.INPUT) // 关键：改为手动输入模式
    private Long id;
    private Long userId;
    private Long foodId;
    private String deviceSn;
    private LocalDateTime startTime;
    private LocalDateTime endTime;
    private Integer realCookTime;
    private LocalDateTime createdAt;
}