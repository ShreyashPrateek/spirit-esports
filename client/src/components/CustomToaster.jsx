// src/components/CustomToaster.jsx
import { Toaster } from "react-hot-toast";

export default function CustomToaster() {
  return (
    <Toaster
      position="top-center"
      reverseOrder={false}
      gutter={8}
      toastOptions={{
        duration: 4000,
        style: {
          background: "#1f2937", // gray-800
          color: "#f9fafb", // gray-50
          border: "1px solid #374151", // gray-700
          borderRadius: "0.5rem",
          fontSize: "14px",
          boxShadow:
            "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
        },
        success: {
          style: {
            border: "1px solid #10b981", // emerald-500
            background: "#064e3b", // emerald-900
          },
          iconTheme: {
            primary: "#10b981",
            secondary: "#064e3b",
          },
        },
        error: {
          style: {
            border: "1px solid #ef4444", // red-500
            background: "#7f1d1d", // red-900
          },
          iconTheme: {
            primary: "#ef4444",
            secondary: "#7f1d1d",
          },
        },
        loading: {
          style: {
            border: "1px solid #8b5cf6", // purple-500
            background: "#581c87", // purple-900
          },
          iconTheme: {
            primary: "#8b5cf6",
            secondary: "#581c87",
          },
        },
      }}
    />
  );
}
