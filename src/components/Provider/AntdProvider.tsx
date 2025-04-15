"use client";
import { useClient } from "@/context/index";
import { ConfigProvider, theme as antdTheme } from "antd";
import React from "react";

function AntdProvider({ children }: React.PropsWithChildren<{}>) {
  const { darkAlgorithm, defaultAlgorithm } = antdTheme;
  const { isDarkMode } = useClient();

  return (
    <ConfigProvider
      theme={{
        algorithm: isDarkMode ? darkAlgorithm : defaultAlgorithm,
      }}
    >
      {children}
    </ConfigProvider>
  );
}

export default AntdProvider;
