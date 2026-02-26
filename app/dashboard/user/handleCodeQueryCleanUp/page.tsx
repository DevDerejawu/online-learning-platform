"use client";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function HandleCodeCleanup() {
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    // Parse URL query
    const url = new URL(window.location.href);
    const code = url.searchParams.get("code");

    if (code) {
      // Remove the query without refreshing
      window.history.replaceState({}, document.title, url.pathname);
    }

    // Make sure session exists
    supabase.auth.getSession().then(({ data }) => {
      if (!data.session) {
        router.replace("/login"); // redirect if not logged in
      }
    });
  }, []);

  return null; 
}