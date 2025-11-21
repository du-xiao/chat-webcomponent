import { useState, useRef, useEffect } from "react";
import DynamicRemoteComponent from "./DynamicRemoteComponent";

interface Message {
  type: "text" | "webcomponent";
  text?: string;
  tag?: string;
  url?: string;
  props?: Record<string, any>;
  sender: "user" | "bot";
}

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  // 模拟发送消息
  const send = () => {
    const text = inputRef.current?.value.trim();
    if (!text) return;

    // 用户消息
    const userMsg: Message = { type: "text", text, sender: "user" };
    setMessages((prev) => [...prev, userMsg]);
    if (inputRef.current) inputRef.current.value = "";

    // 模拟 bot 回复（带 webcomponent）
    setTimeout(() => {
      const botMsg: Message = {
        type: "webcomponent",
        tag: "user-card",
        url: "https://cdn.jsdelivr.net/gh/du-xiao/remote-components/components/user-card/v7/user-card.js",
        props: {
          name: "du", age: 18, listData: [
            { title: "Axxxxxx" },
            { title: "ggggggggggg" },
          ]
        },
        sender: "bot"
      };
      setMessages((prev) => [...prev, botMsg]);
    }, 600);
  };

  // 自动滚动到底部
  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  // 🔹 新增：更新 WebComponent props
  const updateBotProps = () => {
    setMessages((prev) =>
      prev.map((msg) => {
        if (msg.type === "webcomponent") {
          return {
            ...msg,
            props: {
              ...msg.props,
              name: "du updated",
              age: ((msg.props?.age || 0) as number) + 1,
              listData: [...(msg.props?.listData || []), { title: "更新条目" }],
            },
          };
        }
        return msg;
      })
    );
  };

  return (
    <div
      style={{
        width: 400,
        margin: "50px auto",
        border: "1px solid #ddd",
        borderRadius: 12,
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        height: 600,
        fontFamily: "Arial, sans-serif",
        boxShadow: "0 4px 12px rgba(0,0,0,0.08)"
      }}
    >
      {/* 聊天记录 */}
      <div
        ref={scrollRef}
        style={{ flex: 1, overflowY: "auto", padding: 16, background: "#f9f9f9" }}
      >
        {messages.map((msg, idx) => {
          const isUser = msg.sender === "user";
          return (
            <div
              key={idx}
              style={{
                display: "flex",
                justifyContent: isUser ? "flex-end" : "flex-start",
                marginBottom: 12
              }}
            >
              {msg.type === "text" ? (
                <div
                  style={{
                    maxWidth: "70%",
                    padding: "10px 14px",
                    borderRadius: 12,
                    background: isUser ? "#4f9fff" : "#fff",
                    color: isUser ? "#fff" : "#333",
                    boxShadow: "0 1px 3px rgba(0,0,0,0.1)"
                  }}
                >
                  {msg.text}
                </div>
              ) : (
                <div
                  style={{
                    maxWidth: "70%",
                    background: "#fff",
                    padding: 8,
                    borderRadius: 12,
                    boxShadow: "0 1px 3px rgba(0,0,0,0.1)"
                  }}
                >
                  {/* <DynamicRemoteComponent tag={msg.tag!} url={msg.url!} props={msg.props} /> */}
                 
                   <DynamicRemoteComponent tag={'user-card-vue'} url={'https://cdn.jsdelivr.net/gh/du-xiao/remote-components/components/user-card-vue/v11/user-card-vue.js'} props={msg.props} />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* 输入框 */}
      <div
        style={{
          display: "flex",
          padding: 12,
          borderTop: "1px solid #ddd",
          background: "#fff"
        }}
      >
        <input
          ref={inputRef}
          type="text"
          placeholder="输入你的问题..."
          style={{
            flex: 1,
            padding: 10,
            borderRadius: 8,
            border: "1px solid #ccc",
            outline: "none"
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") send();
          }}
        />
        <button
          onClick={send}
          style={{
            marginLeft: 8,
            padding: "0 16px",
            borderRadius: 8,
            border: "none",
            background: "#4f9fff",
            color: "#fff",
            cursor: "pointer"
          }}
        >
          发送
        </button>
        <button
          onClick={updateBotProps}
          style={{
            marginLeft: 8,
            padding: "0 16px",
            borderRadius: 8,
            border: "none",
            background: "#ff7f50",
            color: "#fff",
            cursor: "pointer",
          }}
        >
          更新
        </button>
      </div>
    </div>
  );
}
