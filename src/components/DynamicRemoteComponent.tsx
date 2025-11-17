import { useEffect, useRef } from "react";

interface Props {
  url: string; // 远程组件脚本 URL
  tag: string; // webcomponent 标签名称，例如 user-card
  props?: Record<string, any>;
}

export default function DynamicRemoteComponent({ url, tag, props = {} }: Props) {
  const loadedScripts = (window as any).__loadedScripts || ((window as any).__loadedScripts = new Set());
  const containerRef = useRef<HTMLDivElement>(null);
  const elRef = useRef<HTMLElement | null>(null);

  // 1️⃣ 加载远程脚本
  useEffect(() => {
    if (loadedScripts.has(url)) {
      mountElement();
      return;
    }

    const script = document.createElement("script");
    script.src = url;
    script.type = "module";

    script.onload = () => {
      loadedScripts.add(url);
      mountElement();
    };

    document.body.appendChild(script);
  }, [url, tag]);

  // 2️⃣ 创建或挂载 WebComponent
  const mountElement = () => {
    if (!containerRef.current) return;

    let el = elRef.current;
    if (!el) {
      el = document.createElement(tag);
      containerRef.current.innerHTML = "";
      containerRef.current.appendChild(el);
      elRef.current = el;
    }

    // 首次挂载时设置 props
    setProps(el, props);
  };

  // 3️⃣ 监听 props 变化
  useEffect(() => {
    if (elRef.current) {
      setProps(elRef.current, props);
    }
  }, [props]); // ✅ 当 props 对象变化时触发

  const setProps = (el: HTMLElement, props: Record<string, any>) => {
    Object.entries(props).forEach(([key, value]) => {
      if (typeof value === "object") {
        (el as any)[key] = value;
      } else {
        el.setAttribute(key, String(value));
      }
    });
  };

  return <div ref={containerRef}></div>;
}