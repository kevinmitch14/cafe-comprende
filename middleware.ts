import { NextRequest, NextResponse } from "next/server";

// run only on homepage
export const config = {
  matcher: "/",
};

export async function middleware(req: NextRequest) {
  const { nextUrl: url, geo } = req;
  const ip = req.ip || "";
  const country = geo?.country || "US";
  const city = geo?.city || "San Francisco";
  const region = geo?.region || "CA";
  const latitude = geo?.latitude || "52.7751";
  const longitude = geo?.longitude || "12.4193";

  url.searchParams.set("ip", ip);
  url.searchParams.set("country", country);
  url.searchParams.set("city", city);
  url.searchParams.set("region", region);
  url.searchParams.set("latitude", latitude);
  url.searchParams.set("longitude", longitude);
  return NextResponse.rewrite(url);
}
