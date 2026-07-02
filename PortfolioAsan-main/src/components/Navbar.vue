<template>
  <div>
    <nav
      :class="[
        'absolute top-0 left-0 z-[90] w-full p-5 text-[color:var(--theme-text-strong)] transition-all duration-300',
        'lg:px-28 px-5',
        'bg-transparent',
        hasShadow ? '' : 'shadow-none',
        isReady ? 'lg:translate-y-0 lg:opacity-100' : 'lg:-translate-y-8 lg:opacity-0'
      ]"
    >
      <div class="container mx-auto">
        <div class="relative flex items-center lg:grid lg:grid-cols-3 lg:items-center">
          <!-- Logo -->
          <div
            v-if="!isProjectPage"
            :class="[
              'flex w-fit items-center gap-1 cursor-pointer origin-center transition-all duration-300 hover:scale-103 active:scale-95 lg:justify-self-start',
              'opacity-100',
              isOpen ? 'lg:static fixed left-5 top-5 z-[101]' : 'lg:static'
            ]"
            @click="handleLogoClick"
          >
            <img
              :src="isDark ? mdWhite : mdBlack"
              alt="MD Logo"
              class="h-11 w-auto lg:h-11"
              loading="eager"
            />
            <img
              :src="isDark ? asanWhite : asanBlack"
              alt="Aman Logo"
              class="h-8 w-auto lg:h-8"
              loading="eager"
            />
          </div>

          <!-- Desktop nav -->
          <div v-if="!isProjectPage" class="hidden lg:block lg:justify-self-center">
            <ul class="flex items-center gap-x-8 font-semibold text-[15px] lg:text-[16px]">
              <li
                v-for="item in sections"
                :key="item.id"
                class="group"
              >
                <button
                  class="nav-link text-[16.5px] lg:text-[17.5px] tracking-wide font-semibold hover:text-[color:var(--theme-text-hover)] transition-colors cursor-pointer"
                  @click="scrollToSection(item.targetId ?? item.id)"
                >
                  {{ item.label }}
                </button>
                <span class="nav-underline mt-1 block h-[2.5px] w-0 bg-[color:var(--theme-text-strong)] transition-all duration-300 group-hover:w-full"></span>
              </li>
            </ul>
          </div>

          <!-- Desktop resume + mobile toggle -->
          <div class="ml-auto flex items-center gap-3 lg:ml-0 lg:justify-self-end">
            <!-- Language Switcher -->

            <!-- Desktop Resume (capsule) -->
            <label v-if="!isProjectPage" class="ui-switch hidden lg:inline-flex mr-5 desktop-switch">
              <input v-model="isDark" type="checkbox" aria-label="Toggle theme" />
              <div class="slider">
                <div class="circle"></div>
              </div>
            </label>

            <a
              v-if="!isProjectPage"
              href="/Mohamed_Asan_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              class="resume-capsule hidden lg:inline-flex"
            >
              <span class="resume-capsule-text">{{ t('nav.resume') }}</span>
            </a>

            <!-- Mobile menu toggle - Lottie Hamburger -->
          </div>
        </div>
      </div>
    </nav>

    <button
      class="fixed top-5 right-[clamp(1.5rem,5vw,4rem)] z-[100] scale-110 cursor-pointer hamburger-btn"
      :class="isProjectPage ? '' : 'lg:hidden'"
      @click="toggleMenu"
      aria-label="Toggle menu"
      :aria-expanded="isOpen"
    >
      <div ref="menuIconEl" class="w-8 h-8 hamburger-icon" :class="{ 'is-hidden': !hasMenuAnim }"></div>
      <svg
        v-if="!hasMenuAnim"
        class="hamburger-fallback"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path d="M4 7h16M4 12h16M4 17h16" />
      </svg>
    </button>

    <!-- Expanding Circle Overlay - Dark Theme -->
    <div
      :class="[
        'fixed z-[55] rounded-full pointer-events-none menu-circle-bg',
        isProjectPage ? '' : 'lg:hidden',
        isOpen ? 'menu-circle-open' : 'menu-circle-closed'
      ]"
      :style="{
        top: 'calc(1.25rem + 20px)',
        right: 'calc(1.25rem + 20px)',
        width: '300vmax',
        height: '300vmax'
      }"
    ></div>

    <!-- Mobile Menu -->
    <div
      :class="[
        'fixed top-0 right-0 w-full h-screen z-[56] flex items-center justify-center text-[color:var(--theme-text-muted)]',
        isProjectPage ? '' : 'lg:hidden',
        isOpen ? 'pointer-events-auto' : 'pointer-events-none'
      ]"
    >
      <div
        :class="[
          'mobile-menu-bg',
          isOpen ? 'opacity-100' : 'opacity-0'
        ]"
        :style="{
          transition: isOpen ? 'opacity 0.4s ease-out' : 'opacity 0.2s ease-in'
        }"
        aria-hidden="true"
      >
        <div ref="menuBgEl" class="mobile-menu-lottie"></div>
        <div class="mobile-menu-overlay"></div>
      </div>

      <ul class="relative z-10 flex flex-col gap-8 text-center">
        <li
          v-for="(item, index) in mobileSections"
          :key="item.id"
          class="menu-item-animate"
          :class="[
            isOpen ? 'menu-item-visible' : 'menu-item-hidden'
          ]"
          :style="{
            transitionDelay: isOpen ? `${200 + (index * 60)}ms` : '0ms'
          }"
        >
          <button
            @click="scrollToSection(item.targetId ?? item.id)"
            class="mobile-nav-link text-[28px] font-light tracking-[0.18em] text-[color:var(--theme-text-muted)] hover:text-[color:var(--theme-text-strong)] transition-colors duration-200 transition-transform hover:scale-105 cursor-pointer"
          >
            {{ item.label }}
          </button>
        </li>

        <!-- Mobile Resume (capsule) -->
        <li
          class="menu-item-animate mt-6"
          :class="[
            isOpen ? 'menu-item-visible' : 'menu-item-hidden'
          ]"
          :style="{
            transitionDelay: isOpen ? `${200 + (mobileSections.length * 60)}ms` : '0ms'
          }"
        >
          <a
            v-if="!isProjectPage"
            href="/Mohamed_Asan_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            class="resume-capsule resume-capsule-mobile"
          >
            <span class="resume-capsule-text">{{ t('nav.resume') }}</span>
          </a>
        </li>

        <!-- Mobile Theme Switch -->
        <li
          class="menu-item-animate mt-5"
          :class="[
            isOpen ? 'menu-item-visible' : 'menu-item-hidden'
          ]"
          :style="{
            transitionDelay: isOpen ? `${240 + (mobileSections.length * 60)}ms` : '0ms'
          }"
        >
          <div class="flex items-center justify-center gap-6">
            <!-- Mobile Language Switcher -->

            <label class="ui-switch inline-flex">
              <input v-model="isDark" type="checkbox" aria-label="Toggle theme" />
              <div class="slider">
                <div class="circle"></div>
              </div>
            </label>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { computed, inject, onBeforeUnmount, onMounted, ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute, useRouter } from 'vue-router';
import mdBlack from '../assets/md-black.jpeg';
import mdWhite from '../assets/md-white.jpeg';

import asanBlack from '../assets/asan-black.jpeg';
import asanWhite from '../assets/asan-white.jpeg';
import hamburgerAnim from '@/assets/lottie/hamburger.json';
import nightSky from '@/assets/lottie/night-sky.json';

const hasShadow = ref(false);
const isOpen = ref(false);
const isReady = ref(false);
const isDark = ref(true);

const mdLogoSrc = computed(() => (isDark.value ? mdWhite : mdBlack));
const asanLogoSrc = computed(() => (isDark.value ? asanWhite : asanBlack));

const sections = computed(() => [
  { id: 'about', label: t('nav.about') },
  { id: 'projects', label: t('nav.projects'), targetId: 'statement' },
  { id: 'contact', label: t('nav.contact') },
]);

const mobileSections = computed(() => [
  { id: 'home', label: t('nav.home'), targetId: 'home' },
  { id: 'about', label: t('nav.about'), targetId: 'about' },
  { id: 'projects', label: t('nav.projects'), targetId: 'statement' },
  { id: 'contact', label: t('nav.contact'), targetId: 'contact' },
]);

const menuIconEl = ref(null);
const menuBgEl = ref(null);
const hasMenuAnim = ref(false);
let menuAnim = null;
let menuBgAnim = null;
let endFrame = 0;

const themeKey = 'theme';

const { t, locale } = useI18n();
const router = useRouter();
const route = useRoute();
const isProjectPage = computed(() => route.name === 'project-progress' || route.path.startsWith('/projects'));
const startPageTransition = inject('startPageTransition', null);

const isJa = computed(() => locale.value === 'ja');

// Play icon animation on button click
const playIcon = (open) => {
  if (!menuAnim || endFrame <= 0) return;
  menuAnim.stop();
  menuAnim.playSegments(open ? [0, endFrame] : [endFrame, 0], true);
};

const applyTheme = () => {
  const theme = isDark.value ? 'dark' : 'light';
  const root = document.documentElement;

  root.classList.add('theme-switching');
  root.setAttribute('data-theme', theme);
  localStorage.setItem(themeKey, theme);

  window.setTimeout(() => {
    root.classList.remove('theme-switching');
  }, 60);
};

const handleScroll = () => {
  hasShadow.value = window.scrollY > 0;
};

const handleResize = () => {
  // close mobile menu if switching to desktop
  if (window.innerWidth >= 1024) {
    isOpen.value = false;
    if (menuAnim) {
      menuAnim.goToAndStop(0, true);
    }
  }
};

const toggleMenu = () => {
  const next = !isOpen.value;
  isOpen.value = next;
  // animate on click
  playIcon(next);
};

const handleLogoClick = () => {
  if (isOpen.value) {
    isOpen.value = false;
    playIcon(false);
  }
  scrollToSection('home');
};

const scrollToSection = (id) => {
  if (isProjectPage.value) {
    const navigate = () => {
      router.push({ name: 'home', query: { section: id } });
    };
    if (startPageTransition) {
      startPageTransition(navigate);
    } else {
      navigate();
    }
    if (isOpen.value) {
      isOpen.value = false;
      playIcon(false);
    }
    return;
  }

  const section = document.getElementById(id);
  if (!section) return;

  if (id === 'about') {
    const block = window.innerWidth < 1024 ? 'start' : 'center';
    section.scrollIntoView({ behavior: 'smooth', block });
    if (isOpen.value) {
      isOpen.value = false;
      playIcon(false);
    }
    return;
  }

  section.scrollIntoView({ behavior: 'smooth' });

  // close with animation
  if (isOpen.value) {
    isOpen.value = false;
    playIcon(false);
  }
};

onMounted(async () => {
  document.documentElement.setAttribute('lang', locale.value);

  const storedTheme = localStorage.getItem(themeKey);
  if (storedTheme === 'dark' || storedTheme === 'light') {
    isDark.value = storedTheme === 'dark';
  } else {
    isDark.value = true;
  }
  applyTheme();

  window.addEventListener('scroll', handleScroll, { passive: true });
  window.addEventListener('resize', handleResize, { passive: true });

  handleScroll();
  handleResize();

  requestAnimationFrame(() => {
    isReady.value = true;
  });

  const { default: lottie } = await import('lottie-web');

  menuAnim = lottie.loadAnimation({
    container: menuIconEl.value,
    renderer: 'svg',
    loop: false,
    autoplay: false,
    animationData: hamburgerAnim,
    rendererSettings: {
      progressiveLoad: false,
      hideOnTransparent: true,
    },
  });

  menuBgAnim = lottie.loadAnimation({
    container: menuBgEl.value,
    renderer: 'svg',
    loop: true,
    autoplay: false,
    animationData: nightSky,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
      progressiveLoad: true,
    },
  });

  menuBgAnim.setSpeed(0.8);

  menuAnim.setSubframe(true);
  menuAnim.setSpeed(2.2);

  const initMenuAnim = () => {
    if (hasMenuAnim.value) return;
    endFrame = Math.max(1, Math.floor(menuAnim.getDuration(true)) - 1);
    menuAnim.goToAndStop(0, true); // start closed
    hasMenuAnim.value = true;
  };

  menuAnim.addEventListener('DOMLoaded', initMenuAnim);
  menuAnim.addEventListener('data_ready', initMenuAnim);
});

watch(isDark, () => {
  applyTheme();
});

watch(isOpen, (open) => {
  if (!menuBgAnim) return;
  if (open) {
    menuBgAnim.play();
  } else {
    menuBgAnim.pause();
  }
});

onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll);
  window.removeEventListener('resize', handleResize);

  menuAnim?.destroy();
  menuAnim = null;

  menuBgAnim?.destroy();
  menuBgAnim = null;
});
</script>

<style scoped>
.hamburger-btn {
  -webkit-tap-highlight-color: transparent;
  touch-action: manipulation;
  transform: scale(1.1);
  contain: layout;
  color: var(--theme-text-soft);
}

.hamburger-btn:active {
  transform: scale(1);
}

.hamburger-icon {
  filter: none;
  position: relative;
  z-index: 100;
  contain: layout style;
  transform: translateZ(0);
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
}

.hamburger-icon :deep(path),
.hamburger-icon :deep(line),
.hamburger-icon :deep(rect),
.hamburger-icon :deep(circle) {
  stroke: var(--theme-text-soft) !important;
  fill: var(--theme-text-soft) !important;
}

.hamburger-icon.is-hidden {
  opacity: 0;
}

.hamburger-fallback {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  stroke: currentColor;
  stroke-width: 2;
  stroke-linecap: round;
  stroke-linejoin: round;
  fill: none;
  color: var(--theme-text-soft);
  filter: none;
}

.hamburger-icon :deep(canvas),
.hamburger-icon :deep(svg) {
  width: 100% !important;
  height: 100% !important;
  display: block !important;
}

.mobile-menu-bg {
  position: absolute;
  inset: 0;
  z-index: 0;
  overflow: hidden;
  pointer-events: none;
  transform: translateZ(0);
  will-change: opacity;
}

.mobile-menu-lottie {
  width: 100%;
  height: 100%;
  opacity: 0.7;
}

.mobile-menu-lottie :deep(svg) {
  width: 100%;
  height: 100%;
}

.mobile-menu-overlay {
  position: absolute;
  inset: 0;
  background: var(--theme-menu-overlay);
}

.ui-switch {
  --switch-bg: var(--theme-switch-bg);
  --switch-width: 42px;
  --switch-height: 18px;
  --circle-diameter: 28px;
  --circle-bg: var(--theme-switch-circle);
  --circle-inset: calc((var(--circle-diameter) - var(--switch-height)) / 2);
}

.ui-switch input {
  display: none;
}

.slider {
  width: var(--switch-width);
  height: var(--switch-height);
  background: var(--switch-bg);
  border-radius: 999px;
  position: relative;
  cursor: pointer;
}

.slider .circle {
  top: calc(var(--circle-inset) * -1);
  left: 0;
  width: var(--circle-diameter);
  height: var(--circle-diameter);
  position: absolute;
  border-radius: inherit;
  background-color: var(--circle-bg);
  background-image: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGhlaWdodD0iMjAiIHdpZHRoPSIyMCIgdmlld0JveD0iMCAwIDIwIDIwIj4KICAgIDxwYXRoIGZpbGw9IiNmZmYiCiAgICAgICAgZD0iTTkuMzA1IDEuNjY3VjMuNzVoMS4zODlWMS42NjdoLTEuMzl6bS00LjcwNyAxLjk1bC0uOTgyLjk4Mkw1LjA5IDYuMDcybC45ODItLjk4Mi0xLjQ3My0xLjQ3M3ptMTAuODAyIDBMMTMuOTI3IDUuMDlsLjk4Mi45ODIgMS40NzMtMS40NzMtLjk4Mi0uOTgyek0xMCA1LjEzOWE0Ljg3MiA0Ljg3MiAwIDAwLTQuODYyIDQuODZBNC44NzIgNC44NzIgMCAwMDEwIDE0Ljg2MiA0Ljg3MiA0Ljg3MiAwIDAwMTQuODYgMTAgNC44NzIgNC44NzIgMCAwMDEwIDUuMTM5em0wIDEuMzg5QTMuNDYyIDMuNDYyIDAgMDExMy40NzEgMTBhMy40NjIgMy40NjIgMCAwMS0zLjQ3MyAzLjQ3MkEzLjQ2MiAzLjQ2MiAwIDAxNi41MjcgMTAgMy40NjIgMy40NjIgMCAwMTEwIDYuNTI4ek0xLjY2NSA5LjMwNXYxLjM5aDIuMDgzdi0xLjM5SDEuNjY2em0xNC41ODMgMHYxLjM5aDIuMDg0di0xLjM5aC0yLjA4NHpNNS4wOSAxMy45MjhMMy42MTYgMTUuNGwuOTgyLjk4MiAxLjQ3My0xLjQ3My0uOTgyLS45ODJ6bTkuODIgMGwtLjk4Mi45ODIgMS40NzMgMS40NzMuOTgyLS45ODItMS40NzMtMS40NzN6TTkuMzA1IDE2LjI1djIuMDgzaDEuMzg5VjE2LjI1aC0xLjM5eiIgLz4KPC9zdmc+");
  background-repeat: no-repeat;
  background-position: center center;
  transition: left 150ms cubic-bezier(0.4, 0, 0.2, 1),
    transform 150ms cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0px 2px 1px -1px rgba(0, 0, 0, 0.2),
    0px 1px 1px 0px rgba(0, 0, 0, 0.14),
    0px 1px 3px 0px rgba(0, 0, 0, 0.12);
}

.slider .circle::before {
  content: '';
  position: absolute;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.75);
  border-radius: inherit;
  transition: all 500ms;
  opacity: 0;
}

.ui-switch input:checked + .slider .circle {
  left: calc(100% - var(--circle-diameter));
  background-image: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGhlaWdodD0iMjAiIHdpZHRoPSIyMCIgdmlld0JveD0iMCAwIDIwIDIwIj4KICAgIDxwYXRoIGZpbGw9IiNmZmYiCiAgICAgICAgZD0iTTQuMiAyLjVsLS43IDEuOC0xLjguNyAxLjguNy43IDEuOC42LTEuOEw2LjcgNWwtMS45LS43LS42LTEuOHptMTUgOC4zYTYuNyA2LjcgMCAxMS02LjYtNi42IDUuOCA1LjggMCAwMDYuNiA2LjZ6IiAvPgo8L3N2Zz4=");
}

.ui-switch input:active + .slider .circle::before {
  transition: 0s;
  opacity: 1;
  width: 0;
  height: 0;
}

.menu-circle-bg {
  background: var(--theme-menu-circle);
  transform-origin: top right;
  will-change: transform;
  transform: translate(50%, -50%) scale(0);
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
}

.menu-circle-open {
  transform: translate(50%, -50%) scale(1);
  transition: transform 0.45s cubic-bezier(0.32, 0.72, 0, 1);
}

.menu-circle-closed {
  transform: translate(50%, -50%) scale(0);
  transition: transform 0.25s cubic-bezier(0.32, 0, 0.67, 0);
}

.menu-item-animate {
  transform: translateZ(0);
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
  will-change: transform, opacity;
  transition-property: opacity, transform;
  transition-timing-function: cubic-bezier(0.22, 1, 0.36, 1);
}

.menu-item-visible {
  opacity: 1;
  transform: translateY(0) translateZ(0);
  transition-duration: 0.35s;
}

.menu-item-hidden {
  opacity: 0;
  transform: translateY(16px) translateZ(0);
  transition-duration: 0.15s;
  transition-delay: 0ms !important;
}

:global([data-theme='light']) .mobile-nav-link {
  color: #3a4451;
}

:global([data-theme='light']) .mobile-nav-link:hover {
  color: #1f2a37;
}

.desktop-switch .slider {
  transition: background-color 220ms ease;
}

.desktop-switch .slider .circle {
  transition: left 220ms cubic-bezier(0.4, 0, 0.2, 1),
    transform 220ms cubic-bezier(0.4, 0, 0.2, 1),
    background-color 220ms ease;
}

:global(:root.theme-switching) .desktop-switch .slider,
:global(:root.theme-switching) .desktop-switch .slider .circle {
  transition: background-color 220ms ease, left 220ms cubic-bezier(0.4, 0, 0.2, 1),
    transform 220ms cubic-bezier(0.4, 0, 0.2, 1) !important;
}

/* Language Switcher */
.lang-switcher {
  cursor: pointer;
  color: var(--theme-text-strong);
  background: transparent;
  border: none;
  padding: 0.25rem 0.5rem;
  transition: color 0.2s ease;
}

.lang-switcher:hover {
  color: var(--theme-text-hover);
}

.lang-roll {
  display: inline-flex;
  height: 1.25em;
  line-height: 1.25em;
  overflow: hidden;
}

.lang-roll-track {
  display: flex;
  flex-direction: column;
  transform: translateY(0);
  transition: transform 0.45s cubic-bezier(0.22, 1, 0.36, 1);
  will-change: transform;
}

.lang-roll-item {
  display: flex;
  align-items: center;
  gap: 0.35em;
  min-height: 1.25em;
  line-height: 1.25em;
}

.lang-globe {
  width: 1.1em;
  height: 1.1em;
  flex-shrink: 0;
}

.lang-text {
  font-size: 0.85rem;
  font-weight: 600;
  letter-spacing: 0.05em;
}

.lang-switcher:hover .lang-roll-track,
.lang-switcher:focus-visible .lang-roll-track {
  transform: translateY(-1.25em);
}

.resume-capsule {
  border-radius: 999px;
  padding: 10px 18px;
  font-weight: 600;
  letter-spacing: 0.02em;
  text-decoration: none;
  color: var(--theme-text-strong);
  background: transparent;
  border: 2px solid var(--theme-resume-border);
  transition:
    transform 180ms cubic-bezier(0.4, 0, 0.2, 1),
    background-color 180ms ease,
    border-color 180ms ease,
    color 180ms ease;
  will-change: transform;
}

.resume-capsule:hover {
  transform: translateY(-1px);
  background: var(--theme-resume-hover-bg);
  border-color: var(--theme-resume-border);
  color: var(--theme-resume-hover-text);
}

.resume-capsule:active {
  transform: translateY(0px);
}

.resume-capsule-mobile {
  width: fit-content;
}

.resume-capsule-text {
  display: inline-flex;
  justify-content: center;
  align-items: center;
}
</style>

