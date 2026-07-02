import { Container } from "@/components/ui/container";

export function NewsletterCta() {
  return (
    <section className="bg-primary text-primary-foreground">
      <Container className="flex flex-col items-center gap-6 py-16 text-center sm:py-20">
        <h2 className="max-w-2xl font-serif text-3xl sm:text-4xl">
          Join the list for early access &amp; a buying guide
        </h2>
        <p className="max-w-md text-sm text-primary-foreground/80">
          Thoughtful emails on diamonds, design and our commitments. No spam — unsubscribe anytime.
        </p>
        {/* TODO(phase-6): wire newsletter subscribe to the API */}
        <form className="flex w-full max-w-md flex-col gap-2 sm:flex-row">
          <label htmlFor="home-newsletter" className="sr-only">
            Email address
          </label>
          <input
            id="home-newsletter"
            type="email"
            placeholder="you@example.com"
            className="h-12 flex-1 rounded-md bg-surface px-4 text-sm text-foreground outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          />
          <button
            type="button"
            className="h-12 shrink-0 rounded-md bg-accent px-6 text-sm font-medium text-accent-foreground transition-colors hover:bg-gold-600"
          >
            Subscribe
          </button>
        </form>
      </Container>
    </section>
  );
}
