import Link from "next/link";
import { notFound } from "next/navigation";
import hotelsData from "@/data/hotels.json";

type PageParams = {
  params: { id: string };
};

export default function HotelDetailPage({ params }: PageParams) {
  const id = params.id;
  const hotel: any = (hotelsData as any)?.response?.[id];

  if (!hotel) {
    notFound();
  }

  const details = hotel.hotelDetails ?? {};
  const name: string = details.name ?? "Hotel";
  const rating: number = Number(details.starRating ?? 0);
  const addressLine1: string = details.address?.line1 ?? "";
  const addressLine2: string = details.address?.line2 ?? "";
  const checkin: string = details.checkinTime ?? "";
  const checkout: string = details.checkoutTime ?? "";
  const heroImage: string | undefined = details.heroImage;
  const locationText: string = Array.isArray(details.locationPersuasion)
    ? details.locationPersuasion.join(" · ")
    : details.primaryArea ?? "";

  const images: { url: string; title?: string }[] =
    hotel.mediaV2?.grid?.images?.slice(0, 8)?.map((img: any) => {
      const raw = img?.url as string | undefined;
      const normalized = raw
        ? raw.startsWith("http")
          ? raw
          : raw.startsWith("//")
          ? `https:${raw}`
          : raw
        : undefined;
      return { url: normalized ?? "/next.svg", title: img?.title };
    }) ?? [];

  const review = hotel.ugcSummary?.data;

  return (
    <div className="font-sans p-6 sm:p-10 max-w-5xl mx-auto">
      <div className="mb-4">
        <Link
          href="/"
          className="text-blue-700 dark:text-blue-400 hover:underline text-sm"
        >
          ← Back to list
        </Link>
      </div>

      <div className="flex flex-col gap-4 mb-6">
        <h1 className="text-2xl sm:text-3xl font-black tracking-tight">{name}</h1>
        <div className="flex flex-wrap items-center gap-3 text-sm text-slate-600 dark:text-slate-300">
          {rating ? (
            <span className="inline-flex items-center gap-1 bg-blue-600 text-white text-xs font-semibold px-2 py-0.5 rounded-full">
              {rating.toFixed(1)} ★
            </span>
          ) : null}
          {details.propertyLabel ? (
            <span className="text-xs border border-slate-200 dark:border-slate-700 rounded px-2 py-0.5">
              {details.propertyLabel}
            </span>
          ) : null}
          {locationText ? <span>{locationText}</span> : null}
        </div>
        {(addressLine1 || addressLine2) && (
          <div className="text-sm text-slate-600 dark:text-slate-300">
            {[addressLine1, addressLine2].filter(Boolean).join(", ")}
          </div>
        )}
      </div>

      {heroImage && (
        <div className="w-full h-60 sm:h-80 mb-6 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={heroImage}
            alt={name}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      {images.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-8">
          {images.map((img, idx) => (
            <div
              key={`${img.url}-${idx}`}
              className="aspect-[4/3] bg-slate-100 dark:bg-slate-800 rounded-lg overflow-hidden"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={img.url}
                alt={img.title || name}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="space-y-3">
          <h2 className="text-lg font-semibold">Overview</h2>
          {details.shortDesc ? (
            <p className="text-sm text-slate-700 dark:text-slate-300">{details.shortDesc}</p>
          ) : (
            <p className="text-sm text-slate-700 dark:text-slate-300">
              Explore this property and its amenities.
            </p>
          )}
          <div className="text-sm text-slate-700 dark:text-slate-300">
            {checkin && (
              <div>
                <span className="font-medium">Check-in:</span> {checkin}
              </div>
            )}
            {checkout && (
              <div>
                <span className="font-medium">Check-out:</span> {checkout}
              </div>
            )}
          </div>
        </div>

        {review && (
          <div className="space-y-3">
            <h2 className="text-lg font-semibold">Reviews & Ratings</h2>
            <div className="flex items-center gap-2">
              {typeof review.cumulativeRating === "number" && (
                <span className="inline-flex items-center gap-1 bg-emerald-600 text-white text-xs font-semibold px-2 py-0.5 rounded-full">
                  {Number(review.cumulativeRating).toFixed(1)}
                </span>
              )}
              {typeof review.reviewCount === "number" && (
                <span className="text-sm text-slate-600 dark:text-slate-300">
                  {review.reviewCount} reviews
                </span>
              )}
            </div>
            {hotel.ugcSummary?.data?.seekTagDetails?.seekTagSummary && (
              <p className="text-sm text-slate-700 dark:text-slate-300">
                {hotel.ugcSummary.data.seekTagDetails.seekTagSummary}
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}



