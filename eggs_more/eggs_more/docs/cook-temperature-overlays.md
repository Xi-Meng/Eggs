# 熟了吗温度框位置说明

这个文档专门记录“熟了吗”相关页面的温度覆盖框位置，后面如果要微调，先看这里。

实际配置文件在：

- `src/config/temperatureOverlayLayout.ts`

所有坐标都基于 `375 x 812` 设计稿。

## 可调整字段

每个温度框都可以改这些字段：

- `temperatureTop`：上下移动
- `temperatureLeft`：左右移动
- `temperatureWidth`：温度框宽度
- `temperatureHeight`：温度框高度
- `temperatureFontSize`：温度字号
- `temperatureWeight`：温度字重
- `unitScale`：`°C` 的缩放
- `backgroundColor`：背景色
- `textColor`：文字颜色
- `borderRadius`：圆角
- `staticValue`：写死温度，只用于静态温度框
- `historyId`：实时温度接口 ID，只用于动态温度框

## 页面总览

### 1. 熟了吗总页面

- 页面 ID：`p3Y`
- 配置入口：`temperatureOverlayLayouts.p3Y.items`

#### 设备1实时温度

- `key`: `device1-live`
- `historyId`: `2040365833505034242`
- `temperatureTop`: `200`
- `temperatureLeft`: `145`
- `temperatureWidth`: `80`
- `temperatureHeight`: `24`
- `temperatureFontSize`: `17`

#### 设备2静态温度

- `key`: `device2-static`
- `staticValue`: `80°C`
- `temperatureTop`: `326`
- `temperatureLeft`: `145`
- `temperatureWidth`: `80`
- `temperatureHeight`: `24`

#### 设备3静态温度

- `key`: `device3-static`
- `staticValue`: `100°C`
- `temperatureTop`: `456`
- `temperatureLeft`: `145`
- `temperatureWidth`: `80`
- `temperatureHeight`: `24`

### 2. 熟了吗1开始

- 页面 ID：`gAr`
- 配置入口：`temperatureOverlayLayouts.gAr.items[0]`
- `temperatureTop`: `250`
- `temperatureLeft`: `114`
- `temperatureWidth`: `150`
- `temperatureHeight`: `58`

### 3. 熟了吗1结束

- 页面 ID：`4-t`
- 配置入口：`temperatureOverlayLayouts['4-t'].items[0]`
- `temperatureTop`: `260`
- `temperatureLeft`: `108`
- `temperatureWidth`: `150`
- `temperatureHeight`: `58`
