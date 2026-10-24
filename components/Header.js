"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import Clover from "./Clover";
import TokyoNow from "./TokyoNow";
import { nav, profile } from "../lib/content";

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="site-header">
      <div className="header-center">
      <Link href="/" className="brand" onClick={() => setOpen(false)}>
        <Clover />
        <span>
          <strong>{profile.name}</strong>
          <small>ポートフォリオ</small>
        </span>
      </Link>
      <nav id="site-nav" className={open ? "open" : ""} aria-label="主要">
        {nav.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            aria-current={pathname === item.href ? "page" : undefined}
            onClick={() => setOpen(false)}
          >
            {item.label}
          </Link>
        ))}
      </nav>
      </div>
      <TokyoNow />
      <button
        className="menu-toggle"
        type="button"
        aria-expanded={open}
        aria-controls="site-nav"
        onClick={() => setOpen((value) => !value)}
      >
        {open ? "閉じる" : "メニュー"}
      </button>
    </header>
  );
}
