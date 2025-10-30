"use client"
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useSession } from "next-auth/react";
export default function ViewFeatures() {
  const {data:session}=useSession()
  const brand = "SecureVault";

  const container = {
    hidden: { opacity: 0, y: 8 },
    show: {
      opacity: 1,
      y: 0,
      transition: { staggerChildren: 0.05, ease: "easeOut", duration: 0.45 },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 6 },
    show: { opacity: 1, y: 0, transition: { ease: "easeOut", duration: 0.4 } },
  };

  const features = [
    {
      title: "MongoDB Integration",
      desc: "All your password entries are stored securely in MongoDB with strong encryption.",
    },
    {
      title: "Create & Manage Entries",
      desc: "Easily create, view, edit, and delete password entries using a smooth UI connected to your MongoDB database.",
    },
    {
      title: "Real-Time Updates",
      desc: "Whenever you add or edit a password, changes instantly reflect on your dashboard without page refresh.",
    },
    {
      title: "Secure Encryption",
      desc: "Passwords are encrypted before saving in MongoDB using AES-256 for maximum protection.",
    },
    {
      title: "Next.js API Routes",
      desc: "All CRUD operations are handled through secure Next.js API routes to keep your data safe.",
    },
    {
      title: "Responsive & Lightweight UI",
      desc: "Enjoy a clean, minimal interface built with Tailwind CSS and Framer Motion for smooth transitions.",
    },
    {
      title: "Search & Filter",
      desc: "Quickly find any saved password using instant search or filters.",
    },
    {
      title: "Copy with One Click",
      desc: "Copy username or password instantly with one secure click.",
    },
  ];

  return (
    <main className="min-h-screen mt-15 sm:mt-10 bg-gray-100 flex justify-center items-start p-6 md:p-12">
      <motion.section
        className="max-w-5xl w-full bg-white rounded-2xl shadow-sm p-6 md:p-10 ring-1 ring-gray-200"
        initial="hidden"
        animate="show"
        variants={container}
      >
        <motion.header variants={item} className="mb-8">
          <h1 className="text-3xl md:text-4xl font-semibold leading-tight text-gray-800">
            Features of {brand}
          </h1>
          <p className="mt-3 text-sm md:text-base text-gray-600 max-w-2xl">
            Explore all the MongoDB-powered features that make {brand} your fast and secure password manager.
          </p>
        </motion.header>

        <motion.div
          variants={container}
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={item}
              className="p-5 bg-gray-50 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition"
            >
              <h3 className="text-lg font-medium text-gray-800 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {feature.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          variants={item}
          className="mt-10 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
        >
          <p className="text-sm text-gray-600">
            These MongoDB + Next.js features are built for real-world performance and reliability.
          </p>
          <div className="flex gap-3">
            <Link href={"/"} className="px-4 py-2 rounded-lg bg-sky-600 text-white text-sm shadow-sm hover:shadow-md transition">
              Go Back
            </Link>
           {session?
           <Link href={"/user/add-new-password"} className="px-4 py-2 rounded-lg border text-sm border-gray-200 hover:bg-gray-50 transition">
              Try Now
            </Link>:<Link href={"/login"} className="px-4 py-2 rounded-lg border text-sm border-gray-200 hover:bg-gray-50 transition">
              Try Now
            </Link>
          } 
          </div>
        </motion.div>
      </motion.section>
    </main>
  );
}