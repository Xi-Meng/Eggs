package com.example.demo.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

@Data
@TableName("food_category")
public class FoodCategory {

    @TableId(type = IdType.AUTO)
    private Long id;

    // 你数据库是 name !!!
    private String name;

    // 你数据库是 parent_id !!!
    private Integer parentId;

    // 你数据库是 sort !!!
    private Integer sort;
}