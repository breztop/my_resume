# Game Developer Portfolio

一个以项目案例为核心的 Vue 作品集。视觉采用“编辑式排版 + 项目概念图”，概念图用于建立项目气氛，项目文字负责说明真实的工程工作。

## 页面与代码架构

```text
src/data/projects.js
        │ 单一项目数据源
        ├──────────────► HomeView ──► ProjectCard（精选项目）
        ├──────────────► ProjectsView（全部项目网格）
        └──────────────► ProjectDetailView（独立详情页）
                                      ▲
                                      │ /projects/:id
                               Vue Router
```

- `src/App.vue`：全局导航、页脚和路由出口。
- `src/router.js`：定义主页、项目库和项目详情路由，并负责页面滚动位置。
- `src/data/projects.js`：项目内容的唯一数据源；新增项目主要修改这里。
- `src/views/HomeView.vue`：主页与精选项目。
- `src/views/ProjectsView.vue`：响应式 1—3 列项目库。
- `src/views/ProjectDetailView.vue`：可独立访问和分享的项目案例页。
- `src/components/ProjectCard.vue`：主页精选项目的封面、摘要和详情入口。
- `server/index.js`：静态资源服务和 SPA 路由回退，保证详情页刷新不出现 404。
- `src/style.css`：全局视觉令牌、页面布局、组件样式与响应式规则。
- `public/images/projects/`：页面实际加载的 WebP 文件。
- `artwork/source/`：保留高质量 PNG 源文件，不参与站点构建。

## 新增项目

1. 将 3:2 图片放入 `public/images/projects/`，优先使用 WebP。
2. 在 `src/data/projects.js` 增加一个项目对象，并提供准确的 `coverAlt`。
3. 用 `category` 将项目归入 `client`、`server` 或 `tooling`；需要在主页展示时设置 `featured: true`。
4. 同一系统的多个实现使用相同的 `system`，并在 `relatedProjectIds` 中互相填写项目 id，即可生成关联入口。
5. 项目可选提供 `modules`、`roadmap` 和 `principles`，详情页会自动生成信息架构、阶段规划与设计约束。
6. 不需要新增页面或修改路由，项目库与详情页会自动生成。

## 图片说明

当前三张图片是生成的基础概念视觉，不是实际游戏截图，因此界面中明确标记为 `CONCEPT VISUAL`。上线作品集时，建议在每个详情中继续补充真实截图、录屏和可验证的项目结果。

完整生成提示词见 [`docs/image-prompts.md`](docs/image-prompts.md)。
