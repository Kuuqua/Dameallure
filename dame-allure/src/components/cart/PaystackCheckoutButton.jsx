"use client";

import { useEffect, useState } from "react";
import { useCart } from "@/lib/cart-context";
import { siteConfig } from "@/data/site";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { playConfirmChime } from "@/lib/sound";

const PAYSTACK_SRC = "https://js.paystack.co/v1/inline.js";

function loadPaystackScript() {
  return new Promise((resolve, reject) => {
    if (window.PaystackPop) return resolve();
    const existing = document.querySelector(`script[src="${PAYSTACK_SRC}"]`);
    if (existing) {
      existing.addEventListener("load", () => resolve());
      existing.addEventListener("error", reject);
      return;
    }
    const script = document.createElement("script");
    script.src = PAYSTACK_SRC;
    script.onload = () => resolve();
    script.onerror = reject;
    document.body.appendChild(script);
  });
}

export default function PaystackCheckoutButton() {
  const { items, subtotal, clear, setOpen } = useCart();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle"); // idle | loading | success
  const isPlaceholderKey = siteConfig.paystackPublicKey.includes("replace_with");

  useEffect(() => {
    // Warm the script in the background so the popup opens instantly on click.
    loadPaystackScript().catch(() => {});
  }, []);

  const handlePay = async () => {
    if (!email || items.length === 0) return;
    setStatus("loading");

    if (isPlaceholderKey) {
      // No real key configured yet — this is where a live payment would
      // normally happen. Kept as a clearly-labelled stand-in so the flow
      // is demoable without a Paystack account.
      window.setTimeout(() => {
        setStatus("success");
        playConfirmChime();
        clear();
      }, 900);
      return;
    }

    try {
      await loadPaystackScript();
      const handler = window.PaystackPop.setup({
        key: siteConfig.paystackPublicKey,
        email,
        amount: Math.round(subtotal * 100), // pesewas
        currency: "GHS",
        ref: `dame-allure-${Date.now()}`,
        callback: () => {
          setStatus("success");
          playConfirmChime();
          clear();
        },
        onClose: () => setStatus("idle"),
      });
      handler.openIframe();
    } catch {
      setStatus("idle");
    }
  };

  if (status === "success") {
    return (
      <div className="text-center">
        <p className="font-display text-lg text-plum">Payment received.</p>
        <p className="mt-2 text-[13px] text-charcoal/80">
          Thank you — a confirmation is on its way to {email}.
        </p>
        <button
          onClick={() => setOpen(false)}
          className="mt-4 text-[12px] uppercase tracking-[0.08em] text-plum/70 underline decoration-gold underline-offset-4"
        >
          Continue browsing
        </button>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-4">
        <Input
          id="checkout-email"
          label="Email for receipt"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <Button
        type="button"
        variant="primary"
        className="w-full"
        disabled={!email || status === "loading"}
        onClick={handlePay}
      >
        {status === "loading" ? "Processing…" : `Pay GH₵${subtotal.toLocaleString()} with Paystack`}
      </Button>
      {isPlaceholderKey ? (
        <p className="mt-2 text-[11px] text-charcoal/50">
          Test mode — set a real Paystack key in src/data/site.js to accept
          live payments.
        </p>
      ) : null}
    </div>
  );
}
