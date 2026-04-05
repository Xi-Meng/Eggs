package com.example.demo.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.example.demo.entity.TemperatureLog;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface TemperatureLogMapper extends BaseMapper<TemperatureLog> {
}