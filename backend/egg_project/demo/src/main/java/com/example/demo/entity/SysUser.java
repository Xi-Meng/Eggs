package com.example.demo.entity;

import lombok.Data;
import java.time.LocalDateTime;

@Data
public class SysUser {
    private Long id;
    private String email;
    private String password;
    private LocalDateTime createdAt;
}