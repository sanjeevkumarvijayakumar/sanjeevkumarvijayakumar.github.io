import React, { useState, useCallback, useEffect } from "react";

export default function ProjectCarouselBasic({ slides = [], ariaLabel = "Projects" }) {
  const [index, setIndex] = useState(0);
  const count = slides.length;

  const goTo = useCallback((i) => setIndex(Math.max(0, Math.min(i, count - 1))), [count]);
  const prev = useCallback(() => goTo(index - 1), [goTo, index]);
  const next = useCallback(() => goTo(index + 1), [goTo, index]);

  // Keep index valid if slides change dynamically
  useEffect(() => {
    if (index > count - 1) setIndex(Math.max(0, count - 1));
  }, [count, index]);

  const onKeyDown = (e) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      prev();
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      next();
    }
  };

  return (
    <section
      className="w-full max-w-5xl mx-auto"
      role="region"
      aria-roledescription="carousel"
      aria-label={ariaLabel}
    >
      <div className="flex justify-end mb-2 text-sm text-slate-600" aria-live="polite">
        <span>Slide {Math.min(index + 1, count)} of {count}</span>
      </div>

      <div
        className="relative overflow-hidden rounded-xl bg-white shadow-sm"
        tabIndex={0}
        onKeyDown={onKeyDown}
      >
        <div
          className="flex transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {slides.map((s, i) => (
            <article
              key={i}
              className="min-w-full p-4"
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${count}`}
              aria-hidden={i === index ? "false" : "true"}
            >
              {s.image && (
                <img
                  className="w-full h-64 object-cover rounded-lg bg-slate-100"
                  src={s.image.src}
                  alt={s.image.alt || s.title || `Slide ${i + 1}`}
                  loading="lazy"
                />
              )}

              <div className="pt-3">
                {s.title && <h3 className="text-xl font-semibold">{s.title}</h3>}
                {s.subtitle && <p className="text-slate-600 mt-0.5">{s.subtitle}</p>}
                {s.content && <p className="mt-2 leading-relaxed">{s.content}</p>}
                {Array.isArray(s.tags) && s.tags.length > 0 && (
                  <ul className="flex gap-2 flex-wrap list-none p-0 mt-3">
                    {s.tags.map((t, idx) => (
                      <li key={idx} className="px-3 py-1 rounded-full bg-slate-200 text-slate-800 text-xs">
                        {t}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>

      <div className="flex justify-center gap-2 mt-3">
        <button
          type="button"
          onClick={prev}
          aria-label="Previous slide"
          disabled={index === 0}
          className="w-10 h-9 rounded-md border border-slate-300 bg-white text-slate-900 text-lg disabled:opacity-40"
        >
          ‹
        </button>
        <button
          type="button"
          onClick={next}
          aria-label="Next slide"
          disabled={index === count - 1}
          className="w-10 h-9 rounded-md border border-slate-300 bg-white text-slate-900 text-lg disabled:opacity-40"
        >
          ›
        </button>
      </div>

      <div className="flex justify-center gap-2 mt-2" role="tablist" aria-label="Slide selector">
        {slides.map((_, i) => (
          <button
            key={i}
            role="tab"
            aria-selected={i === index}
            aria-controls={`slide-${i + 1}`}
            onClick={() => goTo(i)}
            title={`Go to slide ${i + 1}`}
            className={`w-2.5 h-2.5 rounded-full ${i === index ? "bg-slate-600" : "bg-slate-300"}`}
          />
        ))}
      </div>
    </section>
  );
}