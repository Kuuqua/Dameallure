import Button from "@/components/ui/Button";

export default function NotFound() {
  return (
    <section className="container-edit flex flex-col items-center justify-center gap-4 py-32 text-center">
      <p className="text-[12px] uppercase tracking-[0.15em] text-gold-deep">
        Page not found
      </p>
      <h1 className="font-display text-4xl text-plum md:text-5xl">
        This page doesn&apos;t exist — yet.
      </h1>
      <p className="max-w-md text-[15px] text-charcoal/80">
        The page you&apos;re looking for may have moved. Let&apos;s get you
        back to something beautifully curated.
      </p>
      <div className="mt-4 flex flex-wrap justify-center gap-4">
        <Button href="/" variant="primary">
          Back to Home
        </Button>
        <Button href="/shop" variant="secondary">
          Explore The Collections
        </Button>
      </div>
    </section>
  );
}
