# 二维码生成器（QRMaker）

免费在线二维码生成工具。纯前端实现，全部计算在浏览器本地完成，不上传任何数据。

## 功能

- 输入链接或文本，实时生成二维码（支持中文，已处理 UTF-8 编码）
- 三种点样式：方块 / 圆角 / 圆点
- 四级容错：L(7%) / M(15%) / Q(25%) / H(30%)
- 自定义前景色、背景色
- 导出尺寸 256–2048 可调
- 支持中心嵌入 Logo（自动切换最高容错 H）
- 下载 PNG / SVG

## 文件结构

```
qrcode-tool/
├── index.html              # 页面结构
├── style.css               # 样式
├── app.js                  # 交互逻辑
└── lib/
    └── qr-code-styling.js  # 二维码生成库（本地化，不依赖外部 CDN）
```

## 本地使用

直接双击 `index.html` 即可使用。或启动本地服务：

```bash
python -m http.server 8899
# 打开 http://127.0.0.1:8899
```

## 部署到 Cloudflare Pages（免费）

### 第 1 步：推送到 GitHub

1. 打开 https://github.com/new ，仓库名填 `qrcode-tool`，选 Public，**不要**勾选 README / .gitignore（本地已有）。
2. 建好后在本地项目目录执行（把用户名换成自己的 GitHub 用户名）：

```bash
git remote add origin https://github.com/<你的用户名>/qrcode-tool.git
git branch -M main
git push -u origin main
```

### 第 2 步：连接 Cloudflare Pages

1. 打开 https://dash.cloudflare.com 注册/登录（可用 GitHub 账号直接登录）。
2. 左侧菜单 **Workers & Pages** → **Create** → **Pages** 标签 → **Connect to Git**。
3. 授权 GitHub，选择 `qrcode-tool` 仓库 → **Begin setup**。
4. 构建配置：**Framework preset 选 None**，Build command 留空，Build output directory 填 `/`。
5. 点 **Save and Deploy**，等约 1 分钟，得到免费地址：`https://qrcode-tool.pages.dev`

### 以后更新

```bash
git add .
git commit -m "改了什么"
git push
```

push 后 Cloudflare 会自动重新部署，约 1 分钟生效。

## 技术说明

- 二维码库：[qr-code-styling](https://github.com/kozakdenys/qr-code-styling) v1.6.0-rc.1
- 中文编码：底层 qrcode 库默认逐字节处理会截断中文，`app.js` 中已用
  `unescape(encodeURIComponent(s))` 预转 UTF-8 字节流，扫码解码无损。
- 零依赖构建：无 npm、无打包器，改完直接 push 即上线。
