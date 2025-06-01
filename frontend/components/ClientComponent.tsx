// app/ClientComponent.tsx
"use client";

import { useEffect } from "react";

export default function ClientComponent({
  initialUserId,
}: {
  initialUserId: string;
}) {
  useEffect(() => {
    console.log("User ID on page load/refresh:", initialUserId);
  }, [initialUserId]);
}
