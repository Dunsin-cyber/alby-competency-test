"use client";

import { cn } from "@/lib/utils";
import { IconLayoutNavbarCollapse } from "@tabler/icons-react";
import {
  AnimatePresence,
  MotionValue,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "motion/react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

// Floating Dock Wrapper
export const FloatingDock = ({
  items,
  className,
}: {
  items: { title: string; icon: React.ReactNode; href: string }[];
  className?: string;
}) => {
  return (
    <>
      <FloatingDockBar items={items} className={className} />
      <FloatingDockMobile items={items} className={className} />
    </>
  );
};

// Main Floating Dock (desktop only)
const FloatingDockBar = ({
  items,
  className,
}: {
  items: { title: string; icon: React.ReactNode; href: string }[];
  className?: string;
}) => {
  const mouseX = useMotionValue(Infinity);

  return (
    <div className="w-full overflow-x-auto hidden md:block">
      <motion.div
        onMouseMove={(e) => mouseX.set(e.pageX)}
        onMouseLeave={() => mouseX.set(Infinity)}
        className={cn(
          "flex w-max max-w-full items-end gap-4 rounded-2xl bg-gray-50 dark:bg-neutral-900 px-4 pb-3 mx-auto",
          className
        )}
      >
        {items.map((item) => (
          <IconContainer mouseX={mouseX} key={item.title} {...item} />
        ))}
      </motion.div>
    </div>
  );
};

// Mobile Dock
const FloatingDockMobile = ({
  items,
  className,
}: {
  items: { title: string; icon: React.ReactNode; href: string }[];
  className?: string;
}) => {
  const [open, setOpen] = useState(false);

  return (
    <div className={cn("relative block md:hidden", className)}>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute bottom-full right-0 mb-2 flex flex-col gap-2 p-2 rounded-xl bg-white dark:bg-neutral-900 shadow-xl z-50"
          >
            {items.map((item) => (
              <Link
                href={item.href}
                key={item.title}
                className="h-10 w-10 rounded-full bg-gray-100 dark:bg-neutral-800 flex items-center justify-center"
              >
                <div className="h-4 w-4">{item.icon}</div>
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="h-10 w-10 rounded-full bg-gray-100 dark:bg-neutral-800 flex items-center justify-center"
      >
        <IconLayoutNavbarCollapse className="h-5 w-5 text-neutral-500 dark:text-neutral-300" />
      </button>
    </div>
  );
};

// Icon Container with animation on hover (desktop only)
const IconContainer = ({
  mouseX,
  title,
  icon,
  href,
}: {
  mouseX: MotionValue;
  title: string;
  icon: React.ReactNode;
  href: string;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const distance = useTransform(mouseX, (val) => {
    if (isMobile) return Infinity;
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  const width = useSpring(
    useTransform(distance, [-150, 0, 150], [40, 80, 40]),
    { mass: 0.1, stiffness: 150, damping: 12 }
  );
  const height = useSpring(
    useTransform(distance, [-150, 0, 150], [40, 80, 40]),
    { mass: 0.1, stiffness: 150, damping: 12 }
  );
  const widthIcon = useSpring(
    useTransform(distance, [-150, 0, 150], [20, 40, 20]),
    { mass: 0.1, stiffness: 150, damping: 12 }
  );
  const heightIcon = useSpring(
    useTransform(distance, [-150, 0, 150], [20, 40, 20]),
    { mass: 0.1, stiffness: 150, damping: 12 }
  );

  return (
    <Link href={href}>
      <motion.div
        ref={ref}
        style={{
          width: isMobile ? 48 : width,
          height: isMobile ? 48 : height,
        }}
        onMouseEnter={() => !isMobile && setHovered(true)}
        onMouseLeave={() => !isMobile && setHovered(false)}
        className="relative flex aspect-square items-center justify-center rounded-full bg-gray-200 dark:bg-neutral-800"
      >
        <AnimatePresence>
          {!isMobile && hovered && (
            <motion.div
              initial={{ opacity: 0, y: 10, x: "-50%" }}
              animate={{ opacity: 1, y: 0, x: "-50%" }}
              exit={{ opacity: 0, y: 2, x: "-50%" }}
              className="absolute left-1/2 top-[-2rem] w-fit -translate-x-1/2 rounded-md border border-gray-200 bg-gray-100 px-2 py-0.5 text-xs text-neutral-700 dark:border-neutral-900 dark:bg-neutral-800 dark:text-white"
            >
              {title}
            </motion.div>
          )}
        </AnimatePresence>
        <motion.div
          style={{
            width: isMobile ? 20 : widthIcon,
            height: isMobile ? 20 : heightIcon,
          }}
          className="flex items-center justify-center"
        >
          {icon}
        </motion.div>
      </motion.div>
    </Link>
  );
};
