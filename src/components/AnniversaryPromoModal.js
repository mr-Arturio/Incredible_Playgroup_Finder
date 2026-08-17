"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { track } from "@vercel/analytics";
import { FiX } from "react-icons/fi";
import { useLanguage } from "../context/LanguageContext";

const STORAGE_KEY = "ipf.promo.hideUntil.50-years-together-2026";
const LEGACY_STORAGE_KEY = "ipf.promo.dismissed.50-years-together-2026";
const FACEBOOK_EVENT_URL = "https://www.facebook.com/share/1W42JGEHXP/";
const SHOW_DELAY_MS = 1400;
const SNOOZE_AFTER_VIEW_MS = 30 * 60 * 1000;
const SNOOZE_AFTER_CLICK_MS = 24 * 60 * 60 * 1000;
// Hide the promo after the celebration weekend (America/Toronto, Aug 22 2026).
const CAMPAIGN_END_MS = Date.parse("2026-08-23T04:00:00.000Z");

const copy = {
  en: {
    title: "Join us",
    close: "Close announcement",
    cta: "See event on Facebook",
    alt: "50 Years Together: a community celebration on August 21 and 22. Two days of family fun with pizza dinner and movie night, crafts and activities, a petting zoo, face painting, balloon twisting, games, sports, and music.",
  },
  fr: {
    title: "Joignez-vous à nous",
    close: "Fermer l'annonce",
    cta: "Voir l'événement sur Facebook",
    alt: "50 ans ensemble : une célébration communautaire les 21 et 22 août. Deux jours de plaisir en famille avec souper pizza et soirée cinéma, bricolages, zoo pour enfants, peinture faciale, sculpture de ballons, jeux, sports et musique.",
  },
};

const readHideUntil = () => {
  try {
    const until = Number(window.localStorage.getItem(STORAGE_KEY));
    if (Number.isFinite(until) && until > 0) {
      return until;
    }

    if (window.localStorage.getItem(LEGACY_STORAGE_KEY) === "1") {
      const migrated = Date.now() + SNOOZE_AFTER_VIEW_MS;
      window.localStorage.setItem(STORAGE_KEY, String(migrated));
      window.localStorage.removeItem(LEGACY_STORAGE_KEY);
      return migrated;
    }
  } catch {
    // Ignore private-mode / blocked storage.
  }

  return 0;
};

const persistHideUntil = (durationMs) => {
  try {
    window.localStorage.setItem(STORAGE_KEY, String(Date.now() + durationMs));
  } catch {
    // Ignore private-mode / blocked storage; the promo simply stays session-only.
  }
};

const AnniversaryPromoModal = () => {
  const { translation } = useLanguage();
  const t = copy[translation] || copy.en;
  const titleId = useId();
  const overlayRef = useRef(null);
  const closeBtnRef = useRef(null);
  const [isMounted, setIsMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const dismiss = useCallback((reason = "close") => {
    persistHideUntil(SNOOZE_AFTER_VIEW_MS);
    setIsOpen(false);
    track("50 years anniversary promo", { action: reason });
  }, []);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (Date.now() >= CAMPAIGN_END_MS || Date.now() < readHideUntil()) {
      return undefined;
    }

    const timer = window.setTimeout(() => {
      persistHideUntil(SNOOZE_AFTER_VIEW_MS);
      setIsOpen(true);
      track("50 years anniversary promo", { action: "shown" });
    }, SHOW_DELAY_MS);

    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isOpen) return undefined;

    const previouslyFocused = document.activeElement;
    closeBtnRef.current?.focus();

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        event.preventDefault();
        dismiss("escape");
        return;
      }

      if (event.key !== "Tab" || !overlayRef.current) return;

      const focusable = overlayRef.current.querySelectorAll(
        'button, [href]:not([tabindex="-1"])'
      );
      if (!focusable.length) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
      if (previouslyFocused instanceof HTMLElement) {
        previouslyFocused.focus();
      }
    };
  }, [isOpen, dismiss]);

  const handleCtaClick = () => {
    persistHideUntil(SNOOZE_AFTER_CLICK_MS);
    setIsOpen(false);
    track("50 years anniversary promo", { action: "click" });
  };

  if (!isMounted || !isOpen) {
    return null;
  }

  return createPortal(
    <div
      ref={overlayRef}
      className="anniversary-promo-overlay"
      role="presentation"
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          dismiss("backdrop");
        }
      }}
    >
      <div
        className="anniversary-promo-backdrop"
        aria-hidden="true"
        onClick={() => dismiss("backdrop")}
      />
      <div className="anniversary-promo-center">
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
          className="anniversary-promo-card animate-anniversary-promo"
          onClick={(event) => event.stopPropagation()}
        >
          <div className="anniversary-promo-header">
            <span aria-hidden="true" />
            <h2 id={titleId} className="anniversary-promo-title">
              {t.title}
            </h2>
            <button
              ref={closeBtnRef}
              type="button"
              onClick={() => dismiss("close")}
              className="anniversary-promo-close"
              aria-label={t.close}
            >
              <FiX className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>

          <a
            href={FACEBOOK_EVENT_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleCtaClick}
            className="anniversary-promo-link"
          >
            <span className="anniversary-promo-image">
              <Image
                src="/banner/50_Years_Together.png"
                alt={t.alt}
                fill
                quality={85}
                priority
                sizes="(max-width: 640px) 92vw, (max-width: 1024px) 70vw, 512px"
                className="object-contain"
              />
            </span>
            <span className="anniversary-promo-cta">
              {t.cta}
              <span aria-hidden="true"> →</span>
            </span>
          </a>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default AnniversaryPromoModal;
