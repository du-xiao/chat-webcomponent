import React, { useEffect, useState } from "react";

interface Props {
  remote: string;        // 远程名，例如： "usercard_remote"
  module: string;        // 暴露的模块名，例如： "./UserCard"
  props?: Record<string, any>;  // 给远程组件传参
}

export default function DynamicRemoteComponent({ remote, module, props = {} }: Props) {
  const [Component, setComponent] = useState<React.ComponentType<any> | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
         //在 Vite 中加载远程组件
        const mod = await import(/* @vite-ignore */ `${remote}/${module}`);
        setComponent(() => mod.default);
      } catch (err: any) {
        console.error("❌ 远程组件加载失败:", err);
        setError(err.message || "远程组件加载失败");
      }
    };

    load();
  }, [remote, module]);

  if (error) return <div style={{ color: "red" }}>{error}</div>;
  if (!Component) return <div>⏳ 远程组件加载中...</div>;

  return <Component {...props} />;
}
