package com.example.demo.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.example.demo.entity.CookHistoryPoint;
import com.example.demo.mapper.CookHistoryPointMapper;
import com.example.demo.service.CookHistoryPointService;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class CookHistoryPointServiceImpl extends ServiceImpl<CookHistoryPointMapper, CookHistoryPoint>
        implements CookHistoryPointService {

    @Override
    public List<CookHistoryPoint> getByHistoryId(Long historyId) {
        LambdaQueryWrapper<CookHistoryPoint> wrapper = new LambdaQueryWrapper<>();
        wrapper.eq(CookHistoryPoint::getHistoryId, historyId);
        wrapper.orderByAsc(CookHistoryPoint::getCollectTime); // 保证曲线是按时间顺序的
        return this.list(wrapper);
    }
}