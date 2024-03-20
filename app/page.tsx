"use client"
import { motion } from "framer-motion";
import InputForm from "./components/InputForm";

export default function Home() {
  return (
     <>
      
      <motion.div
        initial={{ y: -50, opacity: 0 }} // Initial state of the animation
        animate={{ y: 0, opacity: 1 }} // Final state of the animation
        transition={{ duration: 1, ease: "easeOut" }} // Duration and easing of the animation
      >
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-center text-gray-800 dark:text-white mt-24">
          Caesar Cipher
        </h1>
      </motion.div>
      <InputForm />
    </>
  )
}
