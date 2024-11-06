"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Index() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to /en if no specific language is set in the URL
    router.replace("/en");
  }, [router]);

  return null;
}
