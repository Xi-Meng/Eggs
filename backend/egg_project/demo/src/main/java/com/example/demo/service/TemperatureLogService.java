package com.example.demo.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.example.demo.entity.TemperatureLog;
import java.util.List;

public interface TemperatureLogService extends IService<TemperatureLog> {
    List<TemperatureLog> getByHistoryId(Long historyId);
}