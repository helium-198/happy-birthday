import { createFileRoute } from "@tanstack/react-router";
import { ArrowUp } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

import poems from "@/data/poems.json";
import tulipsCorner from "@/assets/tulips-corner.png";
import tulipSprig from "@/assets/tulip-sprig.png";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Happy Birthday Aashi!" },
      {
        name: "description",
        content:
          "A quiet birthday keepsake for Aashi, with 22 poems written by her love.",
      },
      { property: "og:title", content: "Happy Birthday Aashi!" },
      {
        property: "og:description",
        content:
          "A quiet birthday keepsake for Aashi, with 22 poems written by her love.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Happy Birthday Aashi!" },
      {
        name: "twitter:description",
        content: "A quiet birthday keepsake for Aashi, with 22 poems written by her love.",
      },
    ],
  }),
  component: Keepsake,
});

type Poem = { title: string; content: string };

const allPoems = poems as Poem[];

function useReveal<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setVisible(true);
            io.disconnect();
          }
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return { ref, visible };
}

function Ornament({ label }: { label?: string }) {
  return (
    <div className="rule-ornament mx-auto flex w-full max-w-xs items-center gap-4 text-muted-foreground">
      <span className="font-display text-sm tracking-[0.35em] uppercase">{label ?? "✦"}</span>
    </div>
  );
}

function romanize(n: number) {
  const map: [number, string][] = [
    [10, "X"],
    [9, "IX"],
    [5, "V"],
    [4, "IV"],
    [1, "I"],
  ];
  let out = "";
  let v = n;
  for (const [num, sym] of map) {
    while (v >= num) {
      out += sym;
      v -= num;
    }
  }
  return out;
}

function PoemCard({
  poem,
  index,
  registerRef,
}: {
  poem: Poem;
  index: number;
  registerRef: (i: number, el: HTMLElement | null) => void;
}) {
  const { ref, visible } = useReveal<HTMLElement>();
  const lines = poem.content.split("\n");

  return (
    <article
      id={`poem-${index + 1}`}
      ref={(el) => {
        ref.current = el;
        registerRef(index, el);
      }}
      data-visible={visible}
      className="fade-rise paper-card relative mx-auto w-full max-w-2xl scroll-mt-28 rounded-lg px-7 py-12 sm:px-14 sm:py-16"
    >
      <img
        src={tulipSprig}
        alt=""
        aria-hidden="true"
        loading="lazy"
        width={768}
        height={768}
        className="pointer-events-none absolute -top-8 right-2 w-14 opacity-60 sm:-top-10 sm:right-6 sm:w-24"
      />
      <p className="text-center font-display text-xs tracking-[0.4em] text-muted-foreground uppercase">
        {romanize(index + 1)}
      </p>
      <h3 className="mt-4 text-center font-display text-3xl leading-tight text-ink sm:text-4xl">
        {poem.title}
      </h3>
      <div className="mx-auto mt-6 h-px w-16 bg-border" />
      <div className="mt-8 space-y-2 text-center font-body text-lg leading-loose sm:text-xl">
        {lines.map((line, i) => (
          <p key={i} className={line.trim() === "" ? "h-4" : undefined}>
            {line}
          </p>
        ))}
      </div>
    </article>
  );
}

export function Keepsake() {
  const closing = useReveal<HTMLDivElement>();
  const cardRefs = useRef<(HTMLElement | null)[]>([]);
  const [active, setActive] = useState(0);
  const [inPoems, setInPoems] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  const registerRef = useCallback((i: number, el: HTMLElement | null) => {
    cardRefs.current[i] = el;
  }, []);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        const seen = entries
          .filter((e) => e.isIntersecting)
          .map((e) => cardRefs.current.indexOf(e.target as HTMLElement))
          .filter((i) => i >= 0);
        if (seen.length) {
          setActive(Math.min(...seen));
          setInPoems(true);
        } else {
          setInPoems(false);
        }
      },
      { threshold: 0.25 },
    );
    for (const el of cardRefs.current) if (el) io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 500);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const goTo = useCallback((i: number) => {
    const clamped = Math.max(0, Math.min(allPoems.length - 1, i));
    cardRefs.current[clamped]?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  return (
    <main className="relative overflow-x-hidden">
      {/* Hero */}
      <section className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden px-6 py-24 text-center">
        <img
          src={tulipsCorner}
          alt="Soft pink and white tulips"
          width={1200}
          height={1200}
          className="pointer-events-none absolute -top-10 -left-20 z-0 w-40 opacity-45 sm:-top-6 sm:-left-10 sm:w-64 sm:opacity-80 lg:w-[24rem]"
        />
        <img
          src={tulipsCorner}
          alt=""
          aria-hidden="true"
          loading="lazy"
          width={1200}
          height={1200}
          className="pointer-events-none absolute -right-20 -bottom-10 z-0 w-40 -scale-x-100 -scale-y-100 opacity-45 sm:-right-10 sm:-bottom-6 sm:w-64 sm:opacity-80 lg:w-[24rem]"
        />

        <div className="relative z-10 mx-auto max-w-xl">
          <p className="font-display text-sm tracking-[0.45em] text-muted-foreground uppercase">
            For Aashi, my love
          </p>
          <h1 className="mt-6 font-display text-4xl leading-tight text-ink italic sm:text-5xl">
            Happy Birthday Aashi!
          </h1>
          <p className="mt-5 font-body text-base leading-loose text-foreground/90 sm:text-lg">
            As you turn 22, may your dreams come true, and may you achieve
            everything your heart hopes for.
          </p>
          <div className="mt-8">
            <Ornament label="✦" />
          </div>
          <p className="mt-6 font-display text-3xl leading-[1.15] text-ink italic sm:text-4xl">
            Twenty-two poems for you
          </p>
          <div className="mt-8">
            <Ornament label="✦" />
          </div>
          <p className="mt-8 font-body text-lg leading-loose text-foreground/90 sm:text-xl">
            I gathered one poem for each year, my love, with a little piece of us held in
            each one.
          </p>

          <a
            href="#poems"
            className="mt-12 inline-flex items-center gap-3 rounded-full border border-border bg-card/70 px-8 py-3 font-display text-base tracking-[0.2em] text-ink uppercase transition-colors duration-500 hover:bg-secondary"
          >
            Begin reading
          </a>
        </div>
      </section>

      {/* Poems */}
      <section id="poems" className="scroll-mt-8 px-6 pt-10 pb-24">
        <div className="mx-auto max-w-2xl text-center">
          <Ornament label="The Poems" />
          <p className="mt-6 font-body text-base text-muted-foreground italic">
            Read them slowly, one page at a time, or turn straight to any of them.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
            {allPoems.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => goTo(i)}
                aria-label={`Go to poem ${i + 1}`}
                className="h-8 w-8 rounded-full border border-border font-display text-xs text-muted-foreground transition-colors duration-300 hover:bg-secondary aria-[current=true]:bg-secondary aria-[current=true]:text-ink"
                aria-current={active === i}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-20 sm:gap-28">
          {allPoems.map((poem, i) => (
            <PoemCard key={i} poem={poem} index={i} registerRef={registerRef} />
          ))}
        </div>
      </section>

      {/* Page turner */}
      <div
        className="pointer-events-none fixed inset-x-0 bottom-5 z-20 flex justify-center px-6 transition-opacity duration-500"
        style={{ opacity: inPoems ? 1 : 0 }}
      >
        <div className="pointer-events-auto flex items-center gap-3 rounded-full border border-border bg-card/90 px-3 py-2 shadow-sm backdrop-blur">
          <button
            type="button"
            onClick={() => goTo(active - 1)}
            disabled={active === 0}
            className="rounded-full px-3 py-1 font-display text-sm tracking-widest text-ink uppercase transition-colors hover:bg-secondary disabled:opacity-35"
          >
            ← Back
          </button>
          <span className="font-display text-xs tracking-[0.3em] text-muted-foreground">
            {romanize(active + 1)}
          </span>
          <button
            type="button"
            onClick={() => goTo(active + 1)}
            disabled={active === allPoems.length - 1}
            className="rounded-full px-3 py-1 font-display text-sm tracking-widest text-ink uppercase transition-colors hover:bg-secondary disabled:opacity-35"
          >
            Next →
          </button>
        </div>
      </div>

      <button
        type="button"
        aria-label="Scroll to top"
        title="Scroll to top"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className={`fixed right-5 bottom-5 z-20 flex h-11 w-11 items-center justify-center rounded-full border border-border bg-card/90 text-ink shadow-sm backdrop-blur transition-all duration-500 hover:bg-secondary sm:right-8 sm:bottom-8 ${showScrollTop ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-3 opacity-0"}`}
      >
        <ArrowUp size={18} strokeWidth={1.5} aria-hidden="true" />
      </button>

      {/* Closing */}
      <section className="relative px-6 pt-8 pb-32">
        <img
          src={tulipSprig}
          alt=""
          aria-hidden="true"
          loading="lazy"
          width={768}
          height={768}
          className="pointer-events-none absolute top-0 left-2 z-0 w-14 -rotate-12 opacity-45 sm:left-16 sm:w-28 sm:opacity-60"
        />
        <img
          src={tulipSprig}
          alt=""
          aria-hidden="true"
          loading="lazy"
          width={768}
          height={768}
          className="pointer-events-none absolute right-2 bottom-10 z-0 w-14 rotate-12 opacity-45 sm:right-16 sm:w-28 sm:opacity-60"
        />
        <div
          ref={closing.ref}
          data-visible={closing.visible}
          className="fade-rise relative z-10 mx-auto max-w-xl text-center"
        >
          <Ornament label="✦" />
          <p className="mt-10 font-display text-3xl leading-snug text-ink italic sm:text-4xl">
            A little something to keep
          </p>
          <p className="mt-8 font-body text-lg leading-loose text-foreground/90">
            For the quiet days, the late nights, and all the moments still waiting for
            you.
          </p>
          <p className="mt-10 font-display text-xl italic text-muted-foreground">
            With all my love, happy birthday.
          </p>
        </div>
      </section>
    </main>
  );
}
