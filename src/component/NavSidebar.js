"use client";
import React from "react";
import Link from "next/link";
import { SidebarClose } from "lucide-react";
import { useGlobalContext } from "./Context";
import { Home, Code, FileText, Mail, User,Info,Layers,Sparkles,LockKeyhole } from "lucide-react";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
const NavSidebar = () => {
  const { showSidebar, setShowSidebar } = useGlobalContext();
  const { data: session } = useSession();

  const pathname = usePathname();
  return (
    <nav
      className={`fixed top-0 left-0 h-full w-[90vw] sm:hidden
    bg-white/95 backdrop-blur-lg border-r border-gray-200
    shadow-xl z-[999]
    flex flex-col transition-transform duration-500
    ${showSidebar ? "translate-x-0" : "-translate-x-full"}
  `}
    >
   
      <div className="flex flex-col items-center px-6 py-6">
        <div className="flex items-center justify-between w-full">

        <Link
          href="/"
          onClick={() => setShowSidebar(false)}
          className="text-2xl font-extrabold font-mono text-transparent
        bg-clip-text bg-gradient-to-r from-cyan-500 to-emerald-500
        active:scale-110 transition-transform"
        >
         SecureVault 
        </Link>
        <button
          onClick={() => setShowSidebar(false)}
          className="text-gblack hover:text-gray-900 hover:rotate-180 transition-all duration-300"
        >
          <SidebarClose size={32} />
        </button>
          </div>
    
        <div className="w-full h-[1px] bg-gray-300 my-6 shadow-sm"></div>
      </div>


      <ul className="flex flex-col gap-4 text-lg px-6">
  <li>
    <Link
      href="/"
      onClick={() => setShowSidebar(false)}
      className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all duration-300 ${
        pathname === "/"
          ? "bg-blue-500 text-white shadow-lg"
          : "text-gray-800 hover:bg-gradient-to-r hover:from-cyan-100 hover:to-emerald-100 hover:shadow-md"
      }`}
    >
      <Home size={20} /> Home
    </Link>
  </li>

  <li>
    <Link
      href="/about-us"
      onClick={() => setShowSidebar(false)}
      className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all duration-300 ${
        pathname === "/about-us"
          ? "bg-blue-500 text-white shadow-lg"
          : "text-gray-800 hover:bg-gradient-to-r hover:from-cyan-100 hover:to-emerald-100 hover:shadow-md"
      }`}
    >
      <Info size={20} /> About Us
    </Link>
  </li>

  <li>
    <Link
      href="/features"
      onClick={() => setShowSidebar(false)}
      className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all duration-300 ${
        pathname === "/features"
          ? "bg-blue-500 text-white shadow-lg"
          : "text-gray-800 hover:bg-gradient-to-r hover:from-cyan-100 hover:to-emerald-100 hover:shadow-md"
      }`}
    >
      <Layers size={20} /> Features
    </Link>
  </li>

  {/* <li>
    <Link
      href="/contact"
      onClick={() => setShowSidebar(false)}
      className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all duration-300 ${
        pathname === "/contact"
          ? "bg-blue-500 text-white shadow-lg"
          : "text-gray-800 hover:bg-gradient-to-r hover:from-cyan-100 hover:to-emerald-100 hover:shadow-md"
      }`}
    >
      <Mail size={20} /> Contact Me
    </Link>
  </li> */}

   {session && (<>
  <li>
    <Link
      href="/user"
      onClick={() => setShowSidebar(false)}
      className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all duration-300 ${
        pathname === "/user"
          ? "bg-blue-500 text-white shadow-lg"
          : "text-gray-800 hover:bg-gradient-to-r hover:from-cyan-100 hover:to-emerald-100 hover:shadow-md"
      }`}
    >
      <User size={20} /> Profile
    </Link>
  </li>

  <li>
    <Link
      href="/user/my-password"
      onClick={() => setShowSidebar(false)}
      className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all duration-300 ${
        pathname === "/user/my-password"
          ? "bg-blue-500 text-white shadow-lg"
          : "text-gray-800 hover:bg-gradient-to-r hover:from-cyan-100 hover:to-emerald-100 hover:shadow-md"
      }`}
    >
      <LockKeyhole size={20} /> Your Passwords
    </Link>
  </li>
  </>)}
</ul>

    </nav>

  );
};

export default NavSidebar;
