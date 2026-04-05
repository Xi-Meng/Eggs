package com.example.demo.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.example.demo.entity.CookHistory;
import com.example.demo.mapper.CookHistoryMapper;
import com.example.demo.service.CookHistoryService;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class CookHistoryServiceImpl extends ServiceImpl<CookHistoryMapper, CookHistory>
        implements CookHistoryService {

    @Override
    public List<CookHistory> listByUser(Long userId) {
        LambdaQueryWrapper<CookHistory> wrapper = new LambdaQueryWrapper<>();
        wrapper.eq(CookHistory::getUserId, userId);
        wrapper.orderByDesc(CookHistory::getCreatedAt);
        return list(wrapper);
    }
}