package com.example.demo.controller;

import com.example.demo.entity.CookHistory;
import com.example.demo.entity.Food;
import com.example.demo.service.CookHistoryService;
import com.example.demo.service.FoodService;
import com.example.demo.util.Result;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/cook")
@CrossOrigin
public class CookController {

    @Resource
    private CookHistoryService cookHistoryService;
    @Resource
    private FoodService foodService;
    /**
     * 0. 获取所有食物 (给前端搜索栏用)
     */
    @GetMapping("/food-list")
    public Result<List<Food>> getFoodList() {
        // 返回你数据库里那 1-7 号食物
        return Result.success(foodService.list());
    }
    /**
     * 1. 开启烹饪 (发令枪)
     * 前端传 userId, foodId, deviceSn
     * 返回 historyId
     */
// CookController.java

    @PostMapping("/start")
    public Result<Long> startCooking(@RequestBody CookHistory history) {
        // 【修改点】写死 ID 为 8888888888
        long fixedId = 8888888888L;
        history.setId(fixedId);

        history.setStartTime(LocalDateTime.now());
        history.setCreatedAt(LocalDateTime.now());
        history.setRealCookTime(0);

        // 使用 saveOrUpdate，确保如果 ID 已存在就更新，不存在就插入
        // 这样你反复点“开始”，数据库也不会因为主键冲突报错
        cookHistoryService.saveOrUpdate(history);

        return Result.success(fixedId);
    }

    @GetMapping("/active-history")
    public Result<Long> getActiveHistory(@RequestParam String deviceSn) {
        // 【修改点】强制返回固定 ID，让硬件永远只认准这一个
        return Result.success(8888888888L);
    }

    /**
     * 2. 结束烹饪
     * 前端在按下“停止”按钮时调用
     */
    @PostMapping("/end")
    public Result<String> endCooking(@RequestParam Long historyId) {
        CookHistory history = cookHistoryService.getById(historyId);
        if (history != null) {
            history.setEndTime(LocalDateTime.now());
            // 计算实际烹饪时长（秒）
            long seconds = java.time.Duration.between(history.getStartTime(), history.getEndTime()).getSeconds();
            history.setRealCookTime((int) seconds);

            cookHistoryService.updateById(history);
            return Result.success("烹饪已结束，记录已封存");
        }
        return Result.error("未找到相关记录");
    }
}