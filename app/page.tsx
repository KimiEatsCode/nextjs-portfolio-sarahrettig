import Link from "next/link";
import React from "react";

const navigation = [
  { name: "Projects", href: "/projects" },
   { name: "Resume", 	href: "https://drive.google.com/file/d/1ciS0_BLVzV3XoPgdwl5MO4eIXh9_me0d/view?usp=sharing" },
  { name: "Contact", href: "/contact" },
];

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen overflow-hidden bg-white">
      <nav className="my-16">
        <ul className="flex items-center justify-center gap-4">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm duration-500 text-black hover:text-black"
            >
              {item.name}
            </Link>
          ))}
        </ul>
      </nav>
    
      <div className="hidden w-screen h-px animate-glow md:block bg-gradient-to-r from-zinc-300/0 via-zinc-300/50 to-zinc-300/0" />
    
      <h1 className="py-3.5 px-0.5 z-10 text-4xl text-black duration-1000 bg-oatmeal-600 cursor-default font-display sm:text-6xl md:text-9xl whitespace-nowrap">
      sarah kimi rettig
      </h1>
   
      <div className="hidden w-screen h-px md:block bg-gradient-to-r from-zinc-300/0 via-zinc-300/50 to-zinc-300/0" />
      <div className="my-16 text-center">
        <h2 className="text-sm text-black ">
         
        </h2>
      </div>
    </div>
  );

}
