"use client";
import { UserContextProvider } from "@/context";
import dynamic from "next/dynamic";
import store from "@/redux/store";
import React from "react";
import { Provider as ReduxProvider } from "react-redux";
// import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
const WebLNProvider = dynamic(
  () => import("@/webln/provider").then((mod) => mod.WebLNProvider),
  {
    ssr: false,
  }
);

import { ProgressProvider } from "@bprogress/next/app";
import { Toaster } from "react-hot-toast";
import AntdProvider from "./AntdProvider";

// const queryClient = new QueryClient({
//   defaultOptions: {
//     queries: {
//       staleTime: 5 * 60 * 1000,
//       retry: 0,
//     },
//   },
// });

function Providers({ children }: { children: React.ReactNode }) {
  return (
    <WebLNProvider>
      <ReduxProvider store={store}>
        {/* <QueryClientProvider client={queryClient}> */}
        <UserContextProvider>
          <Toaster
            toastOptions={{
              className: "",
              style: {
                border: `1px solid #AC6AFF`,
                padding: "16px",
                color: "#AC6AFF",
                backgroundColor: "#FFC876",
                borderRadius: "8px",
                fontFamily: "Arial, sans-serif",
              },
            }}
          />

          <AntdProvider>
            <ProgressProvider
              options={{
                showSpinner: false,
              }}
              color="#fffd00"
              height="4px"
              shallowRouting
            >
              {children}
            </ProgressProvider>
          </AntdProvider>
        </UserContextProvider>
        {/*   </QueryClientProvider> */}
      </ReduxProvider>
    </WebLNProvider>
  );
}

export default Providers;
