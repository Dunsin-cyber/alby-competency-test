"use client";

import { useProgress } from "@bprogress/next";
import { useRouter } from "next/navigation";

export const useProgressNavigation = () => {
  const router = useRouter();
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
