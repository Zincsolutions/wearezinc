"use client";

import { useEffect } from "react";
import { captureAttribution } from "@/lib/attribution";

// Records first-touch campaign data on React pages (see src/lib/attribution.ts).
export function AttributionCapture() {
  useEffect(() => {
    captureAttribution();
  }, []);
  return null;
}
