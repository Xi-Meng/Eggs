package com.example.demo.entity;

import lombok.Data;
import java.time.LocalDateTime;

@Data
public class UserSetting {
    private Long id;
    private Long userId;
    private String deviceSn;
    private String deviceName;
    private String deviceStatus;
    private Boolean voiceAll; // 你改成了总开关
    private LocalDateTime createdAt;
}