package com.example.demo.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.example.demo.entity.CookHistoryPoint;
import java.util.List;

public interface CookHistoryPointService extends IService<CookHistoryPoint> {
    // 可以在这里定义特殊的业务方法，比如按 historyId 获取所有点
    List<CookHistoryPoint> getByHistoryId(Long historyId);
}