"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { LoaderCircle } from "lucide-react";
import Image from "next/image";

export default function UserPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
 const handleEdit=() => {
  alert("we are working on it")
   
 }
 
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/");
    }
  }, [status, router]);

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-100 to-gray-300">
        <LoaderCircle className="animate-spin text-blue-600 w-10 h-10" />
      </div>
    );
  }

  return (
      <section className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300 px-4 sm:px-6 py-10 sm:py-16 mt-10">
      <div className="relative bg-white/70 backdrop-blur-2xl border border-gray-300/40 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] p-6 sm:p-10 w-full max-w-sm sm:max-w-md text-center">
        {/* Decorative Glow Rings */}
        <div className="absolute -top-6 -right-6 w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-full blur-2xl opacity-40"></div>
        <div className="absolute -bottom-6 -left-6 w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full blur-2xl opacity-40"></div>

        {/* Profile Picture */}
        <div className="flex justify-center mb-6">
          <Image
            width={100}
            height={100}
            src={session?.user?.image || "/default-avatar.png"}
            alt="User Avatar"
            className="w-24 h-24 sm:w-28 sm:h-28 rounded-full border-4 border-blue-500 shadow-lg object-cover hover:scale-105 transition-transform duration-300"
          />
        </div>

        {/* User Info */}
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-1 truncate px-2">
          {session?.user?.name || "Anonymous User"}
        </h2>
        <p className="text-gray-600 text-xs sm:text-sm mb-8 break-all">
          {session?.user?.email || "user@email.com"}
        </p>

        {/* Info Box */}
        <div className="bg-white/60 border border-gray-300/50 rounded-2xl shadow-inner p-4 sm:p-5 space-y-4 text-left text-gray-700 text-sm sm:text-base">
          <div className="flex justify-between border-b border-gray-200 pb-3">
            <span className="text-gray-600">Full Name:</span>
            <span className="font-medium text-right truncate max-w-[150px]">
              {session?.user?.name}
            </span>
          </div>

          <div className="flex justify-between border-b border-gray-200 pb-3">
            <span className="text-gray-600">Email:</span>
            <span className="font-medium text-right break-all max-w-[150px]">
              {session?.user?.email}
            </span>
          </div>

          <div className="flex justify-between pb-3">
            <span className="text-gray-600">Member Since:</span>
            <span className="font-medium">August 2025</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
          <button
            onClick={handleEdit}
            className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-5 sm:px-6 py-2.5 rounded-lg font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 hover:scale-[1.03] w-full sm:w-auto"
          >
            Edit Profile
          </button>
          <button
            onClick={() => router.push("/user/my-password")}
            className="border border-blue-600 text-blue-600 px-5 sm:px-6 py-2.5 rounded-lg font-semibold hover:bg-blue-50 transition-all duration-300 hover:scale-[1.03] w-full sm:w-auto"
          >
            Your Passwords
          </button>
        </div>
      </div>
    </section>
  );
}
