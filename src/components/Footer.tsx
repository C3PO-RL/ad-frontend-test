import React from "react";
import Link from "next/link";

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-gray-100 py-6 flex flex-col items-center border-t mt-8">
      <Link href="/" className="flex flex-col items-center gap-2">
        {/* Placeholder SVG for Apply Digital logo */}
        <svg
          width="36"
          height="36"
          viewBox="0 0 36 36"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <polygon points="18,6 34,30 2,30" fill="#222" />
        </svg>
        <span className="font-semibold tracking-wide text-sm">
          APPLY DIGITAL
        </span>
      </Link>
    </footer>
  );
};
