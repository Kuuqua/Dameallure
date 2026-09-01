"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Textarea from "@/components/ui/Textarea";

export default function ContactForm() {
  const [data, setData] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const update = (field, value) => setData((prev) => ({ ...prev, [field]: value }));
  const canSubmit = Boolean(data.name && data.email && data.message);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!canSubmit) return;
    setSubmitting(true);
    // Stub: swap for a real email/CRM endpoint later.
    await new Promise((resolve) => setTimeout(resolve, 400));
    setSubmitting(false);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div>
        <h2 className="font-display text-2xl text-plum">Message sent.</h2>
        <p className="mt-3 text-[15px] text-charcoal/80">
          Thank you for reaching out — a member of the Dame Allure team will
          be in touch shortly.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-md">
      <div className="grid grid-cols-1 gap-6">
        <Input
          id="contactName"
          label="Name"
          required
          value={data.name}
          onChange={(e) => update("name", e.target.value)}
        />
        <Input
          id="contactEmail"
          label="Email"
          type="email"
          required
          value={data.email}
          onChange={(e) => update("email", e.target.value)}
        />
        <Textarea
          id="contactMessage"
          label="Message"
          required
          value={data.message}
          onChange={(e) => update("message", e.target.value)}
        />
      </div>
      <div className="mt-8">
        <Button type="submit" variant="primary" disabled={!canSubmit || submitting}>
          {submitting ? "Sending…" : "Send Message"}
        </Button>
      </div>
    </form>
  );
}
