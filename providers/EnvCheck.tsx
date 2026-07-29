"use client";

import { useEffect } from "react";

export function EnvCheck() {
  useEffect(() => {
    if (!process.env.NEXT_PUBLIC_REQRES_API_KEY) {
      console.warn(
        "[Venuze] NEXT_PUBLIC_REQRES_API_KEY is not set. All requests to reqres.in will fail with 401. " +
        "Create a .env.local file with your key (see .env.example)."
      );
    }
  }, []);

  return null;
}
