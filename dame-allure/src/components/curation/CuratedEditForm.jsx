"use client";

import { useState, useEffect } from "react";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import StepIndicator from "@/components/ui/StepIndicator";
import OptionButton from "@/components/curation/OptionButton";
import {
  shoppingForOptions,
  occasionOptions,
  budgetOptions,
  styleOptions,
} from "@/data/create-your-edit-options";
import {
  submitEditRequest,
  editRequestWhatsAppLink,
} from "@/lib/create-edit-request";
import { toggleValue } from "@/lib/array";
import { submitToNetlify } from "@/lib/netlify-forms";
import { playConfirmChime } from "@/lib/sound";

const TOTAL_STEPS = 6;
const STORAGE_KEY = "dame-allure-create-your-edit-draft";

const initialData = {
  shoppingFor: "",
  occasion: "",
  budget: "",
  style: [],
  clothingSize: "",
  shoeSize: "",
  preferredColours: "",
  coloursToAvoid: "",
  fragrancePreference: "",
  specialRequests: "",
  requiredDate: "",
  deliveryLocation: "",
  name: "",
  phone: "",
  email: "",
};

export default function CuratedEditForm({ initialOccasion = "" }) {
  const [step, setStep] = useState(1);
  const [data, setData] = useState({ ...initialData, occasion: initialOccasion });
  const [submitted, setSubmitted] = useState(false);
  const [restored, setRestored] = useState(false);

  // Resume an in-progress edit if the person left and came back.
  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        // One-time hydrate from localStorage on mount, not a reactive effect.
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setData((prev) => ({ ...prev, ...parsed.data }));
        setStep(parsed.step || 1);
        setRestored(true);
      }
    } catch {
      // ignore corrupt/unavailable storage
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Save progress as they go.
  useEffect(() => {
    if (submitted) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ data, step }));
    } catch {
      // ignore write failures
    }
  }, [data, step, submitted]);
  const [submitting, setSubmitting] = useState(false);

  const update = (field, value) => setData((prev) => ({ ...prev, [field]: value }));
  const next = () => setStep((s) => Math.min(s + 1, TOTAL_STEPS));
  const back = () => setStep((s) => Math.max(s - 1, 1));

  const canContinue = () => {
    if (step === 1) return Boolean(data.shoppingFor);
    if (step === 2) return Boolean(data.occasion);
    if (step === 3) return Boolean(data.budget);
    if (step === 4) return data.style.length > 0;
    if (step === 6) return Boolean(data.name && data.phone);
    return true;
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    await Promise.all([submitEditRequest(data), submitToNetlify("create-your-edit", data)]);
    setSubmitting(false);
    setSubmitted(true);
    playConfirmChime();
    try {
      window.localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
  };

  if (submitted) {
    return (
      <div className="max-w-md">
        <p className="text-[12px] uppercase tracking-[0.15em] text-gold-deep">
          Request received
        </p>
        <h2 className="mt-4 font-display text-3xl text-plum">
          Your Edit request has been received.
        </h2>
        <p className="mt-4 text-[15px] leading-relaxed text-charcoal/75">
          Thank you for trusting Dame Allure. Your Curator will review your
          request and begin creating your edit.
        </p>
        <div className="mt-8">
          <Button
            as="a"
            href={editRequestWhatsAppLink(data)}
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
    <div className="max-w-lg">
      {restored ? (
        <p className="mb-6 border border-gold-deep/30 bg-gold-deep/5 px-4 py-3 text-[13px] text-plum">
          Welcome back — picking up where you left off.
        </p>
      ) : null}
      <StepIndicator step={step} total={TOTAL_STEPS} />

      <div className="mt-10 min-h-[280px]">
        {step === 1 && (
          <fieldset>
            <legend className="font-display text-2xl text-plum">
              Who are you shopping for?
            </legend>
            <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
              {shoppingForOptions.map((option) => (
                <OptionButton
                  key={option}
                  label={option}
                  selected={data.shoppingFor === option}
                  onClick={() => update("shoppingFor", option)}
                />
              ))}
            </div>
          </fieldset>
        )}

        {step === 2 && (
          <fieldset>
            <legend className="font-display text-2xl text-plum">
              What are you preparing for?
            </legend>
            <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
              {occasionOptions.map((option) => (
                <OptionButton
                  key={option}
                  label={option}
                  selected={data.occasion === option}
                  onClick={() => update("occasion", option)}
                />
              ))}
            </div>
          </fieldset>
        )}

        {step === 3 && (
          <fieldset>
            <legend className="font-display text-2xl text-plum">
              What&apos;s your budget?
            </legend>
            <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {budgetOptions.map((option) => (
                <OptionButton
                  key={option}
                  label={option}
                  selected={data.budget === option}
                  onClick={() => update("budget", option)}
                />
              ))}
            </div>
          </fieldset>
        )}

        {step === 4 && (
          <fieldset>
            <legend className="font-display text-2xl text-plum">
              How would you describe the style?
            </legend>
            <p className="mt-2 text-[13px] text-charcoal/80">
              Choose as many as apply.
            </p>
            <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
              {styleOptions.map((option) => (
                <OptionButton
                  key={option}
                  label={option}
                  selected={data.style.includes(option)}
                  onClick={() => update("style", toggleValue(data.style, option))}
                />
              ))}
            </div>
          </fieldset>
        )}

        {step === 5 && (
          <fieldset>
            <legend className="font-display text-2xl text-plum">Preferences</legend>
            <p className="mt-2 text-[13px] text-charcoal/80">
              Optional — share what helps your Curator get it right.
            </p>
            <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2">
              <Input
                id="clothingSize"
                label="Clothing size"
                value={data.clothingSize}
                onChange={(e) => update("clothingSize", e.target.value)}
              />
              <Input
                id="shoeSize"
                label="Shoe size"
                value={data.shoeSize}
                onChange={(e) => update("shoeSize", e.target.value)}
              />
              <Input
                id="preferredColours"
                label="Preferred colours"
                value={data.preferredColours}
                onChange={(e) => update("preferredColours", e.target.value)}
              />
              <Input
                id="coloursToAvoid"
                label="Colours to avoid"
                value={data.coloursToAvoid}
                onChange={(e) => update("coloursToAvoid", e.target.value)}
              />
              <Input
                id="fragrancePreference"
                label="Fragrance preference"
                value={data.fragrancePreference}
                onChange={(e) => update("fragrancePreference", e.target.value)}
              />
              <Input
                id="requiredDate"
                label="Required date"
                type="date"
                value={data.requiredDate}
                onChange={(e) => update("requiredDate", e.target.value)}
              />
              <Input
                id="deliveryLocation"
                label="Delivery location"
                className="sm:col-span-2"
                value={data.deliveryLocation}
                onChange={(e) => update("deliveryLocation", e.target.value)}
              />
              <Input
                id="specialRequests"
                label="Special requests"
                className="sm:col-span-2"
                value={data.specialRequests}
                onChange={(e) => update("specialRequests", e.target.value)}
              />
            </div>
          </fieldset>
        )}

        {step === 6 && (
          <fieldset>
            <legend className="font-display text-2xl text-plum">
              Contact details
            </legend>
            <div className="mt-6 grid grid-cols-1 gap-5">
              <Input
                id="name"
                label="Name"
                required
                value={data.name}
                onChange={(e) => update("name", e.target.value)}
              />
              <Input
                id="phone"
                label="Phone"
                type="tel"
                required
                value={data.phone}
                onChange={(e) => update("phone", e.target.value)}
              />
              <Input
                id="email"
                label="Email"
                type="email"
                value={data.email}
                onChange={(e) => update("email", e.target.value)}
              />
            </div>
          </fieldset>
        )}
      </div>

      <div className="mt-10 flex items-center justify-between border-t border-plum/15 pt-6">
        <button
          type="button"
          onClick={back}
          disabled={step === 1}
          className="text-[12px] uppercase tracking-[0.08em] text-plum/70 hover:text-plum disabled:opacity-0"
        >
          ← Back
        </button>

        {step < TOTAL_STEPS ? (
          <Button variant="primary" disabled={!canContinue()} onClick={next}>
            Continue
          </Button>
        ) : (
          <Button
            variant="primary"
            disabled={!canContinue() || submitting}
            onClick={handleSubmit}
          >
            {submitting ? "Sending…" : "Send My Request"}
          </Button>
        )}
      </div>
    </div>
  );
}
