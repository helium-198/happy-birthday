import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";

import poems from "@/data/poems.json";
import tulipsCorner from "@/assets/tulips-corner.png";
import tulipSprig from "@/assets/tulip-sprig.png";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Twenty-Two Poems — A Birthday Keepsake" },
      {
        name: "description",
        content:
          "A quiet little book of twenty-two poems, written for her twenty-second birthday, among pink and white tulips.",
      },
      { property: "og:title", content: "Twenty-Two Poems — A Birthday Keepsake" },
      {
        property: "og:description",
        content:
          "A quiet little book of twenty-two poems, written for her twenty-second birthday, among pink and white tulips.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Keepsake,
});

type Poem = { title: string; content: string };

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

function PoemCard({ poem, index }: { poem: Poem; index: number }) {
  const { ref, visible } = useReveal<HTMLElement>();
  const lines = poem.content.split("\n");

  return (
    <article
      ref={ref}
      data-visible={visible}
      className="fade-rise paper-card relative mx-auto w-full max-w-2xl rounded-lg px-7 py-12 sm:px-14 sm:py-16"
    >
      <img
        src={tulipSprig}
        alt=""
        aria-hidden="true"
        loading="lazy"
        width={768}
        height={768}
        className="pointer-events-none absolute -top-8 right-2 w-16 opacity-70 sm:-top-10 sm:right-6 sm:w-24"
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

function Keepsake() {
  const closing = useReveal<HTMLDivElement>();

  return (
    <main className="relative overflow-x-hidden">
      {/* Hero */}
      <section className="relative flex min-h-[100svh] flex-col items-center justify-center px-6 py-24 text-center">
        <img
          src={tulipsCorner}
          alt="Soft pink and white tulips"
          width={1200}
          height={1200}
          className="pointer-events-none absolute -top-6 -left-16 w-64 opacity-90 sm:-left-8 sm:w-80 lg:w-[26rem]"
        />
        <img
          src={tulipsCorner}
          alt=""
          aria-hidden="true"
          loading="lazy"
          width={1200}
          height={1200}
          className="pointer-events-none absolute -right-16 -bottom-6 w-64 -scale-x-100 -scale-y-100 opacity-90 sm:-right-8 sm:w-80 lg:w-[26rem]"
        />

        <div className="relative z-10 mx-auto max-w-xl">
          <p className="font-display text-sm tracking-[0.45em] text-muted-foreground uppercase">
            For you, on your twenty-second
          </p>
          <p className="mt-6 font-display text-4xl leading-tight text-ink italic sm:text-5xl">
            Happy birthday, my love.
          </p>
          <p className="mt-5 font-body text-base leading-loose text-foreground/90 sm:text-lg">
            I hope today is soft and slow and full of everything you like — good light,
            good tea, tulips somewhere. I'm so glad you were born, and so glad it's you I
            get to tell that to.
          </p>
          <div className="mt-8">
            <Ornament label="✦" />
          </div>
          <h1 className="mt-6 font-display text-5xl leading-[1.05] text-ink italic sm:text-6xl lg:text-7xl">
            Twenty-two poems,
            <br />
            one for every year
          </h1>
          <div className="mt-8">
            <Ornament label="✦" />
          </div>
          <p className="mt-8 font-body text-lg leading-loose text-foreground/90 sm:text-xl">
            I kept writing these on ordinary nights — after our calls, in the middle of
            small thoughts about you. Nothing grand, just the things I already tell you,
            put somewhere they can stay. Twenty-two of them, and tulips, because they're
            yours.
          </p>
          <p className="mt-6 font-display text-xl italic text-muted-foreground">
            Happy birthday, my love.
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
            Take them slowly — a page at a time.
          </p>
        </div>

        <div className="mt-16 flex flex-col gap-20 sm:gap-28">
          {(poems as Poem[]).map((poem, i) => (
            <PoemCard key={i} poem={poem} index={i} />
          ))}
        </div>
      </section>

      {/* Closing */}
      <section className="relative px-6 pt-8 pb-32">
        <img
          src={tulipSprig}
          alt=""
          aria-hidden="true"
          loading="lazy"
          width={768}
          height={768}
          className="pointer-events-none absolute top-0 left-4 w-20 -rotate-12 opacity-60 sm:left-16 sm:w-28"
        />
        <img
          src={tulipSprig}
          alt=""
          aria-hidden="true"
          loading="lazy"
          width={768}
          height={768}
          className="pointer-events-none absolute right-4 bottom-10 w-20 rotate-12 opacity-60 sm:right-16 sm:w-28"
        />
        <div
          ref={closing.ref}
          data-visible={closing.visible}
          className="fade-rise relative mx-auto max-w-xl text-center"
        >
          <Ornament label="✦" />
          <p className="mt-10 font-display text-3xl leading-snug text-ink italic sm:text-4xl">
            That's all of them — for now.
          </p>
          <p className="mt-8 font-body text-lg leading-loose text-foreground/90">
            I'll keep writing. You already know most of this; you've heard it in my voice
            late at night. But I wanted you to have it somewhere you can come back to on
            a quiet day, when you need to be reminded how loved you are.
          </p>
          <p className="mt-10 font-display text-xl italic text-muted-foreground">
            Yours, always — and a very happy twenty-two.
          </p>
        </div>
      </section>
    </main>
  );
}
