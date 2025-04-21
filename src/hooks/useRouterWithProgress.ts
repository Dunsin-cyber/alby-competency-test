"use client";

import { useProgress } from "@bprogress/next";
import { useRouter as useNextRouter } from "next/navigation";

export const useRouter = () => {
  const router = useNextRouter();
  const progress = useProgress();

  const navigate = async (path: string) => {
    progress.start();
    try {
      await router.push(path);
    } finally {
      progress.stop();
    }
  };

  return navigate;
};
