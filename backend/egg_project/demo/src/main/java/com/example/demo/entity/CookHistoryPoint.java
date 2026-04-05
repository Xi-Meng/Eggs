package com.example.demo.entity;

import lombok.Data;
import java.time.LocalDateTime;
@Data
public class CookHistoryPoint {
    private Long id;
    private Long historyId;
    private Double temp;
    private Double salt;
    private Double oilFume;
    private LocalDateTime collectTime;

    // 💡 改成这样，不要带 is
    private Boolean tempDone;
    private Boolean smokeHigh;
    private Integer saltLevel;
}