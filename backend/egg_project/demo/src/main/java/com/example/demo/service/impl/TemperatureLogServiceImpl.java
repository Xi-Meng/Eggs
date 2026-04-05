package com.example.demo.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.example.demo.entity.TemperatureLog;
import com.example.demo.mapper.TemperatureLogMapper;
import com.example.demo.service.TemperatureLogService;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class TemperatureLogServiceImpl extends ServiceImpl<TemperatureLogMapper, TemperatureLog>
        implements TemperatureLogService {

    @Override
    public List<TemperatureLog> getByHistoryId(Long historyId) {
        LambdaQueryWrapper<TemperatureLog> wrapper = new LambdaQueryWrapper<>();
        wrapper.eq(TemperatureLog::getCookHistoryId, historyId);
        wrapper.orderByAsc(TemperatureLog::getLogTime);
        return list(wrapper);
    }
}