# 从零到上线：手把手部署教程

> 这份教程假设你**从没用过 GitHub 和 Cloudflare**。每一步都写了「做什么 → 看到什么算对 → 卡住了怎么办」。
> 全程约 15 分钟。卡住任何一步，截图发给阿布，说清楚卡在第几步。

## 全程地图（先看这个，知道自己在哪）

```
① 注册 GitHub 账号
      ↓
② 建一个空仓库（放代码的地方）
      ↓
③ 把本地代码 push 上去（唯一要碰命令行的一步）
      ↓
④ 注册 Cloudflare 账号
      ↓
⑤ 让 Cloudflare 接管仓库，自动部署
      ↓
⑥ 访问 xxx.pages.dev，上线完成
```

---

## 第 ① 步：注册 GitHub 账号

> 如果你已经有 GitHub 账号，直接登录，跳到第 ② 步。

1. 浏览器打开 **https://github.com**
2. 点右上角 **Sign up**（注册）
3. 依次填：
   - **Email**：填你的邮箱（建议 `kongkongfengyu@gmail.com`，和你电脑 git 配置一致）
   - **Password**：设一个密码（要求：至少 15 位，或 8 位以上含数字和小写字母）
   - **Username**：建议填 `kongkongfengyu-cell`（和你电脑 git 配置一致，后面教程里的命令就能照抄）
   - 邮件订阅问你是否接收，填 `y` 或 `n` 随意
4. 完成人机验证（拼图之类的）
5. 点 **Create account**
6. 去邮箱收一封验证邮件，把里面的数字验证码填进页面

✅ **成功的标志**：看到 GitHub 首页（左侧是空的仓库列表，顶部有搜索栏）。

⚠️ **卡住**：github.com 打不开或一直转圈 → 是国内网络对 GitHub 不稳定，换手机热点试试，或隔几分钟刷新。

---

## 第 ② 步：建一个空仓库

1. 登录后，点页面**右上角的头像左边的「+」号** → 选 **New repository**
2. 只需要填/选一个东西：
   - **Repository name**：填 `qrcode-tool`（必须一模一样，后面命令要用）
   - 选 **Public**（公开。私有仓库 Cloudflare 免费版也能连，但公开更省事，而且这代码没什么可藏的）
3. **⚠️ 关键：下面三个勾全部不要勾**：
   - ❌ Add a README file
   - ❌ Add .gitignore
   - ❌ Choose a license

   > 为什么不勾：你本地已经有一份代码和提交记录了。如果 GitHub 帮你初始化了文件，两边历史对不上，push 会被直接拒绝（新手最常见的翻车点）。
4. 点绿色按钮 **Create repository**

✅ **成功的标志**：跳转到一个写着 **Quick setup** 的页面，上面有一行地址，形如：

```
https://github.com/kongkongfengyu-cell/qrcode-tool.git
```

把这个地址复制下来（第 ③ 步要用）。页面先别关。

---

## 第 ③ 步：把代码放进仓库（两种方法，选一种）

### 方法 A：网页上传（推荐，不用碰命令行）

1. 建完仓库后看到的 **Quick setup / 快速设置** 页面，中间有一句话：
   - 英文界面："…or **uploading an existing file** from your computer."
   - 中文汉化版：「通过创建新文件或**上传现有文件**来开始」——点「**上传现有文件**」
   - **最省事**：直接把网址粘到地址栏 → `https://github.com/kongkongfengyu-cell/qrcode-tool/upload/main`
   （如果你建仓库时手滑勾了 README，仓库不是空的，就看不到这句话。没关系：在仓库首页点「**添加文件 / Add file**」→「**上传文件 / Upload files**」，效果一样）
2. 打开资源管理器，进入代码文件夹：
   `D:\文档\Qoder\我的AI成长系统\01_我的信息\projects\qrcode-tool`
3. 在文件夹里 **Ctrl+A 全选**，然后把选中的所有文件**拖进网页的虚线框**里
   （.git 是隐藏文件夹，默认选不中，不用担心；DEPLOY.md、README.md 传上去也无妨）
4. 等网页下方的上传进度全部跑完（7 个文件，几秒钟）
5. 页面底部保持默认的 **Commit directly to the main branch**，点绿色按钮 **Commit changes**

✅ **成功的标志**：自动跳回仓库首页，能看到 `index.html`、`style.css`、`app.js`、`lib` 文件夹都在。

> 小字说明：网页上传后，你本地 git 的提交记录和 GitHub 上会是两套，
> **暂时完全不影响使用**。等你以后学 git 时，阿布一条命令帮你对齐。

### 方法 B：命令行 push（以后想学 git 再走这条）

> 前置要求：你在自己打开的终端里运行（阿布的运行环境弹不出登录窗口）。
> git 是程序员必修课，但不用是今天——先用方法 A 把网站上线。

#### B.1 打开终端（二选一）

**方法 A（推荐）**：
1. 打开文件资源管理器，进入文件夹
   `D:\文档\Qoder\我的AI成长系统\01_我的信息\projects\qrcode-tool`
2. 在文件夹**空白处点右键** → 选 **「在终端中打开」**（Windows 11 自带）
3. 弹出一个黑色/蓝色窗口，就是终端

**方法 B**：
1. 进入同一个文件夹
2. 点一下文件资源管理器顶部的**地址栏**（显示路径的那条）
3. 输入 `powershell` 然后按回车

✅ **成功的标志**：终端窗口里那行字以 `...\projects\qrcode-tool` 结尾，说明你在对的目录里。

#### B.2 依次执行两条命令

**第 1 条**——告诉本地仓库"云端地址在哪"（把地址换成你上一步复制的）：

```bash
git remote add origin https://github.com/kongkongfengyu-cell/qrcode-tool.git
```

> 这条执行完**没有任何输出**，没有输出就是成功。

**第 2 条**——把代码推上去：

```bash
git push -u origin main
```

#### B.3 第一次 push：会弹出登录窗口

执行 `git push` 后，会**自动弹出一个 GitHub 登录窗口**（Git Credential Manager）：

1. 点 **Sign in with your browser**（用浏览器登录）
2. 浏览器自动打开 GitHub 授权页，如果要求登录就登录
3. 点绿色的 **Authorize git-credential-manager** 按钮
4. 浏览器显示"授权成功"，回到终端，它会自己继续跑

✅ **成功的标志**：终端最后几行长这样：

```
Enumerating objects: 9, done.
...
To https://github.com/kongkongfengyu-cell/qrcode-tool.git
 * [new branch]      main -> main
branch 'main' set up to track 'origin/main'.
```

然后去第 ② 步那个 GitHub 仓库页面**刷新一下**——能看到 `index.html`、`app.js` 等 6 个文件，说明代码上去了。

⚠️ **卡住**：
- 弹窗不小心关了 / 报 `Authentication failed` → 重新执行一遍 `git push -u origin main`，这次别关弹窗
- 一直卡在密码输入 → GitHub 早就不支持密码 push 了，必须是上面那个弹窗授权流程，别在终端里输密码
- 报 `! [rejected]  main -> main (fetch first)` → 你建仓库时勾了 README。最干净的解法：去仓库页面 **Settings → 最底部 Danger Zone → Delete this repository** 删掉，回第 ② 步重来（这次别勾）

---

## 第 ④ 步：注册 Cloudflare 账号

1. 打开 **https://dash.cloudflare.com/sign-up**
2. 填邮箱（同一个邮箱即可）和密码，点 **Sign up**
3. 去邮箱点验证链接
4. 它可能会问你要不要添加网站/买服务——**全部跳过**，那些是付费功能，我们用不到

✅ **成功的标志**：进入 Cloudflare 控制台首页（左侧有一列菜单）。

---

## 第 ⑤ 步：让 Cloudflare 接管仓库（全程点鼠标）

1. 左侧菜单点 **Workers & Pages**
2. 点 **Create**（或 **Create application**）按钮
3. 顶部切到 **Pages** 标签页
4. 点 **Connect to Git**（连接 Git）
5. 弹窗让你授权 GitHub：点 **Connect GitHub** → 如果没登录会先跳 GitHub 登录 → 点绿色 **Install & Authorize**（安装并授权）
   > 如果它问你授权哪些仓库，选 **All repositories**（所有仓库）最省事
6. 授权完回到 Cloudflare，仓库列表里选 **qrcode-tool**，点 **Begin setup**（开始配置）
7. 配置页面，**只核对这四项**，其他都别动：
   - **Project name**：保持 `qrcode-tool`（这个名字决定你的网址：`qrcode-tool.pages.dev`）
   - **Production branch**：保持 `main`
   - **Framework preset**（框架预设）：选 **None**（无）
   - **Build command**（构建命令）：**留空**
   - **Build output directory**（输出目录）：填 `/`（一个斜杠）
8. 点 **Save and Deploy**（保存并部署）
9. 等 1~2 分钟，页面上的进度条跑完

✅ **成功的标志**：页面显示 **Success** ✅，上面有一个链接：**`qrcode-tool.pages.dev`**

⚠️ **卡住**：显示失败 → 99% 是 Framework preset 没选 None 或构建命令没留空，点 **Retry deployment** 前先去项目设置里改过来。

---

## 第 ⑥ 步：验收（最有仪式感的一步）

1. 浏览器打开 **https://qrcode-tool.pages.dev**（如果提示项目名被占用，你的网址可能带点后缀，以 Cloudflare 页面上显示的为准）
2. 随便输入一段文字或一个网址，右边二维码实时变化
3. **拿出手机，微信扫一下**——能扫出内容，整个链路就全通了
4. 把网址发给朋友，这是你上线的第一个网站

---

## 以后改东西怎么办

改完代码后，在文件夹终端里跑三条：

```bash
git add .
git commit -m "这里写你改了什么"
git push
```

push 完 Cloudflare 会**自动**重新部署，1 分钟后网址里就是新版。不用再碰 Cloudflare。

---

## 常见坑速查表

| 症状 | 原因 | 解法 |
|------|------|------|
| github.com 打不开/转圈 | 国内网络不稳 | 换热点、隔会儿再试 |
| push 报 Authentication failed | 授权弹窗被关了 | 重跑 push，别关弹窗 |
| push 报 rejected / fetch first | 建仓库时勾了 README（仅命令行 push 会撞上；网页上传不受影响） | 删仓库重建，别勾任何初始化文件 |
| 终端说 git 不是命令 | 终端是装 git 之前开的 | 关掉终端重开一个 |
| Cloudflare 部署失败 | 构建配置没留空 | 设置里改：Framework=None，命令留空，输出 `/` |
| pages.dev 打开是 404 | 部署还在跑，或输出目录填错 | 等 2 分钟；还不行就检查输出目录 |
| 二维码扫不出 | 前景/背景对比度太低 | 换回深色前景 + 浅色背景 |
