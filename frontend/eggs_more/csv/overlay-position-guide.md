# 温度/咸度/油烟框位置速查

常用文件：

- 温度框：`src/config/temperatureOverlayLayout.ts`
- 咸度框：`src/config/saltLevelOverlayLayout.ts`
- 油烟框：`src/config/oilFumeOverlayLayout.ts`
- 顶部图片：`src/components/branding/TopBrandImageOverlay.vue`
- 全局接口/HistoryId：`csv/runtime-global-config.csv`

常改字段：

- 温度框：`temperatureTop`、`temperatureLeft`、`temperatureWidth`、`temperatureHeight`、`temperatureFontSize`
- 咸度框：`top`、`left`、`width`、`height`、`fontSize`
- 油烟框：`top`、`left`、`width`、`height`、`fontSize`
- 顶部图片：`top`、`left`、`width`
- 外观：`backgroundColor`、`textColor`、`borderRadius`

## 温度框

配置文件：`src/config/temperatureOverlayLayout.ts`

### 熟了吗总页面 `p3Y`

- 设备1实时温度 `device1-live`
  - `top: 200`
  - `left: 145`
  - `width: 80`
  - `height: 24`
- 设备2固定温度 `device2-static`
  - `top: 326`
  - `left: 145`
  - `width: 80`
  - `height: 24`
- 设备3固定温度 `device3-static`
  - `top: 456`
  - `left: 145`
  - `width: 80`
  - `height: 24`

### 熟了吗1开始 `gAr`

- 设备1实时温度 `device1-live`
  - `top: 250`
  - `left: 114`
  - `width: 150`
  - `height: 58`

### 熟了吗1结束 `4-t`

- 设备1实时温度 `device1-live`
  - `top: 260`
  - `left: 108`
  - `width: 150`
  - `height: 58`

## 咸度框

配置文件：`src/config/saltLevelOverlayLayout.ts`

### 咸了吗总页面 `tAa`

- 设备1咸度 `device1-salt`
  - `top: 195`
  - `left: 143`
  - `width: 74`
  - `height: 28`
- 设备2咸度 `device2-salt`
  - `top: 324`
  - `left: 145`
  - `width: 74`
  - `height: 28`
- 设备3咸度 `device3-salt`
  - `top: 445`
  - `left: 145`
  - `width: 76`
  - `height: 28`

### 咸了吗总页面 `ytA95`

- 设备1咸度 `device1-salt`
  - `top: 300`
  - `left: 143`
  - `width: 74`
  - `height: 28`
- 设备2咸度 `device2-salt`
  - `top: 322`
  - `left: 145`
  - `width: 74`
  - `height: 28`
- 设备3咸度 `device3-salt`
  - `top: 444`
  - `left: 145`
  - `width: 76`
  - `height: 28`

### 咸了吗1开始 `AnX`

- 设备1咸度 `device1-salt`
  - `top: 253`
  - `left: 95`
  - `width: 174`
  - `height: 73`

### 咸了吗1结束 `wXj`

- 设备1咸度 `device1-salt`
  - `top: 253`
  - `left: 95`
  - `width: 174`
  - `height: 73`

## 油烟框

配置文件：`src/config/oilFumeOverlayLayout.ts`

微调油烟位置时，只改这个文件。

### 主页 `oJi`

- 油烟卡片
  - `key: home-oil-fume-card`
  - `top: 183`
  - `left: 215`
  - `width: 123`
  - `height: 123`

### 厨房空气质量检测 `a7b`

- 主页同款油烟卡片
  - `key: home-oil-fume-card`
  - `top: 183`
  - `left: 215`
  - `width: 123`
  - `height: 123`
- 油烟数值
  - `key: air-quality-oil-fume`
  - `top: 566`
  - `left: 157`
  - `width: 132`
  - `height: 26`

### 厨房空气质量检测开 `KKk`

- 油烟数值
  - `key: air-quality-open-oil-fume`
  - `top: 566`
  - `left: 157`
  - `width: 132`
  - `height: 26`

### 厨房空气质量检测差 `W4y`

- 油烟数值
  - `key: air-quality-bad-oil-fume`
  - `top: 566`
  - `left: 157`
  - `width: 132`
  - `height: 26`

### 厨房空气质量检测差开 `MYI`

- 油烟数值
  - `key: air-quality-bad-open-oil-fume`
  - `top: 564`
  - `left: 159`
  - `width: 132`
  - `height: 26`

### 厨房空气质量检测差开1 `Ynv`

- 油烟数值
  - `key: air-quality-bad-open-1-oil-fume`
  - `top: 566`
  - `left: 157`
  - `width: 132`
  - `height: 26`

## 顶部图片

配置文件：`src/config/topBrandImageLayout.ts`

这张图用在：

- `otl`
- `Mln`
- `bQv`

### 开始页 `otl`

- `top: 200`
- `left: 0`
- `width: 375`

### 注册页 `Mln`

- `top: 200`
- `left: 0`
- `width: 375`

### 登录页 `bQv`

- `top: 200`
- `left: 0`
- `width: 375`

## 备注

- 只想挪位置：改 `top` / `left`
- 只想改框大小：改 `width` / `height`
- 想改字大小：改 `temperatureFontSize` 或 `fontSize`
