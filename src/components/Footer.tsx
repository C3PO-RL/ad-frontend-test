import React from "react";
import Link from "next/link";
import Image from "next/image";

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-[#404040] py-12 flex flex-col items-center border-t mt-8 ">
      <Link href="/" className="flex flex-col items-center gap-2">
        <Image
          src="/logo.png"
          alt="Apply Digital Logo"
          width={100}
          height={32}
          className="object-contain"
        />
      </Link>
    </footer>
  );
};
