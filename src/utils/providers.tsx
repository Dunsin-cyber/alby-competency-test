"use client";
import React from 'react'
import { Provider as ReduxProvider } from "react-redux";
import store from "@/redux/store";
// import { UserContextProvider } from "@/Context"
// import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
// import { PagesProgressBar as ProgressBar } from "next-nprogress-bar";


// const queryClient = new QueryClient({
//     defaultOptions: {
//         queries: {
//             staleTime: 5 * 60 * 1000,
//             retry: 0,
//         },
//     },
// });


function Providers({ children }: { children: React.ReactNode }) {
    return (
        <ReduxProvider store={store}>
            {/* <QueryClientProvider client={queryClient}> */}
                {/* <UserContextProvider> */}
                    {children}
                    {/* <ProgressBar
            height="4px"
            color="#1E88E5"
            options={{ showSpinner: false }}
            shallowRouting
          /> */}
                {/* </UserContextProvider> */}
            {/* </QueryClientProvider> */}
        </ReduxProvider>
    )
}

export default Providers