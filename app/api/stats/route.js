import { NextResponse } from "next/server";
import { FLOORS, publicStats, todayKey, updateRecord } from "../../../lib/statsStore";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const cookieBase = {
  httpOnly: true,
  sameSite: "lax",
  path: "/",
  secure: process.env.NODE_ENV === "production"
};

function fallbackBody() {
  return {
    visitors: FLOORS.visitors,
    contracts: FLOORS.contracts,
    daily: FLOORS.daily,
    recommends: 0
  };
}

export async function POST(request) {
  try {
    const body = await request.json().catch(() => ({}));
    const action = body?.action === "recommend" ? "recommend" : "visit";
    const cookie = request.headers.get("cookie") || "";
    const seenVisitor = /(?:^|;\s*)ah_visitor=1(?:;|$)/.test(cookie);
    const dayMatch = cookie.match(/(?:^|;\s*)ah_day=([^;]+)/);
    const seenDay = dayMatch ? decodeURIComponent(dayMatch[1]) : "";
    const today = todayKey();
    const knownVisitor = seenVisitor || body?.knownVisitor === true;
    const knownDay = seenDay === today || body?.knownDay === today;

    const record = await updateRecord((row) => {
      const next = { ...row };
      if (action === "recommend") {
        next.recommends += 1;
        return next;
      }
      if (!knownVisitor) next.visitors += 1;
      if (!knownDay) next.daily += 1;
      return next;
    });

    const response = NextResponse.json(publicStats(record));
    if (action === "visit") {
      if (!seenVisitor) {
        response.cookies.set("ah_visitor", "1", { ...cookieBase, maxAge: 60 * 60 * 24 * 400 });
      }
      if (seenDay !== today) {
        response.cookies.set("ah_day", today, { ...cookieBase, maxAge: 60 * 60 * 36 });
      }
    }
    return response;
  } catch (error) {
    console.error(error);
    const message = error instanceof Error ? error.message : "stats update failed";
    const note = message.replace(/vercel_blob_\S+/g, "vercel_blob").slice(0, 180);
    return NextResponse.json({ ...fallbackBody(), note });
  }
}
