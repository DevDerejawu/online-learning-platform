"use client"

import { createClient } from "@/lib/supabase/client";
import { useEffect } from "react"

export default function ResetPasswordHashTokenHndler(){
  useEffect(() => {
    const supabase = createClient()

    // Get hash from URL
    const hash = window.location.hash

    if (!hash) return

    // Convert hash into params
    const params = new URLSearchParams(hash.replace('#', '?'))

    const access_token = params.get("access_token")
    const refresh_token = params.get("refresh_token")

    if (access_token && refresh_token) {
      // Set session so user becomes authenticated
      supabase.auth.setSession({
        access_token,
        refresh_token
      })
    }
  }, [])

  return null
}