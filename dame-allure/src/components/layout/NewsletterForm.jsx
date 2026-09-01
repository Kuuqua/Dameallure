"use client";

import { useState } from "react";

export default function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [joined, setJoined] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;
    // Stub: swap for a real email/ESP endpoint later.
    setJoined(true);
  };

  if (joined) {
    return (
      <p className="text-[13px] text-gold-soft">
        You&apos;re on the list — thank you.
      </p>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex border-b border-ivory/30 focus-within:border-gold"
    >
      <label htmlFor="newsletter-email" className="sr-only">
        Email address
      </label>
      <input
        id="newsletter-email"
        type="email"
        required
        placeholder="Email address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full bg-transparent py-2 text-[14px] text-ivory placeholder:text-ivory/40 focus:outline-none"
      />
      <button
        type="submit"
        className="shrink-0 py-2 text-[12px] uppercase tracking-[0.08em] text-gold-soft transition-colors hover:text-gold-deep"
      >
        Join
      </button>
    </form>
  );
}
