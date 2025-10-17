"use client";

import Image from "next/image";
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

  const hotels = useMemo(
    () =>
      [
        {
          id: "1",
          name: "Taj Holiday Village Resort & Spa, Goa",
          location: "Sinquerim, Candolim",
          price: "₹16,500",
          rating: 4.6,
          image: "/window.svg",
          url: "https://www.makemytrip.com/hotels/p-resorts-in-goa.html",
        },
        {
          id: "2",
          name: "Novotel Goa Resort & Spa",
          location: "Candolim",
          price: "₹12,300",
          rating: 4.4,
          image: "/globe.svg",
          url: "https://www.makemytrip.com/hotels/p-resorts-in-goa.html",
        },
        {
          id: "3",
          name: "ITC Grand Goa, A Luxury Collection Resort",
          location: "Cansaulim",
          price: "₹18,900",
          rating: 4.7,
          image: "/file.svg",
          url: "https://www.makemytrip.com/hotels/p-resorts-in-goa.html",
        },
        {
          id: "4",
          name: "The Zuri White Sands, Goa Resort & Casino",
          location: "Varca",
          price: "₹14,750",
          rating: 4.3,
          image: "/vercel.svg",
          url: "https://www.makemytrip.com/hotels/p-resorts-in-goa.html",
        },
        {
          id: "5",
          name: "Kenilworth Beach Resort & Spa",
          location: "Utorda",
          price: "₹13,200",
          rating: 4.2,
          image: "/next.svg",
          url: "https://www.makemytrip.com/hotels/p-resorts-in-goa.html",
        },
      ],
    []
  );

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
          {hotels.map((h) => (
            <div
              key={h.id}
              className="min-w-[260px] max-w-[260px] snap-start bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden shadow-sm"
            >
              <div className="h-40 bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                <img src={h.image} alt={h.name} className="w-24 h-24 object-contain" />
              </div>
              <div className="p-4 flex flex-col gap-2">
                <div>
                  <h3 className="text-base font-semibold line-clamp-2">{h.name}</h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400">{h.location}</p>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-amber-500">
                    <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.802 2.036a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.802-2.036a1 1 0 00-1.175 0l-2.802 2.036c-.785.57-1.84-.197-1.54-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span className="text-sm font-medium">{h.rating}</span>
                  </div>
                  <span className="text-sm font-semibold">{h.price} / night</span>
                </div>
                <button
                  className="mt-1 rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-sm h-9 px-3"
                  onClick={() => openExternal(h.url)}
                >
                  View on MakeMyTrip
                </button>
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
