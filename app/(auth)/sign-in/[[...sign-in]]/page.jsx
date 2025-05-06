"use client";
import { SignIn } from '@clerk/nextjs';
import { motion } from 'framer-motion';
import "./styles.css";

export default function Page() {
  return (
    <motion.div
      className="background-container"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.5 }}
    >
      <SignIn />
    </motion.div>
  );
}
