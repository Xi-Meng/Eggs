package com.example.demo.controller;

import com.example.demo.entity.CookHistory;
import com.example.demo.entity.CookHistoryPoint;
import com.example.demo.entity.Food;
import com.example.demo.service.CookHistoryPointService;
import com.example.demo.service.CookHistoryService;
import com.example.demo.service.FoodService;
import com.example.demo.util.Result;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import java.time.LocalDateTime;

@RestController
@RequestMapping("/detect")
@CrossOrigin
public class DetectController {

    @Resource
    private CookHistoryPointService pointService;
    @Resource
    private CookHistoryService cookHistoryService;
    @Resource
    private FoodService foodService;

    @GetMapping("/add-point")
    public Result<CookHistoryPoint> addPoint(
            @RequestParam Long historyId,
            @RequestParam Double temp,
            @RequestParam Double salt,
            @RequestParam Double oilFume) {

        CookHistoryPoint point = new CookHistoryPoint();
        point.setHistoryId(historyId);
        point.setTemp(temp);
        point.setSalt(salt);
        point.setOilFume(oilFume);
        point.setCollectTime(LocalDateTime.now());

        // 1. 获取烹饪记录
        CookHistory history = cookHistoryService.getById(historyId);
        if (history != null && history.getFoodId() != null) {
            // 2. 获取食物 ID 对应的 1-7 号标准数据
            Food food = foodService.getById(history.getFoodId());

            if (food != null) {
                // --- 判定 1: 熟了没 (距离最佳温度 5 度以内) ---
                if (food.getBestTemp() != null) {
                    point.setTempDone(temp >= (food.getBestTemp() - 5.0));
                }

                // --- 判定 2: 油烟高吗 (接近 50 时触发) ---
                point.setSmokeHigh(oilFume >= 45.0);

                // --- 判定 3: 咸度等级 (1-淡, 2-准, 3-咸) ---
                if (salt < food.getLower_salt()) {
                    point.setSaltLevel(1);
                } else if (salt <= food.getHigher_salt()) {
                    point.setSaltLevel(2);
                } else {
                    point.setSaltLevel(3);
                }
            }
        }

        pointService.save(point);
        return Result.success(point);
    }
    /**
     * 获取当前烹饪的最新状态 (给前端轮询用)
     * 前端每秒调用一次，根据返回的 tempDone 做粒子特效
     */
    @GetMapping("/status")
    public Result<CookHistoryPoint> getLatestStatus(@RequestParam Long historyId) {
        // 查询该历史记录下，时间最晚（最新）的一个点
        CookHistoryPoint latest = pointService.lambdaQuery()
                .eq(CookHistoryPoint::getHistoryId, historyId)
                .orderByDesc(CookHistoryPoint::getCollectTime)
                .last("limit 1")
                .one();
        return Result.success(latest);
    }

}