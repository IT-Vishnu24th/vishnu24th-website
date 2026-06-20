"use client";

import { Home, Compass, Rocket, Dices } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";

export default function FooterNavigation() {
  const router = useRouter();
  const pathname = usePathname();

  const menus = [
    {
      name: "Home",
      icon: Home,
      path: "/",
    },
    {
      name: "Explore",
      icon: Compass,
      path: "/explore",
    },
    {
      name: "Ranking",
      icon: Rocket,
      path: "/ranking",
    },
    {
      name: "Game",
      icon: Dices,
      path: "/game",
    },
  ];

  return (
    <footer className="fixed bottom-0 left-0 right-0 bg-black py-4">
      <div className="flex justify-around">
        {menus.map((item) => {
          const Icon = item.icon;
          const selected = pathname === item.path;

          return (
            <button
              key={item.name}
              onClick={() => router.push(item.path)}
              className="relative group flex justify-center"
            >
              <div
                className={`px-5 py-2 rounded-full transition ${
                  selected
                    ? "bg-white text-black"
                    : "text-white"
                }`}
              >
                <Icon size={22} />
              </div>

              <span
                className="
                  absolute
                  -top-8
                  px-2
                  py-1
                  rounded
                  text-xs
                  bg-white
                  text-black
                  opacity-0
                  group-hover:opacity-100
                  transition
                "
              >
                {item.name}
              </span>
            </button>
          );
        })}
      </div>
    </footer>
  );
}