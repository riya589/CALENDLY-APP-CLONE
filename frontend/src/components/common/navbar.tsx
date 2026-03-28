import { ChevronDown, Globe, Link2, Lock, Menu, NotebookPen, PanelsTopLeft, Puzzle, Smartphone, X } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

import { Logo } from "@/components/common/logo";
import { Button } from "@/components/ui/button";
import { navLinks } from "@/lib/constants";

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur">
      <div className="border-b border-slate-100 bg-slate-50">
        <div className="page-shell flex h-12 items-center justify-end gap-6 text-sm font-medium text-slate-600">
          <button type="button" className="hidden items-center gap-1 transition hover:text-primary md:inline-flex">
            <Globe className="h-4 w-4" />
            English
            <ChevronDown className="h-4 w-4" />
          </button>
          <a href="#pricing" className="transition hover:text-primary">
            Talk to sales
          </a>
        </div>
      </div>
      <div className="border-b border-slate-200">
        <div className="page-shell flex h-16 items-center justify-between gap-4 md:h-20 md:gap-8">
          <Logo />
          <nav className="hidden items-center gap-9 lg:flex">
            <div className="group relative">
              <button
                type="button"
                className="flex items-center gap-1 text-sm font-medium text-foreground transition hover:text-primary"
              >
                Product
                <ChevronDown className="h-4 w-4" />
              </button>
              <div className="pointer-events-none absolute left-1/2 top-full z-50 hidden w-[760px] -translate-x-[38%] pt-6 group-hover:block group-hover:pointer-events-auto">
                <div className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-[0_22px_80px_rgba(15,39,71,0.14)]">
                  <div className="grid md:grid-cols-[1fr_320px]">
                    <div className="p-8">
                      <div className="mb-6 inline-flex rounded-2xl bg-secondary px-4 py-2 text-sm font-semibold text-primary">
                        Product
                      </div>
                      <div className="space-y-6">
                        {[
                          {
                            icon: Link2,
                            title: "Scheduling",
                            description: "Simplified booking",
                            href: "#product"
                          },
                          {
                            icon: NotebookPen,
                            title: "Notetaker",
                            description: "Meeting recaps and action items",
                            href: "#resources"
                          },
                          {
                            icon: PanelsTopLeft,
                            title: "Product overview",
                            description: "Why choose Calendly",
                            href: "#solutions"
                          }
                        ].map((item) => (
                          <a key={item.title} href={item.href} className="flex items-center gap-4 rounded-2xl transition hover:bg-slate-50">
                            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-50 to-sky-100 text-primary">
                              <item.icon className="h-7 w-7" />
                            </div>
                            <div>
                              <div className="text-[1.05rem] font-semibold text-foreground">{item.title}</div>
                              <div className="mt-1 text-sm text-slate-500">{item.description}</div>
                            </div>
                          </a>
                        ))}
                      </div>
                    </div>
                    <div className="bg-slate-50 p-8">
                      <h3 className="text-[1.15rem] font-semibold text-slate-500">Platform</h3>
                      <div className="mt-6 space-y-5">
                        {[
                          { icon: Puzzle, label: "Integrations", href: "#resources" },
                          { icon: Smartphone, label: "Mobile app", href: "#resources" },
                          { icon: Globe, label: "Browser extension", href: "#pricing" },
                          { icon: PanelsTopLeft, label: "Admin controls", href: "/dashboard" },
                          { icon: Lock, label: "Security", href: "#pricing" }
                        ].map((item) => (
                          <a
                            key={item.label}
                            href={item.href}
                            className="flex items-center gap-4 rounded-2xl text-[1.05rem] font-medium text-foreground transition hover:text-primary"
                          >
                            <item.icon className="h-5 w-5 text-primary" />
                            {item.label}
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {navLinks.slice(1).map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="flex items-center gap-1 text-sm font-medium text-foreground transition hover:text-primary"
              >
                {link.label}
                {link.label !== "Pricing" ? <ChevronDown className="h-4 w-4" /> : null}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <Link className="hidden text-sm font-semibold text-foreground md:inline-flex" to="/dashboard">
              Log In
            </Link>
            <Button asChild size="lg" className="hidden sm:inline-flex">
              <Link to="/dashboard">Get Started</Link>
            </Button>
            <button
              type="button"
              className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-foreground transition hover:bg-slate-50 lg:hidden"
              onClick={() => setMobileOpen((current) => !current)}
              aria-label="Toggle navigation"
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {mobileOpen ? (
        <div className="border-b border-slate-200 bg-white lg:hidden">
          <div className="page-shell py-5">
            <div className="grid gap-2">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="rounded-2xl px-4 py-3 text-sm font-semibold text-foreground transition hover:bg-slate-50"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              <Link
                to="/dashboard"
                className="rounded-2xl px-4 py-3 text-sm font-semibold text-foreground transition hover:bg-slate-50"
                onClick={() => setMobileOpen(false)}
              >
                Log In
              </Link>
              <Button asChild className="mt-2 w-full">
                <Link to="/dashboard" onClick={() => setMobileOpen(false)}>
                  Get Started
                </Link>
              </Button>
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}
