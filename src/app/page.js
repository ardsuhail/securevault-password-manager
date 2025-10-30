"use client"
import Link from "next/link";
import { useSession } from "next-auth/react";
export default function HomePage() {
  const {data:session}=useSession()
  return (
    <section className="flex min-h-screen w-full flex-col items-center justify-center text-center px-6 py-20 bg-gradient-to-br from-gray-300 via-gray-200 to-gray-50 text-white">
      {/* Heading */}
      <h1 className="text-4xl text-black sm:text-5xl font-extrabold mb-4 leading-tight">
        Securely Store & Manage Your Passwords 🔐
      </h1>

      {/* Description */}
      <p className="text-gray-700 text-base sm:text-lg max-w-2xl mb-8">
        <span className="text-blue-400 font-semibold">SecureVault</span> keeps your
        passwords safe with <span className="font-medium">Google authentication</span> 
        and <span className="font-medium">end-to-end encryption</span> — so only
        you can access them.
      </p>

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row gap-4">
       {session? <Link
          href="/user/add-new-password"
          className="bg-blue-600 hover:bg-blue-700 px-8 py-3 rounded-lg text-lg font-semibold transition-all duration-200 shadow-md hover:shadow-blue-500/20"
        >
          Get Started
        </Link>:<Link
          href="/login"
          className="bg-blue-600 hover:bg-blue-700 px-8 py-3 rounded-lg text-lg font-semibold transition-all duration-200 shadow-md hover:shadow-blue-500/20"
        >
          Get Started
        </Link>}
        <Link
          href="/features"
          className="border border-gray-900 text-gray-700 hover:border-blue-500 hover:text-blue-400 px-8 py-3 rounded-lg text-lg font-semibold transition-all duration-200"
        >
          Learn More
        </Link>
      </div>

      {/* Subtle fade-in animation */}
      <style jsx>{`
        section {
          animation: fadeIn 1s ease-in-out;
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
}
