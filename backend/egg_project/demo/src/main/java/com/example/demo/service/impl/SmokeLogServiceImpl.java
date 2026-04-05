package com.example.demo.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.example.demo.entity.SmokeLog;
import com.example.demo.entity.TemperatureLog;
import com.example.demo.mapper.SmokeLogMapper;
import com.example.demo.service.SmokeLogService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SmokeLogServiceImpl extends ServiceImpl<SmokeLogMapper, SmokeLog>
        implements SmokeLogService {
    @Override
    public List<SmokeLog> getByHistoryId(Long historyId) {
        LambdaQueryWrapper<SmokeLog> wrapper = new LambdaQueryWrapper<>();
        wrapper.eq(SmokeLog::getCookHistoryId, historyId);
        wrapper.orderByAsc(SmokeLog::getLogTime);
        return list(wrapper);
    }
}