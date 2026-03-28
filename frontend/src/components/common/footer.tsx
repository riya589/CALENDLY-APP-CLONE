import { ChevronDown, Facebook, Globe, Instagram, Linkedin, Youtube } from "lucide-react";
import { Link } from "react-router-dom";

import { Logo } from "@/components/common/logo";

const footerColumns = [
  {
    title: "Product",
    links: [
      "Scheduling automation",
      "Meeting Notetaker",
      "Payments",
      "Customizable availability",
      "Mobile apps",
      "Browser extensions",
      "Meeting routing",
      "Event Types",
      "Email & website embeds",
      "Reminders & follow-ups",
      "Meeting polls",
      "Analytics",
      "Admin management"
    ]
  },
  {
    title: "Integrations",
    links: [
      "Google ecosystem",
      "Microsoft ecosystem",
      "Calendars",
      "Video conferencing",
      "Payment processors",
      "Sales & CRM",
      "Recruiting & ATS",
      "Email messaging",
      "Embed Calendly",
      "Analytics",
      "API & connectors",
      "Security & compliance"
    ]
  },
  {
    title: "Calendly",
    links: [
      "Pricing",
      "Product overview",
      "Solutions",
      "For individuals",
      "For small businesses",
      "For large companies",
      "Compare",
      "Security",
      "Sign up for free",
      "Talk to sales",
      "Get a demo"
    ]
  },
  {
    title: "Resources",
    links: [
      "Help center",
      "Resource center",
      "Blog",
      "Customer stories",
      "Calendly community",
      "Developer tools",
      "Release notes"
    ]
  },
  {
    title: "Company",
    links: [
      "About us",
      "Leadership",
      "Careers",
      "Newsroom",
      "Become a partner",
      "Contact us"
    ]
  }
];

const downloadLinks = [
  { name: "App Store", src: "https://cdn.simpleicons.org/apple/000000" },
  { name: "Google Play", src: "https://static.vecteezy.com/system/resources/previews/022/484/501/original/google-play-store-icon-logo-symbol-free-png.png" },
  { name: "Chrome extension", src: "https://www.pngmart.com/files/23/Google-Chrome-Logo-PNG-1.png" },
  { name: "Edge extension", src: "https://img.icons8.com/color/1200/ms-edge-new.jpg" },
  { name: "Firefox extension", src: "https://www.freeiconspng.com/uploads/mozilla-firefox-icon-4.png" },
  { name: "Safari extension", src: "https://cdn.simpleicons.org/safari/006CFF" },
  { name: "Outlook add-in", src: "https://static.vecteezy.com/system/resources/previews/029/824/490/large_2x/microsoft-outlook-logo-transparent-free-png.png" }
];

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="page-shell py-16">
        <Logo />
        <div className="mt-10 grid gap-10 md:grid-cols-2 xl:mt-12 xl:grid-cols-5">
          {footerColumns.map((column) => (
            <div key={column.title}>
              <h3 className="text-lg font-semibold text-foreground">{column.title}</h3>
              <div className="mt-5 space-y-3">
                {column.links.map((link) => (
                  <Link key={link} className="block text-sm text-slate-600 transition hover:text-primary" to="/">
                    {link}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="mt-12">
          <h3 className="text-lg font-semibold text-foreground sm:text-xl">Downloads</h3>
          <div className="mt-5 flex flex-wrap gap-3">
            {downloadLinks.map((item) => (
              <div
                key={item.name}
                className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-foreground"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white shadow-sm">
                  <img src={item.src} alt={item.name} className="h-5 w-5" />
                </div>
                {item.name}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10 border-t border-slate-200 pt-8">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <button type="button" className="inline-flex items-center gap-2 text-sm font-semibold text-foreground">
              <Globe className="h-4 w-4 text-primary" />
              English
              <ChevronDown className="h-4 w-4" />
            </button>

            <div className="flex flex-wrap items-center gap-4 text-sm text-slate-600 lg:justify-center">
              {["Privacy Policy", "Legal", "Status", "Cookie Settings", "Your Privacy Choices"].map((item) => (
                <Link key={item} to="/" className="transition hover:text-primary">
                  {item}
                </Link>
              ))}
            </div>

            <div className="flex items-center gap-4 text-slate-500">
              {[Facebook, Instagram, Linkedin, Youtube].map((Icon, index) => (
                <button key={index} type="button" className="transition hover:text-primary">
                  <Icon className="h-5 w-5" />
                </button>
              ))}
            </div>
          </div>
          <div className="mt-6 text-sm text-slate-500 lg:text-right">Copyright Calendly 2026</div>
        </div>
      </div>
    </footer>
  );
}
