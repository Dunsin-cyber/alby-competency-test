import ThemeToggle from "@/components/ThemeToggle";
import ColourfulText from "@/components/ui/colourful-text";
import { FloatingDock } from "@/components/ui/floating-dock";
import {
  IconBrandGithub,
  IconHome,
  IconNewSection,
  IconTerminal2,
} from "@tabler/icons-react";

export default function FloatingDockDemo() {
  const links = [
    {
      title: "Home",
      icon: (
        <IconHome className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "#",
    },

    {
      title: "Products",
      icon: (
        <IconTerminal2 className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "#",
    },
    {
      title: "Components",
      icon: (
        <IconNewSection className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "#",
    },
    {
      title: "GitHub",
      icon: (
        <IconBrandGithub className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "https://github.com/successaje/GridX",
    },
  ];
  return (
    <div className=" flex justify-between items-center mt-5">
      <div className="text-3xl font-bold z-2 font-sans">
        <ColourfulText text="ACT" />
      </div>
      <div className="flex space-x-4 justify-between">
        <ThemeToggle />
        <FloatingDock mobileClassName="translate--20" items={links} />
      </div>
    </div>
  );    
}
