package com.example.demo.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.example.demo.entity.SmokeLog;
import com.example.demo.entity.TemperatureLog;

import java.util.List;

public interface SmokeLogService extends IService<SmokeLog> {
    List<SmokeLog> getByHistoryId(Long historyId);
}