package com.example.demo.entity;

import lombok.Data;
import java.time.LocalDateTime;

@Data
public class Food {
    private Long id;
    private String name;
    private Integer categoryId;
    private String source; // OFFICIAL / USER
    private Long userId;

    private Double bestTemp;
    private Double lowerSalt;
    private Double higherSalt;
    private Integer bestTime;
    private String bestHeat;


    private String imageUrl;
    private String description;
    private String ingredients; // 食材

    private LocalDateTime createdAt;

    public Double getLower_salt() {
        return lowerSalt;
    }

    public Double getHigher_salt() {
        return higherSalt;
    }
}