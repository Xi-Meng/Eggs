package com.example.demo.entity;

import lombok.Data;
import java.time.LocalDateTime;

@Data
public class UserFavorite {
    private Long id;
    private Long userId;
    private Long foodId;
    private LocalDateTime createdAt;
}