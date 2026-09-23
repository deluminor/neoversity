"use client";

import { Toaster } from "react-hot-toast";

export function ToastProvider() {
  return (
    <Toaster
      position="top-right"
      toastOptions={{
        duration: 5000,
        style: {
          borderRadius: "12px",
          background: "#101828",
          color: "#ffffff",
          fontSize: "14px",
        },
        success: { iconTheme: { primary: "#00aad4", secondary: "#ffffff" } },
        error: { iconTheme: { primary: "#bc0000", secondary: "#ffffff" } },
      }}
    />
  );
}
