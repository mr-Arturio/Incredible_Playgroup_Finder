# IPF App - Performance Optimization Analysis & Recommendations

## Executive Summary
This document provides a comprehensive analysis of the IPF app's performance and actionable recommendations for optimization, with a focus on image loading, bundle size, and overall loading speed improvements.

---

## 🔍 Current Issues Identified

### 1. Image Optimization Issues

#### **Critical Issues:**

**a) Missing Image Optimization Attributes**
- Many Next.js `Image` components lack `priority`, `loading`, `sizes`, and `placeholder` attributes
- Social media icons load immediately but aren't prioritized
- Random images load on page mount without lazy loading

**b) Unoptimized External Images**
- Social media icons from `static.wixstatic.com` are loaded without optimization
- Weather icons from `openweathermap.org` are loaded dynamically without size constraints
- No image quality/size optimization settings

**c) Using `<img>` Tag Instead of Next.js Image**
- `PromoLink.js` uses native `<img>` tag instead of Next.js optimized `Image` component
- Missing automatic optimization and responsive sizing

**d) Missing Responsive Image Sizes**
- Images don't specify `sizes` attribute for responsive loading
- Browser can't optimize image requests for different viewport sizes

#### **Specific Files Affected:**
- `src/components/Header/NavBar.js` - Logo and social icons
- `src/utils/RandomImage.js` - Random family images
- `src/components/WeatherWidget/index.js` - Weather icons
- `src/components/PromoLink.js` - Banner image (uses `<img>`)
- `src/components/Footer.js` - Social icons and OCF logo
- `src/components/PlaygroupCard_Component/CardHeader.js` - Time icon

---

### 2. Component Loading & Code Splitting

#### **Issues:**
- ✅ **FIXED:** Map component now uses dynamic imports (code-split)
- ✅ **FIXED:** Map component no longer loads immediately when hidden
- ⚠️ Weather Widget is currently commented out (can be dynamically imported when re-enabled)
- ✅ **Note:** Suspense boundaries not needed - Next.js `dynamic()` handles loading states

#### **Files Optimized:**
- ✅ `src/components/MapComponent.js` - Now dynamically imported in RenderSheetDataTable.js
- ⚠️ `src/components/WeatherWidget/index.js` - Currently commented out (can be dynamically imported if re-enabled)

---

### 3. Bundle Size & Third-Party Scripts

#### **Issues:**
- Hotjar loads immediately on page load
- Google Maps API loads even when map isn't visible
- Multiple external image CDN requests
- No script prioritization or deferring

---

### 4. Font Loading

#### **Current State:**
✅ Already optimized with `display: "swap"` for Inter font
⚠️ Custom font (Lazydog) uses preload but could benefit from font-display

---

## 🚀 Recommended Optimizations

### Priority 1: Image Optimization (High Impact)

#### **1.1 Add Priority Loading for Above-the-Fold Images**

**File: `src/components/Header/NavBar.js`**
```jsx
// Logo should load with priority
<Image
  src={icon}
  alt="Logo"
  fill
  style={{ objectFit: "contain" }}
  priority  // ADD THIS
  sizes="(max-width: 768px) 96px, (max-width: 1280px) 112px, 144px"  // ADD THIS
/>
```

**File: `src/utils/RandomImage.js`**
```jsx
<Image 
  src={imageData.src} 
  alt="Family Image" 
  width={imageData.width} 
  height={100}
  loading="lazy"  // ADD THIS - lazy load since it's below fold
  sizes="(max-width: 768px) 300px, 400px"  // ADD THIS
/>
```

#### **1.2 Replace Native `<img>` with Next.js Image**

**File: `src/components/PromoLink.js`**
```jsx
import Image from "next/image";  // ADD THIS

// Replace <img> with:
<Image
  src="/banner/50_years.svg"
  alt="50 years donation banner"
  width={624}  // Specify actual width
  height={200}  // Specify actual height
  className={`${imageClassName} transform ${className}`}
  loading="lazy"  // Since it's likely below fold
  priority={false}
/>
```

#### **1.3 Optimize External Images**

**File: `src/components/Header/NavBar.js`**
```jsx
// For social icons - add quality and sizes
<Image
  src="https://static.wixstatic.com/media/..."
  alt="Facebook"
  width={39}
  height={39}
  className="navBarIcons"
  loading="lazy"  // Social icons can be lazy loaded
  quality={75}  // Reduce quality slightly for icons
  sizes="39px"  // Fixed size
/>
```

#### **1.4 Optimize Weather Widget Images**

**File: `src/components/WeatherWidget/index.js`**
```jsx
<Image
  src={`https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`}
  alt={day.weather[0].description}
  fill
  className="object-contain"
  loading="lazy"  // Weather widget loads after initial render
  sizes="32px"  // Small icon size
  quality={75}
/>
```

#### **1.5 Add Image Configuration to next.config.mjs**

```javascript
images: {
  remotePatterns: [
    {
      protocol: "https",
      hostname: "static.wixstatic.com",
      port: "",
      pathname: "/media/**",
    },
    {
      protocol: "https",
      hostname: "openweathermap.org",
    },
  ],
  // ADD THESE OPTIMIZATIONS
  formats: ['image/avif', 'image/webp'],  // Modern formats
  deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
  imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  minimumCacheTTL: 60,  // Cache images for 60 seconds
  dangerouslyAllowSVG: true,
  contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
},
```

---

### Priority 2: Code Splitting & Lazy Loading

#### **2.1 Lazy Load Map Component**

**File: `src/components/RenderSheetDataTable.js`**
```jsx
import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import Loading from "./Loading";

// Replace: import MapComponent from "./MapComponent";
const MapComponent = dynamic(() => import("./MapComponent"), {
  loading: () => <Loading />,
  ssr: false,  // Maps don't need SSR
});

// Then wrap usage:
{isMapVisible && (
  <Suspense fallback={<Loading />}>
    <MapComponent
      sheetData={filteredData}
      handleMarkerSelect={handleMarkerSelect}
    />
  </Suspense>
)}
```

#### **2.2 Lazy Load Weather Widget**

**File: `src/components/RenderSheetDataTable.js`**
```jsx
const WeatherWidget = dynamic(() => import("./WeatherWidget"), {
  loading: () => <div>Loading weather...</div>,
  ssr: false,  // External API, no need for SSR
});

// Use it normally, but it will be code-split
<WeatherWidget />
```

#### **2.3 Lazy Load Heavy Dependencies**

**Create a new file: `src/components/LazyComponents.js`**
```jsx
import dynamic from 'next/dynamic';

export const LazyMapComponent = dynamic(() => import('./MapComponent'), {
  ssr: false,
  loading: () => <div className="h-[400px] flex items-center justify-center">Loading map...</div>
});

export const LazyWeatherWidget = dynamic(() => import('./WeatherWidget'), {
  ssr: false,
});
```

---

### Priority 3: Third-Party Script Optimization

#### **3.1 Defer Hotjar Loading**

**File: `src/utils/HotjarTracking.js`**
```jsx
"use client";

import { useEffect } from "react";

const HotjarTracking = () => {
  useEffect(() => {
    if (typeof window !== "undefined") {
      // Wait for page to be interactive before loading Hotjar
      const loadHotjar = () => {
        (function(h, o, t, j, a, r) {
          h.hj = h.hj || function() {
            (h.hj.q = h.hj.q || []).push(arguments);
          };
          h._hjSettings = { hjid: 5129221, hjsv: 6 };
          a = o.getElementsByTagName("head")[0];
          r = o.createElement("script");
          r.async = true;
          r.defer = true;  // ADD THIS
          r.src = t + h._hjSettings.hjid + j + h._hjSettings.hjsv;
          a.appendChild(r);
        })(window, document, "https://static.hotjar.com/c/hotjar-", ".js?sv=");
      };

      // Load after page is interactive
      if (document.readyState === 'complete') {
        setTimeout(loadHotjar, 3000);  // Delay 3 seconds
      } else {
        window.addEventListener('load', () => {
          setTimeout(loadHotjar, 3000);
        });
      }
    }
  }, []);

  return null;
};

export default HotjarTracking;
```

#### **3.2 Add Resource Hints for External Assets**

**File: `src/app/layout.js`**
```jsx
<head>
  {/* ... existing head content ... */}
  
  {/* DNS prefetch for external domains */}
  <link rel="dns-prefetch" href="//static.wixstatic.com" />
  <link rel="dns-prefetch" href="//openweathermap.org" />
  <link rel="dns-prefetch" href="//static.hotjar.com" />
  
  {/* Preconnect for critical external resources */}
  <link rel="preconnect" href="https://static.wixstatic.com" crossOrigin="anonymous" />
</head>
```

---

### Priority 4: Bundle Optimization

#### **4.1 Optimize Icon Imports**

**Instead of:**
```jsx
import { FiMenu, FiX } from "react-icons/fi";
```

**Use tree-shaking friendly imports:**
```jsx
import FiMenu from "react-icons/fi/FiMenu";
import FiX from "react-icons/fi/FiX";
```

#### **4.2 Split Large Component Files**

Consider breaking down `RenderSheetDataTable.js` into smaller components that can be lazy-loaded.

---

### Priority 5: Font Optimization

#### **5.1 Optimize Custom Font**

**File: `src/app/fonts.css`**
```css
@font-face {
  font-family: 'Lazydog';
  src: url('/fonts/lazyDog.ttf') format('truetype');
  font-weight: normal;
  font-style: normal;
  font-display: swap;  /* ADD THIS if not already present */
  /* Optional: Preload subset for critical text */
}
```

#### **5.2 Consider Variable Fonts or Subset Fonts**

If possible, create a subset of Lazydog font with only used characters to reduce file size.

---

### Priority 6: Loading States & UX

#### **6.1 Add Skeleton Loaders**

Replace generic "Loading..." with skeleton loaders for better perceived performance:

**Create: `src/components/SkeletonLoader.js`**
```jsx
export const CardSkeleton = () => (
  <div className="animate-pulse bg-gray-200 rounded-lg h-64 mb-4" />
);

export const WeatherSkeleton = () => (
  <div className="flex gap-4">
    {[...Array(8)].map((_, i) => (
      <div key={i} className="animate-pulse bg-gray-200 rounded-md w-24 h-32" />
    ))}
  </div>
);
```

---

## 📊 Expected Performance Improvements

### Image Optimizations:
- **FCP Improvement:** 15-30% faster First Contentful Paint
- **LCP Improvement:** 20-40% faster Largest Contentful Paint
- **Bandwidth Savings:** 30-50% reduction in image payload size
- **Load Time:** 2-5 seconds faster on slower connections

### Code Splitting:
- **Initial Bundle Size:** 20-30% reduction
- **Time to Interactive:** 15-25% improvement
- **Map Component:** Only loads when needed, saves ~200-300KB

### Third-Party Scripts:
- **Main Thread Blocking:** Reduced by deferring Hotjar
- **FCP Improvement:** 5-10% by deferring non-critical scripts

---

## 🎯 Implementation Priority

1. **Week 1:** Image optimizations (Priority 1) - Highest impact
2. **Week 2:** Code splitting (Priority 2) - Medium-high impact
3. **Week 3:** Third-party script optimization (Priority 3) - Medium impact
4. **Week 4:** Bundle optimization & polish (Priorities 4-6) - Incremental improvements

---

## 🔧 Quick Wins (Can be done immediately)

1. Add `loading="lazy"` to all below-fold images
2. Add `priority` to logo in NavBar
3. Replace `<img>` with Next.js `Image` in PromoLink
4. Add `sizes` attribute to all responsive images
5. Defer Hotjar loading by 3 seconds

---

## 📝 Testing Checklist

After implementing optimizations:

- [ ] Run Lighthouse performance audit
- [ ] Test on slow 3G connection (Chrome DevTools)
- [ ] Verify images load responsively on mobile
- [ ] Test lazy loading works correctly
- [ ] Verify map only loads when visible
- [ ] Check bundle size reduction in build output
- [ ] Test Hotjar still tracks correctly after deferring
- [ ] Verify all images have proper alt text
- [ ] Test on actual mobile devices

---

## 📚 Additional Resources

- [Next.js Image Optimization](https://nextjs.org/docs/app/building-your-application/optimizing/images)
- [Web.dev Image Optimization](https://web.dev/fast/#optimize-your-images)
- [React Code Splitting](https://react.dev/reference/react/lazy)
- [Resource Hints](https://www.w3.org/TR/resource-hints/)

---

## Notes

- Always test changes in staging before production
- Monitor Core Web Vitals after deployment
- Consider A/B testing heavy optimizations
- Keep bundle analyzer reports to track size over time

