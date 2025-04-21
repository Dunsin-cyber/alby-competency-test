"use client";
import { useClient } from "@/context/index";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { ConfigProvider, theme as antdTheme } from "antd";
import React from "react";

function AntdProvider({ children }: { children: React.ReactNode }) {
  const { darkAlgorithm, defaultAlgorithm } = antdTheme;
  const { isDarkMode } = useClient();

  return (
    <AntdRegistry>
      <ConfigProvider
        theme={{
          algorithm: isDarkMode ? darkAlgorithm : defaultAlgorithm,
        }}
      >
        {children}
      </ConfigProvider>
    </AntdRegistry>
  );
}

export default AntdProvider;
