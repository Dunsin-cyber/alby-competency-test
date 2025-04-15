"use client";
import { UserContextProvider } from "@/context";
import store from "@/redux/store";
import React from "react";
import { Provider as ReduxProvider } from "react-redux";
// import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { ProgressProvider } from "@bprogress/next/app";
import AntdProvider from "./AntdProvider";

// const queryClient = new QueryClient({
//   defaultOptions: {
//     queries: {
//       staleTime: 5 * 60 * 1000,
//       retry: 0,
//     },
//   },
// });

function Providers({ children }: React.PropsWithChildren<{}>) {
  return (
    <ReduxProvider store={store}>
      {/* <QueryClientProvider client={queryClient}> */}
      <UserContextProvider>
        <AntdRegistry>
          <AntdProvider>
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
          </AntdProvider>
        </AntdRegistry>
      </UserContextProvider>
      {/*   </QueryClientProvider> */}
    </ReduxProvider>
  );
}

export default Providers;
