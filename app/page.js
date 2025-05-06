"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { redirect, useRouter } from "next/navigation";
import { useEffect } from "react";
export default function Home() {
  redirect('/dashboard');
  // return (
  //   <div>
  //     <h2>Subscribe to Risham !</h2>
  //     <Button>Subscribe</Button>
  //   </div>
  // )
}
