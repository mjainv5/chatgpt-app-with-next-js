// @ts-nocheck
"use client";

import Link from "next/link";
import { useMemo, useRef } from "react";
import {
  useWidgetProps,
  useMaxHeight,
  useDisplayMode,
  useRequestDisplayMode,
  useIsChatGptApp,
  useOpenExternal,
} from "./hooks";

export default function Home() {
  const toolOutput = useWidgetProps<{
    name?: string;
    result?: { structuredContent?: { name?: string } };
  }>();
  const maxHeight = useMaxHeight() ?? undefined;
  const displayMode = useDisplayMode();
  const requestDisplayMode = useRequestDisplayMode();
  const isChatGptApp = useIsChatGptApp();
  const openExternal = useOpenExternal();
  const scrollerRef = useRef<HTMLDivElement | null>(null);

  const name = toolOutput?.result?.structuredContent?.name || toolOutput?.name;

  const formatINR = (amount: number | undefined | null) =>
    typeof amount === "number"
      ? amount.toLocaleString("en-IN", {
          style: "currency",
          currency: "INR",
          maximumFractionDigits: 0,
        })
      : "₹—";

  type HotelCard = {
    id: string;
    name: string;
    location: string;
    price: string;
    rating: number;
    image: string;
    url: string;
    propertyLabel: string;
    distance: string;
    taxes: string;
  };

  const hotels = useMemo<HotelCard[]>(() => {
    const raw = [
      {
        id: "200703241029455940",
        name: "Caravela Beach Resort",
        starRating: 5,
        locationPersuasion: ["Varca Beach", "3 minutes walk to Varca Beach"],
        media: [
          {
            url: "https://r1imghtlak.mmtcdn.com/57bc01342e1f11ea930d0242ac110004.jpg?output-quality=75&downsize=243:162&output-format=webp",
            mediaType: "IMAGE",
          },
          {
            url: "https://r1imghtlak.mmtcdn.com/91d99794be3d11e89f620af23595dd16.jpg?output-quality=75&downsize=243:162&output-format=webp",
            mediaType: "IMAGE",
          },
        ],
        priceDetail: {
          price: 13000.0,
          priceWithTax: 15633.0,
          discountedPrice: 10319.0,
          discountedPriceWithTax: 12952.0,
        },
        seoUrl:
          "https://www.makemytrip.com/hotels/caravela_beach_resort-details-goa.html",
      },
      {
        id: "202208201715552171",
        name: "Avataara Resort & Spa",
        starRating: 4,
        locationPersuasion: ["Vagator", "2.6 km drive to Vagator Beach"],
        media: [
          {
            url: "https://r2imghtlak.mmtcdn.com/r2-mmt-htl-image/htl-imgs/202208201715552171-b3018b7085c611ed944d0a58a9feac02.jpg?output-quality=75&downsize=243:162&output-format=webp",
            mediaType: "IMAGE",
          },
          {
            url: "https://r2imghtlak.mmtcdn.com/r2-mmt-htl-image/htl-imgs/202208201715552171-a47488da586d11ee8b000a58a9feac02.jpg?output-quality=75&downsize=243:162&output-format=webp",
            mediaType: "IMAGE",
          },
        ],
        priceDetail: {
          price: 13000.0,
          priceWithTax: 15153.0,
          discountedPrice: 9360.0,
          discountedPriceWithTax: 11513.0,
        },
        seoUrl:
          "https://www.makemytrip.com/hotels/avataara_resort_spa-details-goa.html",
      },
      {
        id: "201309291438557369",
        name: "Novotel Goa Candolim",
        starRating: 5,
        reviewSummary: { cumulativeRating: 4.0 },
        locationPersuasion: [
          "Candolim",
          "4 minutes walk to Candolim Beach",
        ],
        media: [
          {
            url: "https://r1imghtlak.mmtcdn.com/c0655ac231eb11eeaedc0a58a9feac02.jpg?output-quality=75&downsize=243:162&output-format=webp",
            mediaType: "IMAGE",
          },
        ],
        priceDetail: {
          price: 8099.0,
          priceWithTax: 8828.0,
          discountedPrice: 7289.0,
          discountedPriceWithTax: 8018.0,
        },
        seoUrl:
          "https://www.makemytrip.com/hotels/novotel_goa_candolim-details-goa.html",
      },
      {
        id: "20070209145406915",
        name: "Radisson Goa Candolim",
        starRating: 5,
        reviewSummary: { cumulativeRating: 4.3 },
        locationPersuasion: ["Candolim", "8 minutes walk to Candolim Beach"],
        media: [
          {
            url: "https://r1imghtlak.mmtcdn.com/ffe72710de4211eb83aa0242ac110002.jpg?output-quality=75&downsize=243:162&output-format=webp",
            mediaType: "IMAGE",
          },
        ],
        priceDetail: {
          price: 12600.0,
          priceWithTax: 15063.0,
          discountedPrice: 10710.0,
          discountedPriceWithTax: 13173.0,
        },
        seoUrl:
          "https://www.makemytrip.com/hotels/radisson_goa_candolim-details-goa.html",
      },
      {
        id: "201512121606154014",
        name: "Hyatt Centric Candolim Goa",
        starRating: 5,
        reviewSummary: { cumulativeRating: 4.3 },
        locationPersuasion: [
          "Calangute",
          "10 minutes walk to Candolim Beach",
        ],
        media: [
          {
            url: "https://r1imghtlak.mmtcdn.com/842684025c8211e98d9f0242ac110003.jpg?output-quality=75&downsize=243:162&output-format=webp",
            mediaType: "IMAGE",
          },
        ],
        priceDetail: {
          price: 7880.0,
          priceWithTax: 9692.0,
          discountedPrice: 7880.0,
          discountedPriceWithTax: 9692.0,
        },
        seoUrl:
          "https://www.makemytrip.com/hotels/hyatt_centric_candolim_goa-details-goa.html",
      },
    ];

    return raw.map((r): HotelCard => {
      const img = r.media?.find((m: any) => m.mediaType === "IMAGE")?.url;
      const imageUrl = img ? (img.startsWith("http") ? img : `https:${img}`) : "/next.svg";
      const rating = (r as any).reviewSummary?.cumulativeRating ?? r.starRating ?? 0;
      const location = Array.isArray(r.locationPersuasion)
        ? r.locationPersuasion.join(" · ")
        : "";
      const distance = Array.isArray(r.locationPersuasion) && r.locationPersuasion.length > 1
        ? r.locationPersuasion[1]
        : (Array.isArray(r.locationPersuasion) ? r.locationPersuasion[0] : "");
      const propertyLabel = /resort/i.test(r.name) ? "Resort" : "Hotel";
      const price = formatINR(
        r.priceDetail?.discountedPriceWithTax ??
          r.priceDetail?.priceWithTax ??
          r.priceDetail?.price
      );
      const base = r.priceDetail?.discountedPrice ?? r.priceDetail?.price ?? null;
      const withTax = r.priceDetail?.discountedPriceWithTax ?? r.priceDetail?.priceWithTax ?? null;
      const taxes = withTax != null && base != null ? formatINR(Math.max(0, Math.round(withTax - base))) : "₹—";
      return {
        id: r.id,
        name: r.name,
        location,
        price,
        rating,
        image: imageUrl,
        url: (r as any).seoUrl ?? "https://www.makemytrip.com/hotels/p-resorts-in-goa.html",
        propertyLabel,
        distance,
        taxes,
      };
    });
  }, []);

  const scrollBy = (delta: number) => {
    const el = scrollerRef.current;
    if (!el) return;
    el.scrollBy({ left: delta, behavior: "smooth" });
  };

  return (
    <div
      className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center p-8 pb-20 gap-16 sm:p-20"
      style={{
        maxHeight,
        height: displayMode === "fullscreen" ? maxHeight : undefined,
      }}
    >
      {displayMode !== "fullscreen" && (
        <button
          aria-label="Enter fullscreen"
          className="fixed top-4 right-4 z-50 rounded-full bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 shadow-lg ring-1 ring-slate-900/10 dark:ring-white/10 p-2.5 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors cursor-pointer"
          onClick={() => requestDisplayMode("fullscreen")}
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.5}
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15"
            />
          </svg>
        </button>
      )}
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start w-full">
        {!isChatGptApp && (
          <div className="bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-lg px-4 py-3 w-full">
            <div className="flex items-center gap-3">
              <svg
                className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0"
                fill="currentColor"
                viewBox="0 0 20 20"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z"
                  clipRule="evenodd"
                />
              </svg>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-blue-900 dark:text-blue-100 font-medium">
                  This app relies on data from a ChatGPT session.
                </p>
                <p className="text-sm text-blue-900 dark:text-blue-100 font-medium">
                  No{" "}
                  <a
                    href="https://developers.openai.com/apps-sdk/reference"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline hover:no-underline font-mono bg-blue-100 dark:bg-blue-900 px-1 py-0.5 rounded"
                  >
                    window.openai
                  </a>{" "}
                  property detected
                </p>
              </div>
            </div>
          </div>
        )}
        <div className="w-full flex items-center justify-between">
          <div className="flex flex-col gap-1">
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
              Resorts in Goa
            </h1>
            <p className="text-sm text-slate-600 dark:text-slate-300">
              Mocked from <span className="font-mono">makemytrip.com/hotels/p-resorts-in-goa.html</span>
              {name ? ` · Hello, ${name}` : ""}
            </p>
          </div>
          {displayMode !== "fullscreen" && (
            <div className="hidden sm:flex gap-2">
              <button
                className="rounded-full bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 shadow-lg ring-1 ring-slate-900/10 dark:ring-white/10 p-2.5 hover:bg-slate-50 dark:hover:bg-slate-700"
                onClick={() => scrollBy(-320)}
                aria-label="Scroll left"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                </svg>
              </button>
              <button
                className="rounded-full bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 shadow-lg ring-1 ring-slate-900/10 dark:ring-white/10 p-2.5 hover:bg-slate-50 dark:hover:bg-slate-700"
                onClick={() => scrollBy(320)}
                aria-label="Scroll right"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </svg>
              </button>
            </div>
          )}
        </div>

        <div
          ref={scrollerRef}
          className="w-full flex gap-4 overflow-x-auto snap-x snap-mandatory scroll-px-4 py-2"
          style={{ scrollBehavior: "smooth" }}
        >
          {hotels.map((h: HotelCard) => (
            <div
              key={h.id}
              className="min-w-[300px] max-w-[300px] snap-start bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden shadow-sm"
            >
              <div className="h-44 bg-slate-100 dark:bg-slate-800">
                <img src={h.image} alt={h.name} className="w-full h-full object-cover" />
              </div>
              <div className="p-4 flex flex-col gap-3">
                <h3 className="text-lg font-semibold tracking-tight line-clamp-2">{h.name}</h3>

                <div>
                  <div className="text-2xl font-extrabold text-emerald-700">{h.price}</div>
                  <div className="text-xs text-slate-600">+ {h.taxes} taxes & fees</div>
                  <div className="text-xs text-slate-500">Per Night</div>
                </div>

                <Link
                  className="mt-1 self-start rounded-full bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm h-10 px-5"
                  href={`/hotel/${h.id}`}
                  prefetch={true}
                >
                  VIEW DETAILS
                </Link>

                <div className="pt-2 border-t border-slate-200 dark:border-slate-800 flex items-center gap-2">
                  <span className="inline-flex items-center gap-1 bg-blue-600 text-white text-xs font-semibold px-2 py-0.5 rounded-full">
                    {h.rating.toFixed(1)}
                  </span>
                  <span className="text-blue-700 dark:text-blue-400 text-sm font-semibold">
                    {h.rating >= 4.5 ? "Excellent" : h.rating >= 4.0 ? "Very Good" : h.rating >= 3.5 ? "Good" : "Average"}
                  </span>
                </div>

                <div className="text-center text-sm py-2 border border-slate-200 dark:border-slate-800 rounded">
                  {h.propertyLabel}
                </div>
                <div className="text-center text-sm py-2 border border-slate-200 dark:border-slate-800 rounded">
                  {h.distance}
                </div>
                <div className="text-center text-sm py-2 border border-slate-200 dark:border-slate-800 rounded">
                  Free Cancellation
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <Link
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-auto"
            prefetch={false}
            href="/custom-page"
          >
            Visit another page
          </Link>
          <a
            href="https://vercel.com/templates/ai/chatgpt-app-with-next-js"
            target="_blank"
            rel="noopener noreferrer"
            className="underline"
          >
            Deploy on Vercel
          </a>
        </div>
      </main>
    </div>
  );
}
