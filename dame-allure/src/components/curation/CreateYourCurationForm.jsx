"use client";

import { useState, useEffect } from "react";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Textarea from "@/components/ui/Textarea";
import StepIndicator from "@/components/ui/StepIndicator";
import OptionButton from "@/components/curation/OptionButton";
import {
  shoppingForOptions,
  occasionOptions,
  needOptions,
  styleOptions,
} from "@/data/create-your-curation-options";
import {
  submitCurationRequest,
  curationRequestWhatsAppLink,
} from "@/lib/create-curation-request";
import { toggleValue } from "@/lib/array";
import { submitToNetlify } from "@/lib/netlify-forms";
import { playConfirmChime } from "@/lib/sound";

const TOTAL_STEPS = 9;
const STORAGE_KEY = "dame-allure-create-your-curation-draft";

const initialData = {
  shoppingFor: "",
  occasion: "",
  budget: "",
  needs: [],
  style: [],
  clothingSize: "",
  shoeSize: "",
  colourPreferences: "",
  additionalNotes: "",
  name: "",
  phone: "",
  email: "",
  whatsapp: "",
};

export default function CreateYourCurationForm({ initialOccasion = "" }) {
  const [step, setStep] = useState(1);
  const [data, setData] = useState({ ...initialData, occasion: initialOccasion });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [restored, setRestored] = useState(false);

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
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

  useEffect(() => {
    if (submitted) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ data, step }));
    } catch {
      // ignore write failures
    }
  }, [data, step, submitted]);

  const update = (field, value) => setData((prev) => ({ ...prev, [field]: value }));
  const next = () => setStep((s) => Math.min(s + 1, TOTAL_STEPS));
  const back = () => setStep((s) => Math.max(s - 1, 1));

  const canContinue = () => {
    if (step === 1) return Boolean(data.shoppingFor);
    if (step === 2) return Boolean(data.occasion);
    if (step === 3) return Boolean(data.budget);
    if (step === 4) return data.needs.length > 0;
    if (step === 5) return data.style.length > 0;
    if (step === 9) return Boolean(data.name && data.phone);
    return true;
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    await Promise.all([
      submitCurationRequest(data),
      submitToNetlify("create-your-curation", data),
    ]);
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
          Thank you. Your request has been received.
        </h2>
        <p className="mt-4 text-[15px] leading-relaxed text-charcoal/80">
          Your Dame Allure Curator will review your request and get in
          touch.
        </p>
        <div className="mt-8">
          <Button
            as="a"
            href={curationRequestWhatsAppLink(data)}
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
            <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
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
            <p className="mt-2 text-[13px] text-charcoal/80">
              Give us a rough figure — no need to be exact.
            </p>
            <div className="mt-6">
              <Input
                id="budget"
                label="Budget (GH₵)"
                placeholder="e.g. GH₵3,500"
                value={data.budget}
                onChange={(e) => update("budget", e.target.value)}
              />
            </div>
          </fieldset>
        )}

        {step === 4 && (
          <fieldset>
            <legend className="font-display text-2xl text-plum">
              What do you need?
            </legend>
            <p className="mt-2 text-[13px] text-charcoal/80">
              Choose as many as apply.
            </p>
            <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
              {needOptions.map((option) => (
                <OptionButton
                  key={option}
                  label={option}
                  selected={data.needs.includes(option)}
                  onClick={() => update("needs", toggleValue(data.needs, option))}
                />
              ))}
            </div>
          </fieldset>
        )}

        {step === 5 && (
          <fieldset>
            <legend className="font-display text-2xl text-plum">
              What is your style?
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

        {step === 6 && (
          <fieldset>
            <legend className="font-display text-2xl text-plum">
              Size information
            </legend>
            <p className="mt-2 text-[13px] text-charcoal/80">Optional.</p>
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
            </div>
          </fieldset>
        )}

        {step === 7 && (
          <fieldset>
            <legend className="font-display text-2xl text-plum">
              Colour preferences
            </legend>
            <p className="mt-2 text-[13px] text-charcoal/80">Optional.</p>
            <div className="mt-6">
              <Input
                id="colourPreferences"
                label="Colours you love (or want to avoid)"
                value={data.colourPreferences}
                onChange={(e) => update("colourPreferences", e.target.value)}
              />
            </div>
          </fieldset>
        )}

        {step === 8 && (
          <fieldset>
            <legend className="font-display text-2xl text-plum">
              Additional notes
            </legend>
            <p className="mt-2 text-[13px] text-charcoal/80">
              Anything else your Curator should know.
            </p>
            <div className="mt-6">
              <Textarea
                id="additionalNotes"
                label="Notes"
                value={data.additionalNotes}
                onChange={(e) => update("additionalNotes", e.target.value)}
              />
            </div>
          </fieldset>
        )}

        {step === 9 && (
          <fieldset>
            <legend className="font-display text-2xl text-plum">
              Contact information
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
              <Input
                id="whatsapp"
                label="WhatsApp (if different from phone)"
                value={data.whatsapp}
                onChange={(e) => update("whatsapp", e.target.value)}
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
