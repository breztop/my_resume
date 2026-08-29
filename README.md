# Game Developer Portfolio

一个以项目案例为核心的 Vue 作品集。视觉采用“编辑式排版 + 项目概念图”，概念图用于建立项目气氛，项目文字负责说明真实的工程工作。

## 项目一览

当前作品集包含以下项目与专题，内容以 `src/data/projects.js` 为准。

### 客户端与游戏端

- **元素人**（`p2p`）：可切换 2D / 3D 玩法的 P2P 双人协作游戏。
- **元素人：3D 协作系统**（`elemental-3d`）：从角色构建到多视角相机的立体协作解谜专题。
- **综合塔防游戏**（`tower`）：围绕建造、升级、敌人编队与资源循环构建的多系统策略塔防。
- **部落战：战役与战场系统**（`tribal-war`）：围绕能量核心争夺的战役地图与实时战场系统。
- **部落战：2D 横版版本**（`tribal-war-2d`）：围绕能量核心争夺的 2D 横版推进战斗与战役系统。
- **对话剧情小说游戏**（`branching-narrative`）：包含多分支叙事、存档读档与多结局回收的完整视觉小说流程。

### 服务端与网络层

- **通用多人游戏联机服务**（`p2p-server`）：面向多项目复用的房间、会话与 P2P 连接编排。
- **卡牌棋类游戏**（`cards`）：由权威服务器负责规则、回合与结果裁决的多人对战项目。
- **Miracast Connect Service**（`miracast-bridge`）：打通 Linux 与 Windows 的 P2P 投屏建链、WFD 会话与媒体流接入。
- **breconn**（`breconn`）：约 2 万行代码，基于 Asio 与统一 Channel 接口，覆盖 TCP、UDP、KCP、组播广播、解耦 mDNS 服务及可扩展协议层。

### 工具与基础能力

- **Device Manager**（`device-manager`）：媒体设备体检与开发前能力验证器。
- **Screenshot**（`screenshot`）：支持多屏、取色与异步 OCR 的快速截图工具。
- **Face Scan**（`face-scan`）：把目标照片转化为可追踪的本地人脸检索能力。
- **Lipreading Studio**（`lipreading-studio`）：纯视觉识别、分段流式推理与字幕 / TTS 统一时间轴。
- **conutline**（`conutline`）：从代码行数、文件明细到 AI Agent 提示的一站式代码库统计工具。

### 项目呈现

项目库只保留“全部 / 客户端与游戏端 / 服务端与网络层 / 工具与基础能力”一层筛选，不使用主观难度评分替代作品内容。`/projects/:id` 只承担路由分发；每个项目在 `src/project-pages/` 拥有独立 Vue 页面，可自行决定 DOM、信息顺序、排版、色彩和交互。页面注册集中在 `projectPageRegistry.js`，新增项目时必须同时注册对应页面组件。

## 页面与代码架构

```text
src/data/projects.js ──► HomeView / ProjectsView
                              │
/projects/:id ──► ProjectDetailView ──► projectPageRegistry
                                           │
                                           └─► 每个项目的独立 Vue 页面
```

- `src/App.vue`：全局导航、页脚和路由出口。
- `src/router.js`：定义主页、项目库和项目详情路由，并负责页面滚动位置。
- `src/data/projects.js`：项目内容的唯一数据源；新增项目主要修改这里。
- `src/views/HomeView.vue`：主页与精选项目。
- `src/views/ProjectsView.vue`：带一层分类的响应式项目库。
- `src/views/ProjectDetailView.vue`：只负责查找项目并分发独立页面组件。
- `src/project-pages/`：每个项目自己的页面结构、样式与响应式实现。
- `src/components/ProjectCard.vue`：主页精选项目的封面、摘要和详情入口。
- `server/index.js`：静态资源服务和 SPA 路由回退，保证详情页刷新不出现 404。
- `src/style.css`：全局视觉令牌、页面布局、组件样式与响应式规则。
- `public/images/projects/`：页面实际加载的 WebP 文件。
- `artwork/source/`：保留高质量 PNG 源文件，不参与站点构建。

## 新增项目

1. 将 3:2 图片放入 `public/images/projects/`，优先使用 WebP。
2. 在 `src/data/projects.js` 增加一个项目对象，并提供准确的 `coverAlt`；界面或架构图可设置 `mediaFit: "contain"`。
3. 用 `category` 将项目归入 `client`、`server` 或 `tooling`；需要在主页展示时设置 `featured: true`。
4. 同一系统的多个实现使用相同的 `system`，并在 `relatedProjectIds` 中互相填写项目 id，即可生成关联入口。
5. 项目可选提供 `modules`、`roadmap` 和 `principles`，详情页会自动生成信息架构、阶段规划与设计约束。
6. 在 `src/project-pages/` 创建该项目的独立页面，并在 `projectPageRegistry.js` 注册；不需要修改路由。

## 图片说明

当前三张图片是生成的基础概念视觉，不是实际游戏截图，因此界面中明确标记为 `CONCEPT VISUAL`。上线作品集时，建议在每个详情中继续补充真实截图、录屏和可验证的项目结果。

完整生成提示词见 [`docs/image-prompts.md`](docs/image-prompts.md)。
