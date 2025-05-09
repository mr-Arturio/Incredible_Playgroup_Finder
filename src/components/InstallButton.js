"use client";
import { useEffect, useState } from "react";

export default function InstallButton() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  // Platform checks - Android & Windows for now...
  const isAndroid =
    typeof window !== "undefined" &&
    /android/i.test(window.navigator.userAgent);
  const isWindows =
    typeof window !== "undefined" &&
    /windows/i.test(window.navigator.userAgent);

  // Only proceed if on Android or Windows
  const isSupported = isAndroid || isWindows;

  useEffect(() => {
    if (!isSupported) return;

    const handler = (event) => {
      // Prevent the mini-infobar from appearing
      event.preventDefault();
      // Save the event for later and show our button
      setDeferredPrompt(event);
      setIsVisible(true);
    };

    window.addEventListener("beforeinstallprompt", handler);

    return () => {
      window.removeEventListener("beforeinstallprompt", handler);
    };
  }, [isSupported]);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const choice = await deferredPrompt.userChoice;
    console.log(
      choice.outcome === "accepted"
        ? "User accepted install"
        : "User dismissed install"
    );
    setDeferredPrompt(null);
    setIsVisible(false);
  };

  // Only render for Android/Windows and once the prompt is available
  if (!isSupported || !isVisible) return null;

  return (
    <button
      aria-label="Add this app to your home screen"
      onClick={handleInstallClick}
      className="px-4 py-2 text-xs text-white bg-mainBlue hover:bg-hoverBlue rounded-lg flex items-center justify-center shadow-md hover:shadow-xl transition duration-200 ease-in-out"
    >
      Install App
    </button>
  );
}
