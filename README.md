# Eggs 项目代码说明

## 1. 项目概览

`Eggs` 是一个“厨房量化系统”项目，目标是把做饭过程中的主观判断变成可采集、可展示、可复现的数据反馈。

项目当前分成三部分：

- `frontend/eggs_more`：前端演示与交互层，基于 `Vue 3 + TypeScript + Vite`
- `backend/egg_project/demo`：后端接口服务，基于 `Spring Boot + MyBatis-Plus + PostgreSQL`
- `hardware/try1`：硬件网关脚本，负责从 ESP32 蓝牙设备读取数据并上传到后端

项目整体链路如下：

1. 前端选择食物并开始烹饪
2. 后端创建一条烹饪记录并返回 `historyId`
3. 硬件脚本从温度 / 烟雾设备读取数据，持续上传到 `/detect/add-point`
4. 后端根据食物标准值判断“熟度 / 咸度 / 油烟状态”
5. 前端轮询 `/detect/status` 获取最新状态并叠加显示在页面上

---

## 2. 仓库目录结构

下面是当前仓库里最重要的代码目录：

```text
Eggs/
├── README.md
├── PROJECT_CODE_GUIDE.md
├── frontend/
│   └── eggs_more/
│       ├── package.json
│       ├── vite.config.ts
│       ├── public/
│       │   ├── jsdesign/
│       │   └── vendor/
│       ├── csv/
│       ├── docs/
│       ├── scripts/
│       └── src/
│           ├── main.ts
│           ├── App.vue
│           ├── router/
│           ├── pages/
│           ├── components/
│           ├── composables/
│           ├── services/
│           ├── config/
│           ├── data/
│           ├── lib/
│           └── assets/
├── backend/
│   ├── README.md
│   └── egg_project/
│       ├── lab5.1/
│       └── demo/
│           ├── build.gradle
│           ├── src/main/java/com/example/demo/
│           │   ├── DemoApplication.java
│           │   ├── config/
│           │   ├── controller/
│           │   ├── dto/
│           │   ├── entity/
│           │   ├── mapper/
│           │   ├── service/
│           │   ├── common/
│           │   └── util/
│           └── src/main/resources/
│               └── application.properties
└── hardware/
    ├── README.md
    └── try1
```

---

## 3. 前端目录说明

前端目录：`frontend/eggs_more`

### 3.1 前端的职责

前端不是传统从零绘制的页面，而是：

- 用 `js.design` 导出的页面作为底层视觉页面
- 用 Vue 组件在页面上叠加交互层和实时数据层
- 用路由组织多个设计页面
- 用 composables 管理实时轮询与烹饪会话状态

也就是说，前端是“设计稿运行时 + 业务交互补层”的模式。

### 3.2 前端关键目录

#### `src/main.ts`

前端应用入口：

- 创建 Vue 应用
- 注入路由
- 加载全局样式

#### `src/App.vue`

应用根组件：

- 只负责渲染 `<RouterView />`
- 业务内容基本都在各个页面组件里

#### `src/router/`

路由配置层：

- 定义首页导航页
- 根据 `designPages.ts` 自动生成设计页面路由
- 在路由切换后同步浏览器标题

#### `src/data/`

数据定义与页面元信息：

- `designPages.ts`：维护所有设计页面的 `id / title / routePath / customComponent`
- `cookPresetCatalog.ts`：维护食材预设，并支持从后端动态拉取菜品列表

#### `src/pages/`

页面层：

- `IndexPage.vue`：页面导航入口
- `design/`：每个设计页面对应一个单文件组件或动态生成页面

#### `src/components/`

可复用 UI 与叠加组件：

- `DesignFrame.vue`：负责承载 `js-frame`
- `DesignPageShell.vue`：提供页面外壳、标题、返回入口
- `temperature/`、`salt/`、`oil/`、`cook/`、`auth/` 等目录中放的是业务叠加层组件

#### `src/composables/`

状态与副作用管理：

- 实时轮询检测数据
- 本地缓存当前烹饪会话
- 计算当前激活的 `historyId`

#### `src/services/`

接口请求层：

- 统一封装 `GET / POST`
- 对接后端的用户、烹饪、检测相关接口

#### `src/config/`

位置、运行时和叠加布局配置：

- 各类 overlay 的坐标、字号、尺寸
- API 地址、轮询间隔、默认历史记录 ID

#### `public/jsdesign/`

`js.design` 导出的页面 bundle，前端通过 `js-frame` 直接加载。

#### `scripts/sync-js-design.mjs`

设计同步脚本。`npm run dev` 和 `npm run build` 之前都会先执行它。

---

## 4. 前端关键代码文件说明

这里列接手时最值得优先阅读的文件。

### `frontend/eggs_more/src/router/index.ts`

作用：

- 根据 `designPages` 自动生成设计页面路由
- 如果某个页面存在 `customComponent`，则优先加载定制 Vue 页面
- 否则回退到 `createDesignPage()` 动态生成页面壳

为什么重要：

- 它是整个前端页面组织方式的入口
- 想新增页面、接入新的设计页，通常从这里理解最省时间

### `frontend/eggs_more/src/data/designPages.ts`

作用：

- 定义所有页面元数据
- 维护标题到页面的映射
- 处理页面间“点击后跳到哪个页面”的覆盖规则

为什么重要：

- 这是设计页面导航关系的“总表”
- `resolveDesignPageFromSwitch()` 决定了 `js.design` 发出的切页事件最终跳到哪个路由

### `frontend/eggs_more/src/components/DesignFrame.vue`

作用：

- 加载 `js-frame` 运行时
- 把页面 ID 拼成 `js.design` bundle 地址
- 监听 `__global__SWITCH_FRAME` 事件
- 在设计稿渲染完成前显示加载态

为什么重要：

- 这是“设计稿运行时”和 Vue 的桥接层
- 没有它，页面只是一堆路由，无法真正显示设计内容

### `frontend/eggs_more/src/components/DesignPageShell.vue`

作用：

- 给每个设计页加上统一头部
- 承接 `DesignFrame`
- 在 `js.design` 触发切页事件后调用 Vue Router 跳转

为什么重要：

- 它把静态设计页面变成了可导航的前端应用

### `frontend/eggs_more/src/data/cookPresetCatalog.ts`

作用：

- 提供菜品预设数据结构
- 默认内置了兜底食材数据
- 从后端 `/api/food/list` 获取真实菜品列表
- 把后端返回的食物数据映射成前端可展示的预设项

为什么重要：

- 这是“食材选择”相关页面的数据源
- 前端对菜品名称、标准温度、盐度区间、烹饪时长的展示都来自这里

### `frontend/eggs_more/src/components/cook/CookPresetOverlay.vue`

作用：

- 在设计页面上叠加“选择食物 / 开始烹饪 / 结束烹饪”的交互层
- 打开预设菜单并选择菜品
- 调用后端 `/api/cook/start`
- 保存当前烹饪会话并跳转到下一页
- 结束时记录烹饪时长并跳转到结算页

为什么重要：

- 这是“开始一轮烹饪流程”的核心前端组件

### `frontend/eggs_more/src/composables/useCookPresetSession.ts`

作用：

- 用 `localStorage` 存储当前烹饪会话
- 保存当前食材、`historyId`、开始时间、结束时间、评分和感受
- 在页面切换之间共享状态

为什么重要：

- 这是烹饪流程的前端状态中心
- 多个页面依赖它判断“当前正在烹饪哪一道菜”

### `frontend/eggs_more/src/composables/useSaltPresetSession.ts`

作用与 `useCookPresetSession.ts` 类似，但服务于盐度检测相关页面。

### `frontend/eggs_more/src/composables/useRealtimeDetectFeed.ts`

作用：

- 周期性轮询 `/detect/status`
- 维护最新监测点
- 处理加载态和错误态
- 支持动态切换 `historyId`

为什么重要：

- 这是所有实时数据展示的底层能力

### `frontend/eggs_more/src/composables/useRealtimeTemperature.ts`

作用：

- 在 `useRealtimeDetectFeed()` 基础上进一步封装温度显示
- 输出 `formattedTemperature`

为什么重要：

- 它体现了“通用检测流 + 各类业务视图封装”的写法

### `frontend/eggs_more/src/components/temperature/RealtimeTemperatureOverlay.vue`

作用：

- 根据页面 ID 读取温度 overlay 的布局配置
- 从实时检测 composable 里拿最新温度
- 在设计稿指定位置叠加实时温度值和提示文案

为什么重要：

- 这是“设计页面 + 实时检测值”结合得最清楚的示例组件

### `frontend/eggs_more/src/services/apiClient.ts`

作用：

- 统一封装 Axios 请求
- 使用 `runtimeConfig` 决定 API 基础地址
- 定义后端统一响应结构 `ApiResponse<T>`

为什么重要：

- 前端所有接口调用的公共入口都从这里走

### `frontend/eggs_more/src/config/runtimeConfig.ts`

作用：

- 读取 `csv/runtime-global-config.csv`
- 提供 API 地址、默认检测历史 ID、轮询间隔
- 支持通过 `window.__EGGS_*` 变量覆盖运行时配置

为什么重要：

- 部署和调试时最容易改的地方就在这里
- 目前默认 API 地址和默认 `historyId` 都是写在这里的

---

## 5. 后端目录说明

后端目录：`backend/egg_project/demo`

### 5.1 技术栈

- `Spring Boot 2.7`
- `MyBatis-Plus`
- `PostgreSQL`
- `Lombok`

### 5.2 后端分层结构

#### `controller/`

接口层，负责：

- 接收前端 / 硬件请求
- 参数绑定
- 调用 service
- 返回统一结果结构

#### `service/`

业务接口层，定义服务能力。

#### `service/impl/`

业务实现层，封装数据库查询和业务逻辑。

#### `mapper/`

MyBatis-Plus 数据访问层，对应数据库表。

#### `entity/`

实体类，描述数据库里的主要业务对象，如：

- 用户
- 食物
- 烹饪记录
- 检测点
- 油烟日志

#### `config/`

项目配置类，目前主要是跨域配置。

#### `util/` / `common/`

统一返回结构封装。

---

## 6. 后端关键代码文件说明

### `backend/egg_project/demo/src/main/java/com/example/demo/DemoApplication.java`

作用：

- Spring Boot 启动入口
- 通过 `@MapperScan` 扫描 `mapper` 包

为什么重要：

- 没有它，项目无法启动，Mapper 也不会被正确注册

### `backend/egg_project/demo/src/main/resources/application.properties`

作用：

- 配置服务端口
- 配置 PostgreSQL 数据源
- 开启下划线到驼峰的映射规则

当前默认配置：

- 端口：`8080`
- 数据库：`jdbc:postgresql://localhost:5433/postgres`
- 用户名 / 密码：`postgres / postgres`

### `backend/egg_project/demo/src/main/java/com/example/demo/config/CorsConfig.java`

作用：

- 给所有接口开放跨域访问

为什么重要：

- 前端本地运行时，如果没有这个配置，很容易被浏览器拦截

### `backend/egg_project/demo/src/main/java/com/example/demo/controller/CookController.java`

作用：

- 提供食物列表接口 `/api/cook/food-list`
- 开始烹饪 `/api/cook/start`
- 获取当前活跃烹饪记录 `/api/cook/active-history`
- 结束烹饪 `/api/cook/end`

为什么重要：

- 它是烹饪流程的后端主入口

当前需要特别注意：

- `start` 接口里把 `historyId` 写死成了 `8888888888`
- `active-history` 也固定返回 `8888888888`

这说明当前后端处于“便于联调的固定模式”，适合演示，但不适合正式多用户场景。

### `backend/egg_project/demo/src/main/java/com/example/demo/controller/DetectController.java`

作用：

- `/detect/add-point`：接收硬件上报的检测点
- `/detect/status`：返回某条烹饪记录最新的检测状态

为什么重要：

- 它是硬件数据和前端实时展示之间的核心桥梁

这里的关键逻辑包括：

- 按 `historyId` 找到烹饪记录
- 再按 `foodId` 找到食物标准值
- 根据最佳温度判断 `tempDone`
- 根据烟雾值判断 `smokeHigh`
- 根据盐度范围计算 `saltLevel`

### `backend/egg_project/demo/src/main/java/com/example/demo/controller/FoodController.java`

作用：

- 获取所有食物 `/api/food/list`
- 获取单个食物详情 `/api/food/detail/{id}`

为什么重要：

- 前端食材预设会优先从这里拉取真实数据

### `backend/egg_project/demo/src/main/java/com/example/demo/controller/UserController.java`

作用：

- 提供用户登录 `/user/login`
- 提供用户注册 `/user/register`

为什么重要：

- 登录注册页依赖这两个接口

### `backend/egg_project/demo/src/main/java/com/example/demo/service/impl/UserServiceImpl.java`

作用：

- 通过邮箱查询用户
- 校验密码
- 校验邮箱是否重复注册
- 执行用户保存

当前特点：

- 逻辑简单直接
- 密码目前是明文比对，没有做加密

### `backend/egg_project/demo/src/main/java/com/example/demo/service/impl/CookHistoryServiceImpl.java`

作用：

- 按用户查询烹饪历史，并按创建时间倒序排序

### `backend/egg_project/demo/src/main/java/com/example/demo/entity/Food.java`

作用：

- 定义食物标准参数
- 包含最佳温度、盐度上下限、烹饪时长等字段

为什么重要：

- 熟度和盐度判断都依赖这个实体中的标准值

补充说明：

- 里面额外提供了 `getLower_salt()` / `getHigher_salt()` 方法，用来兼容下划线命名风格

### `backend/egg_project/demo/src/main/java/com/example/demo/entity/CookHistoryPoint.java`

作用：

- 表示一次采样点
- 存储温度、盐度、油烟值、采样时间，以及判断结果字段

关键字段：

- `temp`
- `salt`
- `oilFume`
- `tempDone`
- `smokeHigh`
- `saltLevel`

### `backend/egg_project/demo/src/main/java/com/example/demo/util/Result.java`

作用：

- 定义后端统一返回格式

字段结构：

- `code`
- `msg`
- `data`

前端的 `apiClient.ts` 就是按这个结构解包的。

---

## 7. 硬件目录说明

硬件目录：`hardware`

当前真正的可执行代码主要是：

- `hardware/try1`

这个文件是一个 Python 异步脚本，不是 Arduino 固件源码。它的职责更像“本地网关”：

- 通过 `bleak` 连接两个 ESP32 蓝牙设备
- 监听温度和烟雾通知
- 解析数值
- 把数据上传到后端 `/detect/add-point`

### `hardware/try1` 关键逻辑

#### 蓝牙设备配置

- `TEMP_NAME = "ESP32-C3-Temp"`
- `SMOKE_NAME = "ESP32-C3-Smoke"`
- `CHARACTERISTIC_UUID` 指定了订阅的 BLE 特征值

#### 后端上传

- `BACKEND_URL = "http://localhost:8080"`
- 收到新数据后会调用 `upload_to_web()`
- 上传参数包括：
  - `historyId`
  - `temp`
  - `salt`
  - `oilFume`

#### 当前联调模式

脚本里把：

- `current_history_id = 8888888888`

写死了，因此硬件上传和后端活跃记录接口使用的是同一个固定 ID。

这和后端 `CookController` 的固定模式是一套联调方案。

---

## 8. 当前项目的运行关系

### 前端启动

在 `frontend/eggs_more` 下：

```bash
npm install
npm run dev
```

### 后端启动

在 `backend/egg_project/demo` 下：

```bash
./gradlew bootRun
```

### 硬件脚本启动

在仓库根目录或 `hardware` 目录下：

```bash
python3 hardware/try1
```

---

## 9. 接手时建议优先阅读的文件顺序

如果是第一次接这个项目，建议按这个顺序看：

1. `frontend/eggs_more/src/router/index.ts`
2. `frontend/eggs_more/src/data/designPages.ts`
3. `frontend/eggs_more/src/components/DesignFrame.vue`
4. `frontend/eggs_more/src/components/cook/CookPresetOverlay.vue`
5. `frontend/eggs_more/src/composables/useRealtimeDetectFeed.ts`
6. `backend/egg_project/demo/src/main/java/com/example/demo/controller/CookController.java`
7. `backend/egg_project/demo/src/main/java/com/example/demo/controller/DetectController.java`
8. `backend/egg_project/demo/src/main/java/com/example/demo/entity/Food.java`
9. `hardware/try1`

这样看能最快理解“页面 -> 接口 -> 数据上报 -> 实时反馈”的完整闭环。

---

## 10. 当前代码里需要特别注意的点

### 10.1 固定 `historyId` 的联调模式

前后端和硬件目前都围绕固定 ID `8888888888` 工作：

- 后端开始烹饪时固定写死
- 后端查询活跃记录时固定返回
- 硬件上传时固定发送

优点：

- 联调简单，适合演示

缺点：

- 不支持多用户、多设备并发
- 容易覆盖同一条历史记录

### 10.2 默认 API 地址和检测历史记录

前端 `runtimeConfig.ts` 里存在默认值：

- 默认 API 地址
- 默认 `DETECT_HISTORY_ID`
- 默认轮询间隔

如果本地联调异常，优先检查这里。

### 10.3 用户认证还比较初级

`UserServiceImpl.java` 当前：

- 使用明文密码
- 没有 token
- 没有权限控制

更适合演示，不适合直接上线。

---

## 11. 一句话总结

这个项目的核心不是单纯的前端 UI，也不是单纯的后端 CRUD，而是一个“设计页面驱动的厨房量化演示系统”：

- 前端负责展示与交互
- 后端负责记录与判断
- 硬件负责采集与上传

三者围绕 `CookHistory` 和 `CookHistoryPoint` 形成了一条完整的数据闭环。
