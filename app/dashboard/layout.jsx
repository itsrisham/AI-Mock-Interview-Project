"use client";
import { AnimatePresence } from "framer-motion";
import Header from "./_components/Header";

export default function Layout({ children }) {

  return (
    <div>
      <Header/>
      <AnimatePresence mode="wait">{children}</AnimatePresence>
    </div>)
}
