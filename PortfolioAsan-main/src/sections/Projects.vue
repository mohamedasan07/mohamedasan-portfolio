<template>
  <section
    id="projects"
    ref="projectsSection"
    class="projects-section"
  >
    <!-- Section header -->
    <div ref="headerRef" class="projects-header">
      <div class="projects-header-line projects-header-line-left"></div>
      <span class="projects-header-label">Featured Work</span>
      <div class="projects-header-line projects-header-line-right"></div>
    </div>

    <!-- Featured project card -->
    <div
      ref="cardRef"
      class="featured-card"
      :class="{ 'is-hovered': isHovered }"
      @mouseenter="isHovered = true"
      @mouseleave="isHovered = false"
    >
      <!-- Image side -->
      <div class="featured-card-image-wrap" aria-hidden="true">
        <div class="featured-card-image-inner">
          <img
  :src="chronosguardImg"
            alt="ChronosGuard – Blockchain IP Protection Platform"
            class="featured-card-img"
            loading="lazy"
            decoding="async"
          />
          <div class="featured-card-image-overlay"></div>
        </div>
        <!-- Floating index badge -->
        <div class="featured-card-index" aria-hidden="true">
          <span class="featured-card-index-num">_01.</span>
        </div>
      </div>

      <!-- Content side -->
      <div class="featured-card-content">
        <div class="featured-card-meta">
          <span class="featured-card-type">Blockchain · IP Protection</span>
        </div>

        <h3 class="featured-card-title">
          <span class="featured-card-title-base">ChronosGuard</span>
        </h3>

        <p class="featured-card-desc">
          A blockchain-powered web application that enables creators to securely
          register, verify, and protect digital assets using immutable ownership
          records — focused on digital copyright protection and ownership
          verification.
        </p>

        <div class="featured-card-tags" aria-label="Tech stack">
          <span class="featured-tag">HTML</span>
          <span class="featured-tag">CSS</span>
          <span class="featured-tag">JavaScript</span>
          <span class="featured-tag">Vue.js</span>
          <span class="featured-tag">Blockchain</span>
          <span class="featured-tag">IPFS</span>
        </div>

        <a
          href="https://chimerical-parfait-c2be34.netlify.app"
          target="_blank"
          rel="noopener noreferrer"
          class="featured-card-cta"
          aria-label="View ChronosGuard live demo"
        >
          <span class="featured-cta-text">View Live</span>
          <span class="featured-cta-arrow" aria-hidden="true">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M7 17L17 7"/>
              <path d="M7 7h10v10"/>
            </svg>
          </span>
        </a>
      </div>
    </div>
  </section>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from 'vue';
import chronosguardImg from "@/assets/projects/chronosguard.jpeg";

const projectsSection = ref(null);
const headerRef = ref(null);
const cardRef = ref(null);
const isHovered = ref(false);

let projectsTimeline = null;

onMounted(async () => {
  const [{ default: gsap }, { ScrollTrigger }] = await Promise.all([
    import('gsap'),
    import('gsap/ScrollTrigger'),
  ]);
  gsap.registerPlugin(ScrollTrigger);

  const sectionEl = projectsSection.value;
  const header = headerRef.value;
  const card = cardRef.value;

  if (!sectionEl || !header || !card) return;

  const headerLines = header.querySelectorAll('.projects-header-line');
  const headerLabel = header.querySelector('.projects-header-label');
  const imageWrap = card.querySelector('.featured-card-image-wrap');
  const content = card.querySelector('.featured-card-content');

  // Initial states
  gsap.set(headerLines, { scaleX: 0 });
  if (headerLines[0]) gsap.set(headerLines[0], { transformOrigin: 'right center' });
  if (headerLines[1]) gsap.set(headerLines[1], { transformOrigin: 'left center' });
  gsap.set(headerLabel, { opacity: 0, y: 8 });
  gsap.set(imageWrap, { opacity: 0, x: -40, clipPath: 'inset(0 100% 0 0)' });
  gsap.set(content, { opacity: 0, x: 40 });

  projectsTimeline = gsap.timeline({
    scrollTrigger: {
      trigger: sectionEl,
      start: 'top 62%',
      toggleActions: 'play none none none',
    },
  });

  projectsTimeline
    .to(headerLines, {
      scaleX: 1,
      duration: 0.9,
      ease: 'power2.inOut',
      stagger: 0.06,
    })
    .to(headerLabel, {
      opacity: 1,
      y: 0,
      duration: 0.7,
      ease: 'power3.out',
    }, 0.25)
    .to(imageWrap, {
      opacity: 1,
      x: 0,
      clipPath: 'inset(0 0% 0 0)',
      duration: 1.1,
      ease: 'expo.out',
    }, 0.45)
    .to(content, {
      opacity: 1,
      x: 0,
      duration: 0.9,
      ease: 'power3.out',
    }, 0.65);
});

onUnmounted(() => {
  if (projectsTimeline) {
    if (projectsTimeline.scrollTrigger) projectsTimeline.scrollTrigger.kill();
    projectsTimeline.kill();
    projectsTimeline = null;
  }
});
</script>

<style scoped>
/* ─── Section wrapper ─────────────────────────────────────── */
.projects-section {
  position: relative;
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 clamp(1rem, 5vw, 4rem) clamp(5rem, 10vw, 9rem);
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
}

/* ─── Header ─────────────────────────────────────────────── */
.projects-header {
  display: flex;
  align-items: center;
  gap: 1.75rem;
  margin-bottom: clamp(2.5rem, 5vw, 4rem);
}

.projects-header-line {
  flex: 1;
  height: 1px;
  background: var(--project-border-color);
}

.projects-header-label {
  font-size: clamp(0.7rem, 1.4vw, 0.85rem);
  font-weight: 700;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--theme-text-muted);
  white-space: nowrap;
  flex-shrink: 0;
}

/* ─── Featured card ──────────────────────────────────────── */
.featured-card {
  display: grid;
  grid-template-columns: 0.97fr 1.03fr;
  gap: clamp(2.5rem, 4vw, 3.5rem);
  align-items: center;
  background: var(--card-bg);
  border: 1px solid var(--card-border);
  border-radius: 20px;
  padding: clamp(1.2rem, 2.5vw, 2rem) clamp(1.5rem, 3vw, 2.5rem);
  transition: border-color 0.4s ease, box-shadow 0.4s ease, transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: default;
  will-change: transform, box-shadow;
}

.featured-card.is-hovered {
  border-color: var(--card-border-hover);
  box-shadow: var(--card-shadow-hover);
  transform: translateY(-4px);
}

/* ─── Image side ─────────────────────────────────────────── */
.featured-card-image-wrap {
  position: relative;
  border-radius: 14px;
  overflow: hidden;
  aspect-ratio: 16 / 14;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.28);
}

.featured-card-image-inner {
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.featured-card-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: transform 0.8s cubic-bezier(0.4, 0, 0.2, 1);
  will-change: transform;
}

.featured-card.is-hovered .featured-card-img {
  transform: scale(1.055);
}

.featured-card-image-overlay {
  position: absolute;
  inset: 0;
  background: var(--card-img-overlay);
  transition: opacity 0.4s ease;
  pointer-events: none;
}

.featured-card.is-hovered .featured-card-image-overlay {
  opacity: 0.6;
}

/* Index badge */
.featured-card-index {
  position: absolute;
  top: 1rem;
  left: 1.1rem;
  z-index: 10;
}

.featured-card-index-num {
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  color: rgba(255, 255, 255, 0.72);
  text-shadow: 0 1px 6px rgba(0, 0, 0, 0.45);
}

/* ─── Content side ───────────────────────────────────────── */
.featured-card-content {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  padding: clamp(0.5rem, 2vw, 1rem) 0;
}

.featured-card-meta {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.featured-card-type {
  font-size: clamp(0.72rem, 1.1vw, 0.8rem);
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--project-meta-color);
  padding: 0.3rem 0.85rem;
  border: 1px solid var(--card-tag-border);
  border-radius: 999px;
  background: var(--card-tag-bg);
}

.featured-card-title {
  margin: 0;
  line-height: 1.0;
  font-size: clamp(2.4rem, 5.5vw, 4rem);
  font-weight: 900;
  letter-spacing: -0.025em;
  display: flex;
  flex-direction: column;
}

.featured-card-title-base {
  background: linear-gradient(
    to bottom,
    var(--theme-headline-from),
    var(--theme-headline-via),
    var(--theme-headline-to)
  );
  color: transparent;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  -webkit-background-clip: text;
  backface-visibility: hidden;
  transform: translateZ(0);
}

.featured-card-desc {
  margin: 0;
  font-size: clamp(0.9rem, 1.4vw, 1.05rem);
  line-height: 1.78;
  color: var(--project-meta-color);
  max-width: 520px;
}

/* ─── Tech tags ──────────────────────────────────────────── */
.featured-card-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.featured-tag {
  font-size: clamp(0.68rem, 1vw, 0.78rem);
  font-weight: 600;
  letter-spacing: 0.08em;
  color: var(--project-meta-color);
  padding: 0.28rem 0.75rem;
  border-radius: 999px;
  background: var(--card-tag-bg);
  border: 1px solid var(--card-tag-border);
  transition: background 0.2s ease, color 0.2s ease, border-color 0.2s ease;
}

.featured-card.is-hovered .featured-tag {
  border-color: var(--card-tag-border-hover);
  background: var(--card-tag-bg-hover);
  color: var(--project-title-color);
}

/* ─── CTA button ─────────────────────────────────────────── */
.featured-card-cta {
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  width: fit-content;
  text-decoration: none;
  font-size: clamp(0.82rem, 1.3vw, 0.95rem);
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--theme-cta-text);
  background: var(--theme-cta-bg);
  padding: 0.75rem 1.75rem;
  border-radius: 999px;
  border: 1.5px solid transparent;
  transition: background 0.3s ease, color 0.3s ease, border-color 0.3s ease,
              transform 0.25s cubic-bezier(0.4, 0, 0.2, 1),
              box-shadow 0.3s ease;
  margin-top: -0.375rem;
}

.featured-card-cta:hover,
.featured-card-cta:focus-visible {
  background: transparent;
  color: var(--project-title-color);
  border-color: var(--project-border-color);
  transform: translateX(3px);
  box-shadow: 0 4px 18px rgba(0, 0, 0, 0.12);
  outline: none;
}

.featured-cta-arrow {
  display: inline-flex;
  align-items: center;
  transition: transform 0.25s cubic-bezier(0.4, 0, 0.2, 1);
}

.featured-card-cta:hover .featured-cta-arrow,
.featured-card-cta:focus-visible .featured-cta-arrow {
  transform: translate(3px, -3px);
}

/* ─── Theme tokens ───────────────────────────────────────── */
:global([data-theme="dark"]) {
  --project-border-color: rgba(255, 255, 255, 0.13);
  --project-title-color: #f2f0ea;
  --project-meta-color: rgba(242, 240, 234, 0.65);
  --project-hover-color: #354F52;
  --card-bg: rgba(255, 255, 255, 0.032);
  --card-border: rgba(255, 255, 255, 0.08);
  --card-border-hover: rgba(255, 255, 255, 0.22);
  --card-shadow-hover: 0 32px 80px rgba(0, 0, 0, 0.55), 0 0 0 1px rgba(255, 255, 255, 0.07);
  --card-img-overlay: linear-gradient(135deg, rgba(0, 0, 0, 0.18) 0%, rgba(0, 0, 0, 0.04) 100%);
  --card-tag-bg: rgba(255, 255, 255, 0.055);
  --card-tag-border: rgba(255, 255, 255, 0.1);
  --card-tag-bg-hover: rgba(255, 255, 255, 0.1);
  --card-tag-border-hover: rgba(255, 255, 255, 0.22);
}

:global([data-theme="light"]) {
  --project-border-color: rgba(15, 23, 42, 0.14);
  --project-title-color: var(--theme-text-strong);
  --project-meta-color: var(--theme-text-muted);
  --project-hover-color: #18969E;
  --card-bg: rgba(255, 255, 255, 0.55);
  --card-border: rgba(15, 23, 42, 0.09);
  --card-border-hover: rgba(15, 23, 42, 0.22);
  --card-shadow-hover: 0 28px 70px rgba(0, 0, 0, 0.14), 0 0 0 1px rgba(15, 23, 42, 0.08);
  --card-img-overlay: linear-gradient(135deg, rgba(0, 0, 0, 0.08) 0%, rgba(0, 0, 0, 0.02) 100%);
  --card-tag-bg: rgba(15, 23, 42, 0.04);
  --card-tag-border: rgba(15, 23, 42, 0.1);
  --card-tag-bg-hover: rgba(15, 23, 42, 0.08);
  --card-tag-border-hover: rgba(15, 23, 42, 0.2);
}

/* Fallback */
:root {
  --project-border-color: rgba(255, 255, 255, 0.13);
  --project-title-color: var(--theme-text-strong);
  --project-meta-color: var(--theme-text-muted);
  --card-bg: rgba(255, 255, 255, 0.04);
  --card-border: rgba(255, 255, 255, 0.08);
  --card-border-hover: rgba(255, 255, 255, 0.22);
  --card-shadow-hover: 0 32px 80px rgba(0, 0, 0, 0.5);
  --card-img-overlay: linear-gradient(135deg, rgba(0, 0, 0, 0.15) 0%, rgba(0, 0, 0, 0.04) 100%);
  --card-tag-bg: rgba(255, 255, 255, 0.055);
  --card-tag-border: rgba(255, 255, 255, 0.1);
  --card-tag-bg-hover: rgba(255, 255, 255, 0.1);
  --card-tag-border-hover: rgba(255, 255, 255, 0.22);
}

/* ─── Responsive ─────────────────────────────────────────── */
@media (max-width: 900px) {
  .featured-card {
    grid-template-columns: 1fr;
    gap: clamp(1.25rem, 3vw, 2rem);
  }

  .featured-card-image-wrap {
    aspect-ratio: 16 / 9;
  }

  .featured-card-title {
    font-size: clamp(2rem, 7vw, 3rem);
  }

  .featured-card-desc {
    max-width: 100%;
  }
}

@media (max-width: 600px) {
  .projects-section {
    padding: 0 1rem clamp(4rem, 12vw, 6rem);
  }

  .projects-header {
    gap: 1rem;
    margin-bottom: 2rem;
  }

  .featured-card {
    padding: 1.1rem;
    border-radius: 16px;
  }

  .featured-card-image-wrap {
    border-radius: 10px;
  }

  .featured-card-content {
    gap: 1rem;
  }

  .featured-card-title {
    font-size: clamp(1.8rem, 9vw, 2.5rem);
  }
}

/* ─── Reduced motion ─────────────────────────────────────── */
@media (prefers-reduced-motion: reduce) {
  .featured-card,
  .featured-card-img,
  .featured-card-cta,
  .featured-cta-arrow,
  .featured-tag {
    transition: none !important;
  }
}
</style>
