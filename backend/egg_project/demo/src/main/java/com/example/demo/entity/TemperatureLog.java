package com.example.demo.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;
import java.time.LocalDateTime;

@Data
@TableName("temperature_log")
public class TemperatureLog {
    @TableId(type = IdType.AUTO)
    private Long id;
    private String deviceSn;
    private Long cookHistoryId;
    private Integer currentTemp;
    private LocalDateTime logTime;
}