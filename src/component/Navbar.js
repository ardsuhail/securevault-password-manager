
"use client"
import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";
import { Sidebar,SidebarClose } from "lucide-react";
import { useGlobalContext } from "./Context";
import { Menu } from "lucide-react";
export default function Navbar() {
    const { data: session } = useSession()
     const { showSidebar, setShowSidebar } = useGlobalContext();
    return (
           <nav className="bg-white/80 z-50 shadow-md fixed top-0 text-gra-800 w-full px-6 py-4 flex justify-between items-center shadow-lg">
      {/* Left side logo + sidebar toggle */}
      <div className="flex items-center gap-4">
        {/* Mobile Menu Button */}
        <button
          onClick={() => setShowSidebar(true)}
          className="sm:hidden p-2 rounded-md hover:bg-gray-800 transition"
        >
          <Menu className="w-6 h-6 text-gra-800" />
        </button>

        {/* Brand Name */}
        <Link href="/" className="text-2xl font-bold tracking-wide">
          SecureVault
        </Link>
      </div>

      {/* Desktop Links */}
      <ul className="items-center flex sm:gap-6">
        <li>
          <Link href="/" className="hover:text-blue-400  hidden sm:flex  transition">
            Home
          </Link>
        </li>
        <li>
          <Link href="/about-us" className="hover:text-blue-400  hidden sm:flex  transition">
            About Us
          </Link>
        </li>
        <li>
          <Link href="/features" className="hover:text-blue-400  hidden sm:flex  transition">
            Features
          </Link>
        </li>

        {session ? (
          <>
            <li>
              <Link href="/user" className="hover:text-blue-400  hidden sm:flex  transition">
                User
              </Link>
            </li>
            <li>
              <Link
                href="/user/my-password"
                className="hover:text-blue-400  hidden sm:flex  transition"
              >
                Your Password
              </Link>
            </li>
            <button
              onClick={() => signOut()}
              className="bg-red-600 px-3 py-1 rounded-lg hover:bg-red-700 transition"
            >
              Logout
            </button>
          </>
        ) : (
          <li>
            <Link
              href="/login"
              className="bg-blue-600 px-3 py-1 rounded-lg hover:bg-blue-700 transition"
            >
              Login
            </Link>
          </li>
        )}
      </ul>
    </nav>
    );
}
