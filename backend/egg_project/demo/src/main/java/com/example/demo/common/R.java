package com.example.demo.common;

import lombok.Data;

@Data
public class R<T> {
    private Integer code;
    private String msg;
    T data;

    public static <T> R<T> ok() {
        R<T> r = new R<>();
        r.setCode(200);
        r.setMsg("成功");
        return r;
    }

    public static <T> R<T> ok(T data) {
        R<T> r = new R<>();
        r.setCode(200);
        r.setMsg("成功");
        r.setData(data);
        return r;
    }

    public static <T> R<T> fail(String msg) {
        R<T> r = new R<>();
        r.setCode(500);
        r.setMsg(msg);
        return r;
    }

    // 链式调用，支持 R.ok().setMsg(...)
    public R<T> setMsg(String msg){
        this.msg = msg;
        return this;
    }
}