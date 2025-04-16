"use client";
import { useEffect, useState } from "react";

export default function InstallButton() {
  // This state will store the deferred prompt event.
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  // Toggle the visibility of the install button.
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Listen for the beforeinstallprompt event.
    const handler = (event) => {
      // Prevent the mini-infobar from appearing on mobile.
      event.preventDefault();
      // Save the event for later use.
      setDeferredPrompt(event);
      // Show install button.
      setIsVisible(true);
    };

    window.addEventListener("beforeinstallprompt", handler);

    return () => {
      window.removeEventListener("beforeinstallprompt", handler);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;
    // Show the install prompt.
    deferredPrompt.prompt();
    // Wait for the user to respond to the prompt.
    const choiceResult = await deferredPrompt.userChoice;
    if (choiceResult.outcome === "accepted") {
      console.log("User accepted the install prompt");
    } else {
      console.log("User dismissed the install prompt");
    }
    // Reset the deferred prompt variable; do not show the button anymore.
    setDeferredPrompt(null);
    setIsVisible(false);
  };

  if (!isVisible) {
    return null;
  }

  return (
    <button
      onClick={handleInstallClick}
      className="px-4 py-2 bg-blue-500 text-white rounded-md"
    >
      Add to Home Screen
    </button>
  );
}
