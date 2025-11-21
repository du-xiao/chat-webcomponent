````markdown
# chat-webcomponent

一个轻量、框架无关 (framework-agnostic) 的聊天 Web Component，用于在网页中嵌入聊天界面（支持与机器人、后端服务集成）。

---

## 特性

- **Web Component**：基于 Custom Elements + Shadow DOM，易于嵌入任何 Web 页面（不依赖特定框架）  
- **高度可定制**：可以自定义样式 (CSS 变量)、消息格式、事件回调等  
- **轻量级**：核心功能只负责 UI 渲染与事件传递，不强制带后端逻辑  
- **事件驱动**：提供事件 (比如 `onMessageSend`、`onReceive`) 供宿主页面接入业务逻辑  
- **离线 & 持久化** (可选)：可以支持消息缓存 / 本地持久历史  

---

## 安装 & 引入

### 通过 npm / yarn

```bash
npm install chat-webcomponent
# 或
yarn add chat-webcomponent
````

然后在你的 HTML / JS 中引入：

```js
import 'chat-webcomponent';
```

### 通过 `<script>` 标签

你也可以通过 CDN 或构建好的 bundle：

```html
<script src="https://unpkg.com/chat-webcomponent/dist/chat-webcomponent.js"></script>
```

---

## 使用示例

在 HTML 中：

```html
<chat-widget
  user-name="Alice"
  bot-name="ChatBot"
  placeholder="请输入消息…">
</chat-widget>
```

在 JavaScript 中处理消息：

```js
const chat = document.querySelector('chat-widget');

// 监听用户发送消息
chat.addEventListener('messageSend', (event) => {
  const userMsg = event.detail.text;
  console.log('用户说：', userMsg);

  // 模拟机器人回应
  setTimeout(() => {
    const botResponse = `机器人：你说的是 "${userMsg}" 吗？`;
    chat.addMessage({
      sender: 'bot',
      text: botResponse,
    });
  }, 500);
});
```

---

## 属性与配置选项

以下是该组件可能支持的一些属性（根据实现可调整）：

| 属性            | 类型       | 说明                                        |
| ------------- | -------- | ----------------------------------------- |
| `user-name`   | `string` | 当前用户名称 (用于显示)                             |
| `bot-name`    | `string` | 机器人 / 对话方名称                               |
| `placeholder` | `string` | 输入框 placeholder 文本                        |
| `theme`       | `string` | 主题 (比如 `light` / `dark`)                  |
| `history`     | `Array`  | 初始化历史消息 (数组，每项包含 sender、text、timestamp 等) |

---

## 方法 API

组件可能暴露以下方法来与外部交互：

* `addMessage(message)`
  添加一条消息到聊天窗口。`message` 是对象，例如 `{ sender: 'bot', text: '你好' }`。

* `clearHistory()`
  清空聊天记录。

* `scrollToBottom()`
  滚动聊天窗口到底部 (对大多数 UI 很有用)。

---

## 事件 (Events)

组件触发一些事件，宿主页面可以监听：

* `messageSend`

  * 触发时机：用户点击发送按钮 / 回车时
  * `event.detail` 内容： `{ text: string }`
* `messageReceive`

  * 触发时机：调用 `addMessage` 添加消息时 (可选用于通知)
  * `event.detail` 内容： `{ sender: string, text: string }`

---

## 样式 & 自定义

你可以通过 CSS 变量或 CSS 自定义样式来自定义 Web Component 的样式。以下是一些可能的变量：

```css
chat-widget {
  --chat-bg-color: #fff;
  --chat-text-color: #000;
  --chat-font-size: 14px;
  --chat-input-bg: #f0f0f0;
  --chat-input-text-color: #333;
}
```

---

---

## 开发 & 本地调试

1. `git clone https://github.com/du-xiao/chat-webcomponent.git`
2. `cd chat-webcomponent && npm install`
3. 启动开发环境 (根据项目脚本)：

   ```bash
   npm run dev
   ```
4. 修改组件源码 (HTML / CSS / JS)，在示例页面中查看效果
5. 编写单元测试 (建议)：测试事件触发、消息发送 / 接收、样式变量覆盖等

---



## 贡献 &许可证

* **贡献方式**：欢迎 Issue 报 bug / 提 Feature；也欢迎提交 PR 扩展功能或优化样式。
* **许可证**：MIT 

---

## 常见问题 (FAQ)

**Q1：这个组件支持 mobile / 响应式吗？**
A：是的，通过 CSS 自定义样式 + media query，可以适配移动端布局。

**Q2：如何在多个聊天实例中使用？**
A：可以在页面中插入多个 `<chat-widget>`，每个实例独立维护状态。

**Q3：能否将对话内容导出 / 保存？**
A：可以扩展组件，提供方法导出当前 `history`，然后宿主页面负责存储 (如后端、LocalStorage)。

---

## 示例 (Demo)

在 `demo/index.html` 中加入以下内容，测试最基础聊天功能：

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>Chat WebComponent 示例</title>
  <script src="../dist/chat-webcomponent.js"></script>
</head>
<body>
  <chat-widget user-name="User" bot-name="Bot"></chat-widget>

  <script>
    const chat = document.querySelector('chat-widget');
    chat.addEventListener('messageSend', (e) => {
      const text = e.detail.text;
      chat.addMessage({ sender: 'user', text });
      setTimeout(() => {
        chat.addMessage({ sender: 'bot', text: '收到：' + text });
      }, 500);
    });
  </script>
</body>
</html>
```

---

## 联系 &支持

* 作者 / 维护者：Du Xiao
* GitHub 仓库地址：`https://github.com/du-xiao/chat-webcomponent.git`
* 欢迎提交问题 (Issues) / 合并请求 (Pull Requests)

---

感谢你使用 / 贡献这个聊天 Web Component 🎉
::contentReference[oaicite:0]{index=0}
```
