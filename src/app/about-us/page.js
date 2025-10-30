"use client"
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
// About page for a lightweight password manager (SecureVault)
// Tailwind CSS + Framer Motion
// Export default React component so it can be dropped into a Next.js / CRA app

export default function About() {
  const brand = "SecureVault";

  const container = {
    hidden: { opacity: 0, y: 8 },
    show: {
      opacity: 1,
      y: 0,
      transition: { staggerChildren: 0.06, ease: "easeOut", duration: 0.45 },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 6 },
    show: { opacity: 1, y: 0, transition: { ease: "easeOut", duration: 0.4 } },
  };

  return (
    <main className="min-h-screen mt-15 bg-gray-100 flex items-start justify-center p-6 sm:mt-10 md:p-12">
      <motion.section
        className="max-w-4xl w-full bg-white rounded-2xl shadow-sm p-6 md:p-10 ring-1 ring-gray-200"
        initial="hidden"
        animate="show"
        variants={container}
      >
        <motion.header variants={item} className="mb-4 md:mb-6">
          <h1 className="text-3xl md:text-4xl font-semibold leading-tight">
            About {brand}
          </h1>
          <p className="mt-2 text-sm md:text-base text-gray-600">
            A fast, secure and simple password manager that helps you create,
            store and manage credentials — all in one place. Lightweight UI so it
            feels buttery-smooth on any device.
          </p>
        </motion.header>

        <motion.div variants={item} className="grid gap-6 md:grid-cols-2 mb-6">
          <div>
            <h2 className="text-lg font-medium">What you can do</h2>
            <ul className="mt-3 space-y-2 text-gray-700">
              <li>• Create new entries with Title, Username, Email & Password</li>
              <li>• View full details quickly in one place</li>
              <li>• Edit or delete any entry anytime</li>
              <li>• Search & sort your saved credentials effortlessly</li>
            </ul>
          </div>

          <div>
            <h2 className="text-lg font-medium">Design goals</h2>
            <p className="mt-3 text-gray-700">
              We focused on minimal, responsive design and small-but-smooth
              animations. Animations are subtle (framer-motion) so the app stays
              lightweight and fast — no janky frames on low-end devices.
            </p>
          </div>
        </motion.div>

        <motion.section variants={item} className="mb-6">
          <h2 className="text-lg font-medium">Security & privacy</h2>
          <p className="mt-3 text-gray-700">
            Security is the core of {brand}. A few highlights:
          </p>
          <ul className="mt-3 space-y-2 text-gray-700">
            <li>• Local-first storage option (data stays on your device if you prefer)</li>
            <li>• Strong encryption for stored passwords (AES-256 recommended)</li>
            <li>• Optional master password or OS-level biometrics for quick unlock</li>
            <li>• No tracking, no analytics unless you explicitly enable it</li>
          </ul>
        </motion.section>

        <motion.section variants={item} className="mb-6">
          <h2 className="text-lg font-medium">Why people trust {brand}</h2>
          <ol className="mt-3 list-decimal pl-5 space-y-2 text-gray-700">
            <li>Clean UX that minimizes clicks — create, edit, delete in one flow.</li>
            <li>Focused performance: small bundle & little animation work so it feels instant.</li>
            <li>Transparent security practices and easy export/import of data.</li>
          </ol>
        </motion.section>

        <motion.section variants={item} className="mb-6">
          <h2 className="text-lg font-medium">Lightweight animations</h2>
          <p className="mt-3 text-gray-700">
            We use framer-motion but keep motion small: simple fades and tiny
            slide-ups. That keeps the UI feeling alive without draining CPU.
          </p>

          <div className="mt-4 p-4 rounded-lg bg-gray-50 border border-dashed border-gray-200 text-sm text-gray-600">
            Tip: If you want even more performance, reduce stagger timing or
            disable animations on mobile via a small screen-width check.
          </div>
        </motion.section>

        <motion.section variants={item} className="mb-6">
          <h2 className="text-lg font-medium">How the core flow works</h2>
          <ol className="mt-3 list-decimal pl-5 space-y-2 text-gray-700">
            <li>
              Create: Click “New” → fill Title, Username, Email, Password → Save.
            </li>
            <li>
              View: Click an item to open full details (copy username or password
              with one click).
            </li>
            <li>
              Edit / Delete: Inline edit modal opens — save or permanently
              delete with confirmation.
            </li>
          </ol>
        </motion.section>

        <motion.footer variants={item} className="mt-6 pt-4 border-t border-gray-100">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
            <div>
              <p className="text-sm text-gray-600">Made with care by the team — focused on speed & privacy.</p>
              <p className="text-sm text-gray-500 mt-1">Need a feature or want to report a bug? Reach out.</p>
            </div>

            <div className="flex gap-3 items-center">
              <button className="px-4 py-2 rounded-lg bg-sky-600 text-white text-sm shadow-sm hover:shadow-md transition">
                Contact Support
              </button>
              <Link href={"/features"} className="px-4 py-2 rounded-lg border text-sm border-gray-200 hover:bg-gray-50 transition">
                View Features
              </Link>
            </div>
          </div>
        </motion.footer>
      </motion.section>
    </main>
  );
}
