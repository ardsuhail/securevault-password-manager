"use client";
import { useSession, signIn } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { LoaderCircle } from "lucide-react";

export default function LoginPage() {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session) {
      router.push("/user");
    }
  }, [session, router]);

  if (!session)
    return (
      <section className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-300 via-gray-200 to-gray-100 px-4">
        <div className="relative bg-white/70 backdrop-blur-2xl border border-gray-300/50 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] p-8 sm:p-10 w-[90%] max-w-md text-center transition-all duration-300 hover:shadow-[0_10px_40px_rgb(0,0,0,0.15)]">
          {/* Logo / Title */}
          <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 text-transparent bg-clip-text mb-4">
            Welcome Back 👋
          </h1>
          <p className="text-gray-600 mb-8 text-sm sm:text-base">
            Login securely to <span className="font-semibold">SecureVault</span> and manage your passwords with confidence.
          </p>

          {/* Google Button */}
          <button
            onClick={() => signIn("google")}
            className="w-full cursor-pointer bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-3 px-6 rounded-xl shadow-md transition-all duration-300 flex items-center justify-center gap-3 hover:scale-[1.03]"
          >
            <img
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              alt="Google logo"
              className="w-6 h-6 bg-white rounded-full p-[2px]"
            />
            <span className="text-sm sm:text-base font-medium">
              Continue with Google
            </span>
          </button>

          {/* Subtext */}
          <p className="text-gray-500 mt-6 text-xs sm:text-sm">
            Your privacy is protected — we never store your personal data.
          </p>

          {/* Decorative ring */}
          <div className="absolute -top-6 -right-6 w-16 h-16 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-full blur-2xl opacity-40"></div>
          <div className="absolute -bottom-6 -left-6 w-20 h-20 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full blur-2xl opacity-40"></div>
        </div>
      </section>
    );

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-300 via-gray-200 to-gray-100">
      <LoaderCircle className="animate-spin text-blue-600 w-10 h-10" />
    </div>
  );
}
