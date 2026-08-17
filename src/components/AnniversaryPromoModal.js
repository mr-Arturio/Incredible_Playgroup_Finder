"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import Image from "next/image";
import { track } from "@vercel/analytics";
import { FiX } from "react-icons/fi";
import { useLanguage } from "../context/LanguageContext";

const STORAGE_KEY = "ipf.promo.dismissed.50-years-together-2026";
const FACEBOOK_EVENT_URL = "https://www.facebook.com/share/1W42JGEHXP/";
const SHOW_DELAY_MS = 1400;
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

const hasDismissedPromo = () => {
  try {
    return window.localStorage.getItem(STORAGE_KEY) === "1";
  } catch {
    return false;
  }
};

const persistDismissal = () => {
  try {
    window.localStorage.setItem(STORAGE_KEY, "1");
  } catch {
    // Ignore private-mode / blocked storage; the promo simply stays session-only.
  }
};

const AnniversaryPromoModal = () => {
  const { translation } = useLanguage();
  const t = copy[translation] || copy.en;
  const titleId = useId();
  const dialogRef = useRef(null);
  const closeBtnRef = useRef(null);
  const [shouldRender, setShouldRender] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const dismiss = useCallback((reason = "close") => {
    persistDismissal();
    setIsOpen(false);
    track("50 years anniversary promo", { action: reason });
  }, []);

  useEffect(() => {
    if (Date.now() >= CAMPAIGN_END_MS || hasDismissedPromo()) {
      return undefined;
    }

    setShouldRender(true);

    const timer = window.setTimeout(() => {
      setIsOpen(true);
      track("50 years anniversary promo", { action: "shown" });
    }, SHOW_DELAY_MS);

    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return undefined;

    if (isOpen && !dialog.open) {
      dialog.showModal();
      closeBtnRef.current?.focus();
    }

    if (!isOpen && dialog.open) {
      dialog.close();
    }

    if (!isOpen) return undefined;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  const handleBackdropClick = (event) => {
    if (event.target === event.currentTarget) {
      dismiss("backdrop");
    }
  };

  const handleCancel = (event) => {
    event.preventDefault();
    dismiss("escape");
  };

  const handleCtaClick = () => {
    persistDismissal();
    setIsOpen(false);
    track("50 years anniversary promo", { action: "click" });
  };

  if (!shouldRender) {
    return null;
  }

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby={titleId}
      aria-modal="true"
      className="anniversary-promo-dialog z-[100] w-[min(calc(100%-1.25rem),34rem)] max-h-[min(92dvh,100%)] border-0 bg-transparent p-0 backdrop:bg-slate-900/45 sm:w-[min(calc(100%-2rem),36rem)] md:w-[min(calc(100%-3rem),38rem)]"
      onCancel={handleCancel}
      onClick={handleBackdropClick}
    >
      <div
        className="animate-anniversary-promo flex max-h-[min(92dvh,100%)] flex-col overflow-y-auto overscroll-contain rounded-2xl bg-white pb-[max(0.25rem,env(safe-area-inset-bottom))] shadow-2xl ring-1 ring-black/10"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="grid shrink-0 grid-cols-[2.75rem_1fr_2.75rem] items-center px-2 pb-1 pt-2 sm:px-3 sm:pt-3">
          <span aria-hidden="true" />
          <h2
            id={titleId}
            className="px-1 text-center font-lazydog text-[clamp(1.4rem,5.5vw,2.25rem)] leading-tight text-introText"
          >
            {t.title}
          </h2>
          <button
            ref={closeBtnRef}
            type="button"
            onClick={() => dismiss("close")}
            className="ml-auto inline-flex h-11 w-11 items-center justify-center rounded-full text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-introText"
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
          className="group mx-2 mb-2 flex min-h-0 flex-1 flex-col rounded-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-introText sm:mx-3 sm:mb-3"
        >
          <span className="relative block min-h-0 w-full overflow-hidden rounded-xl bg-[#d8eefc] shadow-sm ring-1 ring-black/5 transition duration-200 group-hover:shadow-md">
            <Image
              src="/banner/50_Years_Together.png"
              alt={t.alt}
              width={1568}
              height={1568}
              quality={85}
              priority
              sizes="(max-width: 640px) 92vw, (max-width: 1024px) 70vw, 560px"
              className="h-auto max-h-[calc(92dvh-7.5rem)] w-full object-contain"
            />
          </span>
          <span className="mb-1 mt-2 block text-center text-sm font-semibold text-mainBlue transition-colors group-hover:text-hoverBlue sm:text-base">
            {t.cta}
            <span aria-hidden="true"> →</span>
          </span>
        </a>
      </div>
    </dialog>
  );
};

export default AnniversaryPromoModal;
