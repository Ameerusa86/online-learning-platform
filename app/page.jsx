// app/page.js
"use client";

import ProtectedRoute from "./components/ProtectedRoute";

export default function HomePage() {
  return (
    <ProtectedRoute>
      <h1>Welcome to the homepage!</h1>
    </ProtectedRoute>
  );
}
