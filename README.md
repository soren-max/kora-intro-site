# KORA Intro Site

KORA 中文介绍页 Demo，面向中国用户、HR、候选人和产品团队，帮助他们快速理解 KORA 是什么、怎么用，以及它为什么不是普通 ChatGPT，而是更适合外国人来中国时使用的 Telegram AI 城市生活向导。

This is a half-day product demo focused on product understanding, UI clarity, and mobile-first experience.

## KORA 产品理解

KORA 是一个面向来华外国旅客的 Telegram AI 城市生活向导。它通过对话提供本地推荐、真实地址、Amap 导航链接、支付/出行/中文沟通步骤和避坑建议。

KORA 像一个懂中国本地生活的 AI 朋友，但不是订票平台、支付平台或下单平台。它提供建议、步骤、链接、路线和沟通辅助，实际支付、订票、订桌和下单由用户自己完成。

边界说明：

- 上海是主场，本地知识更深。
- 中国其他城市也能通过 Amap live data 查询地址、路线和基础生活建议。
- 支持多语言对话，如 English、中文、French、Russian 等。
- 不接管用户的钱、订单或交易动作。

## 页面功能亮点

- 可切换 Telegram Mockup：用本地 mock 数据演示静安寺吃喝、陆家嘴夜景、支付宝支付、世纪大道避坑、杭州西湖英文推荐。
- 场景模拟器：选择城市、需求和预算，展示一张 KORA 风格回复卡片，并标注“示例演示，非实时生成”。
- KORA vs ChatGPT / Claude 对比：强调普通大模型更通用，KORA 更垂直、更贴近中国本地生活执行。
- KORA 做什么 / 不做什么：明确推荐、导航、步骤、避坑能力，以及不替用户付款、订桌、订酒店/机票或下单。
- 真实体验转译：把真实体验提炼成 5 个产品亮点，不直接使用真实截图。
- Telegram Bot 复制和跳转：支持复制 `@Kora_china_bot`，并打开 Telegram 链接。

## 技术栈

- Vite
- React
- TypeScript
- 普通 CSS
- 无后端
- 无真实 API
- 无环境变量

## 本地运行

```bash
npm install
npm run dev
```

默认开发地址：

```text
http://localhost:5173
```

## 打包方式

```bash
npm run build
```

构建产物输出到：

```text
dist
```

本地预览构建产物：

```bash
npm run preview
```

交付前检查：

```bash
npm run check
```

## 部署方式

### Vercel

1. 将项目推送到 GitHub。
2. 在 Vercel 新建项目并选择该仓库。
3. Framework Preset 选择 `Vite`。
4. Build Command 使用：

```bash
npm run build
```

5. Output Directory 使用：

```text
dist
```

6. 点击 Deploy。

### Netlify

1. 将项目推送到 GitHub。
2. 在 Netlify 新建站点并选择该仓库。
3. Build command 使用：

```bash
npm run build
```

4. Publish directory 使用：

```text
dist
```

5. 点击 Deploy。

### GitHub Pages

1. 执行构建：

```bash
npm run build
```

2. 将 `dist` 目录部署到 GitHub Pages。
3. 如果部署在子路径下，需要在 `vite.config.ts` 中设置 `base` 为对应仓库路径，例如：

```ts
export default defineConfig({
  base: '/your-repo-name/',
  plugins: [react()],
});
```

## Lighthouse 自查

先构建并启动预览服务：

```bash
npm run build
npm run preview
```

保持预览服务运行，在另一个终端执行：

```bash
npm run lighthouse
```

会生成：

```text
lighthouse-report.html
```

该文件是本地质量报告，已加入 `.gitignore`。

## 设计取舍

- 不接真实 API：页面只做产品介绍和交互演示，避免误导为实时查询。
- 不直接使用真实截图：避免暴露用户姓名、时间、电量、VPN、网络信息和原始聊天记录。
- 不夸大产品能力：明确 KORA 不自动支付、不订桌、不订酒店/机票、不替用户下单。
- 移动端优先：Hero、聊天 Mockup、场景模拟器和 CTA 都按手机浏览优先设计。
- 轻交互：只使用 React state 实现场景切换、下拉选择和复制 toast，不引入复杂动画库或 UI 库。

## Telegram Bot 体验入口

- Bot handle：`@Kora_china_bot`
- Telegram 链接：[https://t.me/Kora_china_bot](https://t.me/Kora_china_bot)

## 主要文件结构

```text
.
├── index.html
├── package.json
├── README.md
├── src
│   ├── main.tsx
│   └── styles.css
├── tsconfig.json
└── vite.config.ts
```
