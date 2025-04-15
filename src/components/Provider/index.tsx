"use client";
import React from 'react'
import { Provider as ReduxProvider } from "react-redux";
import store from "@/redux/store";
// import { UserContextProvider } from "@/Context"
// import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ProgressProvider } from '@bprogress/next/app';
import { AntdRegistry } from '@ant-design/nextjs-registry';
import { ConfigProvider, Button, theme as antdTheme } from "antd";
import {useClient} from "@/context/index";


// const queryClient = new QueryClient({
//   defaultOptions: {
//     queries: {
//       staleTime: 5 * 60 * 1000,
//       retry: 0,
//     },
//   },
// });


function Providers({ children }: React.PropsWithChildren<{}>) {
const { darkAlgorithm, defaultAlgorithm } = antdTheme;
  const {isDarkMode} = useClient();

  return (
     <ConfigProvider
      theme={{
        algorithm: isDarkMode ? darkAlgorithm : defaultAlgorithm,
      }}
    >

    <ReduxProvider store={store}>
       {/* <QueryClientProvider client={queryClient}>
         <UserContextProvider> */}
         <AntdRegistry>
          <ProgressProvider
            options={{
              showSpinner: false,
            }}
            color="#1E88E5"
            height="4px"
            shallowRouting
          >

            {children}
          </ProgressProvider>
          </AntdRegistry>
         {/* </UserContextProvider>
       </QueryClientProvider> */}
 </ReduxProvider>
       </ConfigProvider>
  )
}

export default Providers