"use client";

import { useProgress } from "@bprogress/next";
import { useRouter as useNextRouter } from "next/navigation";

export const useRouter = () => {
  const router = useNextRouter();
  const progress = useProgress();

  const navigate = (path: string) => {
    progress.start();

    if (path === "/back") {
      router.back();
    } else {
      router.push(path);
    }
    progress.stop();
  };

  return navigate;
};
