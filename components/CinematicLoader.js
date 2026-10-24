"use client";

import dynamic from "next/dynamic";

const CinematicApp = dynamic(() => import("./CinematicApp"), {
  ssr: false,
  loading: () => <div className="cine cine-void" />
});

export default function CinematicLoader() {
  return <CinematicApp />;
}
