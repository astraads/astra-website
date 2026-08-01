/**
 * Analytics loaders — only inject when public IDs are configured.
 * Never invent IDs. Set via VITE_* env vars or src/config/site.ts.
 */
import { useEffect } from "react";

import {
  GOOGLE_ANALYTICS_ID,
  GOOGLE_TAG_MANAGER_ID,
  isConfigured,
  META_PIXEL_ID,
} from "@/config/site";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
  }
}

export function Analytics() {
  useEffect(() => {
    if (isConfigured(GOOGLE_TAG_MANAGER_ID)) {
      window.dataLayer = window.dataLayer || [];
      const s = document.createElement("script");
      s.async = true;
      s.src = `https://www.googletagmanager.com/gtm.js?id=${GOOGLE_TAG_MANAGER_ID}`;
      document.head.appendChild(s);
    }

    if (isConfigured(GOOGLE_ANALYTICS_ID)) {
      const s = document.createElement("script");
      s.async = true;
      s.src = `https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ANALYTICS_ID}`;
      document.head.appendChild(s);
      window.dataLayer = window.dataLayer || [];
      window.gtag = function gtag(...args: unknown[]) {
        window.dataLayer?.push(args);
      };
      window.gtag("js", new Date());
      window.gtag("config", GOOGLE_ANALYTICS_ID);
    }

    if (isConfigured(META_PIXEL_ID)) {
      const s = document.createElement("script");
      s.innerHTML = `!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${META_PIXEL_ID}');fbq('track','PageView');`;
      document.head.appendChild(s);
    }
  }, []);

  return null;
}
