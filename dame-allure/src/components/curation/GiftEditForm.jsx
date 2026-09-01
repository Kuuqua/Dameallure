"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Textarea from "@/components/ui/Textarea";
import OptionButton from "@/components/curation/OptionButton";
import { budgetOptions, styleOptions } from "@/data/create-your-edit-options";
import { submitGiftRequest, giftRequestWhatsAppLink } from "@/lib/gift-request";
import { toggleValue } from "@/lib/array";

const initialData = {
  recipient: "",
  occasion: "",
  budget: "",
  style: [],
  colours: "",
  personalMessage: "",
  deliveryDate: "",
  name: "",
  phone: "",
};

export default function GiftEditForm() {
  const [data, setData] = useState(initialData);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const update = (field, value) => setData((prev) => ({ ...prev, [field]: value }));

  const canSubmit = Boolean(
    data.recipient && data.budget && data.name && data.phone
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!canSubmit) return;
    setSubmitting(true);
    await submitGiftRequest(data);
    setSubmitting(false);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="max-w-md">
        <p className="text-[12px] uppercase tracking-[0.15em] text-gold-deep">
          Request received
        </p>
        <h2 className="mt-4 font-display text-3xl text-plum">
          Your Gift Edit request has been received.
        </h2>
        <p className="mt-4 text-[15px] leading-relaxed text-charcoal/75">
          Thank you for trusting Dame Allure. Your Curator will review your
          request and begin creating something beautiful.
        </p>
        <div className="mt-8">
          <Button
            as="a"
            href={giftRequestWhatsAppLink(data)}
            target="_blank"
            rel="noopener noreferrer"
            variant="primary"
          >
            WhatsApp Dame Allure
          </Button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-lg">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <Input
          id="recipient"
          label="Recipient — who is she?"
          placeholder="e.g. My sister, a colleague, my wife"
          value={data.recipient}
          onChange={(e) => update("recipient", e.target.value)}
        />
        <Input
          id="occasion"
          label="Occasion"
          placeholder="e.g. Birthday, anniversary"
          value={data.occasion}
          onChange={(e) => update("occasion", e.target.value)}
        />
      </div>

      <div className="mt-8">
        <p className="mb-3 text-[12px] uppercase tracking-[0.08em] text-charcoal/80">
          Budget
        </p>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {budgetOptions.map((option) => (
            <OptionButton
              key={option}
              label={option}
              selected={data.budget === option}
              onClick={() => update("budget", option)}
            />
          ))}
        </div>
      </div>

      <div className="mt-8">
        <p className="mb-3 text-[12px] uppercase tracking-[0.08em] text-charcoal/80">
          Style — choose as many as apply
        </p>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {styleOptions.map((option) => (
            <OptionButton
              key={option}
              label={option}
              selected={data.style.includes(option)}
              onClick={() => update("style", toggleValue(data.style, option))}
            />
          ))}
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
        <Input
          id="colours"
          label="Colours"
          value={data.colours}
          onChange={(e) => update("colours", e.target.value)}
        />
        <Input
          id="deliveryDate"
          label="Delivery date"
          type="date"
          value={data.deliveryDate}
          onChange={(e) => update("deliveryDate", e.target.value)}
        />
      </div>

      <div className="mt-6">
        <Textarea
          id="personalMessage"
          label="Personal message"
          placeholder="Anything you'd like on her card"
          value={data.personalMessage}
          onChange={(e) => update("personalMessage", e.target.value)}
        />
      </div>

      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
        <Input
          id="giftName"
          label="Your name"
          required
          value={data.name}
          onChange={(e) => update("name", e.target.value)}
        />
        <Input
          id="giftPhone"
          label="Your phone"
          type="tel"
          required
          value={data.phone}
          onChange={(e) => update("phone", e.target.value)}
        />
      </div>

      <div className="mt-10 border-t border-plum/15 pt-6">
        <Button type="submit" variant="primary" disabled={!canSubmit || submitting}>
          {submitting ? "Sending…" : "Create A Gift Edit"}
        </Button>
      </div>
    </form>
  );
}
