"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Textarea from "@/components/ui/Textarea";
import OptionButton from "@/components/curation/OptionButton";
import { styleOptions } from "@/data/create-your-curation-options";
import { giftRecipientOptions, giftOccasionOptions } from "@/data/gift-curation-options";
import { submitGiftCuration, giftCurationWhatsAppLink } from "@/lib/gift-curation-request";
import { toggleValue } from "@/lib/array";
import { submitToNetlify } from "@/lib/netlify-forms";
import { playConfirmChime } from "@/lib/sound";

const initialData = {
  who: "",
  occasion: "",
  budget: "",
  style: [],
  interests: "",
  message: "",
  name: "",
  phone: "",
};

export default function GiftCurationForm() {
  const [data, setData] = useState(initialData);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const update = (field, value) => setData((prev) => ({ ...prev, [field]: value }));

  const canSubmit = Boolean(data.who && data.occasion && data.budget && data.name && data.phone);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!canSubmit) return;
    setSubmitting(true);
    await Promise.all([submitGiftCuration(data), submitToNetlify("gift-curation", data)]);
    setSubmitting(false);
    setSubmitted(true);
    playConfirmChime();
  };

  if (submitted) {
    return (
      <div className="max-w-md">
        <p className="text-[12px] uppercase tracking-[0.15em] text-gold-deep">
          Request received
        </p>
        <h2 className="mt-4 font-display text-3xl text-plum">
          Let Dame Allure curate something she&apos;ll love.
        </h2>
        <p className="mt-4 text-[15px] leading-relaxed text-charcoal/80">
          Thank you. Your Dame Allure Curator will review your request and
          get in touch.
        </p>
        <div className="mt-8">
          <Button
            as="a"
            href={giftCurationWhatsAppLink(data)}
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
      <div className="mb-8">
        <p className="mb-3 text-[12px] uppercase tracking-[0.08em] text-charcoal/80">
          Who?
        </p>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {giftRecipientOptions.map((option) => (
            <OptionButton
              key={option}
              label={option}
              selected={data.who === option}
              onClick={() => update("who", option)}
            />
          ))}
        </div>
      </div>

      <div className="mb-8">
        <p className="mb-3 text-[12px] uppercase tracking-[0.08em] text-charcoal/80">
          Occasion
        </p>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {giftOccasionOptions.map((option) => (
            <OptionButton
              key={option}
              label={option}
              selected={data.occasion === option}
              onClick={() => update("occasion", option)}
            />
          ))}
        </div>
      </div>

      <div className="mb-8">
        <Input
          id="giftBudget"
          label="Budget (GH₵)"
          placeholder="e.g. GH₵1,500"
          value={data.budget}
          onChange={(e) => update("budget", e.target.value)}
        />
      </div>

      <div className="mb-8">
        <p className="mb-3 text-[12px] uppercase tracking-[0.08em] text-charcoal/80">
          Style / personality — choose as many as apply
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

      <div className="mb-6">
        <Input
          id="interests"
          label="Her interests"
          placeholder="e.g. Skincare, travel, reading"
          value={data.interests}
          onChange={(e) => update("interests", e.target.value)}
        />
      </div>

      <div className="mb-8">
        <Textarea
          id="giftMessage"
          label="Message"
          placeholder="Anything you'd like on her card"
          value={data.message}
          onChange={(e) => update("message", e.target.value)}
        />
      </div>

      <div className="mb-2 grid grid-cols-1 gap-6 sm:grid-cols-2">
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
          {submitting ? "Sending…" : "Create A Gift Curation"}
        </Button>
      </div>
    </form>
  );
}
