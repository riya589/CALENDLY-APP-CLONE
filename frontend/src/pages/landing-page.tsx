import {
  ArrowRight,
  BriefcaseBusiness,
  CalendarClock,
  CalendarDays,
  CheckCircle2,
  Clock3,
  MonitorSmartphone,
  Mail,
  MessageSquareText,
  MonitorPlay,
  MoveRight,
  Users
} from "lucide-react";
import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";

const trustedBrands = [
  {
    name: "Compass",
    src: "https://mma.prnewswire.com/media/599202/Compass_Logo.jpg?p=facebook",
    widthClassName: "w-[170px]"
  },
  {
    name: "L'Oréal",
    src: "https://1000logos.net/wp-content/uploads/2017/03/Loreal-Logo-1914.png",
    widthClassName: "w-[170px]"
  },
  {
    name: "Zendesk",
    src: "https://cdn.simpleicons.org/zendesk/113b67",
    widthClassName: "w-[170px]"
  },
  {
    name: "Dropbox",
    src: "https://cdn.simpleicons.org/dropbox/113b67",
    widthClassName: "w-[180px]"
  },
  {
    name: "Gong",
    src: "https://joshbraun.com/wp-content/uploads/2022/08/gong-logo.png",
    widthClassName: "w-[150px]"
  },
  {
    name: "Carnival",
    src: "https://logonoid.com/images/carnival-logo.png",
    widthClassName: "w-[180px]"
  },
  {
    name: "Indiana University",
    src: "https://cdn.freelogovectors.net/wp-content/uploads/2023/04/indiana-university-logo-03-freelogovectors.net_.png",
    widthClassName: "w-[220px]"
  }
];

const integrationIcons = [
  { name: "Zoom", src: "https://static.vecteezy.com/system/resources/previews/016/716/466/non_2x/zoom-meeting-icon-free-png.png" },
  { name: "Salesforce", src: "https://img.icons8.com/color/1200/salesforce.jpg" },
  { name: "Google Calendar", src: "https://static.vecteezy.com/system/resources/previews/022/613/030/original/google-calendar-icon-logo-symbol-free-png.png" },
  { name: "Slack", src: "https://freepnglogo.com/images/all_img/1707837044slack-icon-png.png" },
  { name: "Teams", src: "https://static.vecteezy.com/system/resources/previews/027/179/374/original/microsoft-teams-icon-logo-symbol-free-png.png" },
  { name: "Gmail", src: "https://static.vecteezy.com/system/resources/previews/022/484/516/original/google-mail-gmail-icon-logo-symbol-free-png.png" },
  { name: "Outlook", src: "https://static.vecteezy.com/system/resources/previews/029/824/490/large_2x/microsoft-outlook-logo-transparent-free-png.png" },
  { name: "Chrome", src: "https://www.pngmart.com/files/23/Google-Chrome-Logo-PNG-1.png" },
  { name: "Webex", src: "https://cdn.freelogovectors.net/wp-content/uploads/2023/05/webex-logo-freelogovectors.net_.png" },
  { name: "HubSpot", src: "https://cdn-icons-png.flaticon.com/512/5968/5968872.png" },
  { name: "Notion", src: "https://cdn.creazilla.com/icons/3270344/notion-icon-md.png" },
  { name: "Linear", src: "https://cdn.simpleicons.org/linear/5E6AD2" },
  { name: "LinkedIn", src: "https://static.vecteezy.com/system/resources/previews/018/910/721/non_2x/linkedin-logo-linkedin-symbol-linkedin-icon-free-free-vector.jpg" },
  { name: "Stripe", src: "https://freelogopng.com/images/all_img/1685814539stripe-icon-png.png" },
  { name: "Intercom", src: "https://upload.wikimedia.org/wikipedia/en/b/b1/Intercom_Logo_Vertical_Black.png" },
  { name: "PayPal", src: "https://cdn4.iconfinder.com/data/icons/logos-and-brands/512/250_Paypal_logo-512.png" }
];

const calendarSetupSteps = [
  {
    title: "Connect your calendars",
    description: "Calendly connects up to six calendars to automate scheduling with real-time availability."
  },
  {
    title: "Add your availability",
    description: "Set recurring weekly hours so invitees only see times that actually work for you."
  },
  {
    title: "Connect conferencing tools",
    description: "Automatically attach a meeting location and reduce manual coordination."
  },
  {
    title: "Customize your event types",
    description: "Offer the right meeting length and experience for demos, intros, and interviews."
  },
  {
    title: "Share your scheduling link",
    description: "Send a polished public link and let invitees book the right slot without back-and-forth."
  }
];

const availabilitySteps = [
  {
    title: "Connect your calendars",
    description: "Keep your calendar in sync so invitees always see your latest availability."
  },
  {
    title: "Add your availability",
    description: "Keep invitees informed of your availability. Take control with weekly hours, buffers, and scheduling rules."
  },
  {
    title: "Connect conferencing tools",
    description: "Automatically attach a meeting location and reduce manual coordination."
  },
  {
    title: "Customize your event types",
    description: "Offer the right meeting length and experience for intros, strategy calls, and interviews."
  },
  {
    title: "Share your scheduling link",
    description: "Send a polished public link and let invitees book the right slot without back-and-forth."
  }
];

const featureCards = [
  {
    icon: BriefcaseBusiness,
    title: "Browser extensions",
    description: "Quickly find and share scheduling links from your inbox, LinkedIn, CRM, and more."
  },
  {
    icon: MessageSquareText,
    title: "Automated reminders",
    description: "Reduce no-shows and keep meetings moving with clean follow-ups and reminders."
  },
  {
    icon: CalendarClock,
    title: "Team coordination",
    description: "Use event types, availability, and booking links to keep hiring and client workflows organized."
  }
];

const pricingCards = [
  {
    name: "Free",
    subtitle: "For personal use",
    price: "Always free",
    cta: "Get started",
    featured: false
  },
  {
    name: "Standard",
    subtitle: "For professionals and small teams",
    price: "$10 /seat/mo",
    cta: "Get started",
    featured: false
  },
  {
    name: "Teams",
    subtitle: "For growing businesses",
    price: "$16 /seat/mo",
    cta: "Try for Free",
    featured: true
  },
  {
    name: "Enterprise",
    subtitle: "For large companies",
    price: "Starts at $15k /yr",
    cta: "Talk to sales",
    featured: false
  }
];

const storyCards = [
  { stat: "169 %", title: "return on investment", cta: "Read now" },
  { stat: "160 %", title: "increase in customers reached", cta: "Read now" },
  { stat: "20 %", title: "decrease in scheduling errors", cta: "Read now" },
  { stat: "8 days", title: "reduction in time-to-hire", cta: "Read now" },
  { stat: "26 %", title: "increase in website bookings", cta: "Read now" }
];

const securityBadges = ["SOC 2", "PCI DSS", "GDPR", "CCPA", "CSA STAR", "ISO 27001"];

export function LandingPage() {
  return (
    <div className="bg-white">
      <section className="overflow-hidden border-b border-slate-200 bg-white">
        <div className="page-shell pb-16 pt-12 sm:pb-20 sm:pt-16 lg:pt-20">
          <div className="grid items-center gap-12 lg:grid-cols-[430px_minmax(0,1fr)] lg:gap-14">
          <div className="max-w-[430px]">
            <h1 className="text-[3.35rem] font-extrabold leading-[0.98] tracking-[-0.05em] text-foreground sm:text-[4rem] lg:text-[4.7rem]">
              Easy scheduling ahead
            </h1>
            <p className="mt-8 max-w-[390px] text-[1rem] leading-8 text-slate-500 sm:mt-10 sm:text-[1.1rem] sm:leading-9">
              Join 20 million professionals who easily book meetings with the #1 scheduling tool.
            </p>

            <div className="mt-10 space-y-4">
              <Link
                to="/dashboard"
                className="flex w-full max-w-[332px] items-center justify-center gap-4 rounded-2xl bg-primary px-6 py-4 text-left text-[1.05rem] font-semibold text-white shadow-lg shadow-blue-100"
              >
                <span className="rounded-xl bg-white p-2">
                  <img
                    src="https://imagepng.org/wp-content/uploads/2019/08/google-icon.png"
                    alt="Google"
                    className="h-7 w-7"
                  />
                </span>
                Sign up with Google
              </Link>
              <Link
                to="/dashboard"
                className="flex w-full max-w-[332px] items-center justify-center gap-4 rounded-2xl bg-[#113b67] px-6 py-4 text-left text-[1.05rem] font-semibold text-white"
              >
                <span className="rounded-xl bg-white p-2">
                  <span className="grid h-7 w-7 grid-cols-2 gap-1">
                    <span className="rounded-[2px] bg-[#f25022]" />
                    <span className="rounded-[2px] bg-[#7fba00]" />
                    <span className="rounded-[2px] bg-[#00a4ef]" />
                    <span className="rounded-[2px] bg-[#ffb900]" />
                  </span>
                </span>
                Sign up with Microsoft
              </Link>
            </div>

            <div className="mt-7 flex w-full max-w-[332px] items-center gap-4 text-sm font-medium uppercase tracking-[0.28em] text-slate-400">
              <div className="h-px flex-1 bg-slate-200" />
              OR
              <div className="h-px flex-1 bg-slate-200" />
            </div>

            <div className="mt-10 flex flex-wrap gap-4">
              <Button asChild size="lg">
                <Link to="/dashboard">Get Started</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/book/30-minute-meeting">Preview Booking Flow</Link>
              </Button>
            </div>
          </div>

          <div id="product" className="relative min-w-0 overflow-x-auto pb-2 lg:overflow-visible">
            <div className="relative z-10 min-w-[860px] overflow-hidden rounded-[34px] border border-slate-200 bg-white shadow-[0_28px_80px_rgba(15,39,71,0.12)] lg:ml-auto lg:w-[860px]">
              <div className="border-b border-slate-200 px-10 py-8">
                <h2 className="text-[2rem] font-bold tracking-tight text-foreground">Share your booking page</h2>
              </div>

              <div className="grid grid-cols-[275px_295px_290px]">
                <div className="border-r border-slate-200 px-10 py-10">
                  <p className="text-base font-semibold text-slate-500">ACME Inc.</p>
                  <div className="mt-12 flex items-center gap-4">
                    <img
                      src="https://i.pinimg.com/736x/0d/42/60/0d42600cd00d2c9fcc16885048043a19.jpg"
                      alt="Organizer avatar"
                      className="h-14 w-14 rounded-full object-cover"
                    />
                    <div>
                      <p className="text-base text-slate-500">Riya Roy</p>
                      <h3 className="text-[1.05rem] font-bold text-foreground">Client Check-in</h3>
                    </div>
                  </div>

                  <div className="mt-10 space-y-4 text-sm text-slate-500">
                    <div className="flex items-center gap-2">
                      <Clock3 className="h-4 w-4" />
                      30 min
                    </div>
                    <div className="flex items-center gap-2">
                      <MonitorPlay className="h-4 w-4" />
                      Zoom
                    </div>
                  </div>

                  <div className="mt-10 space-y-4">
                    <div className="h-2.5 rounded-full bg-slate-100" />
                    <div className="h-2.5 w-5/6 rounded-full bg-slate-100" />
                    <div className="h-2.5 w-4/6 rounded-full bg-slate-100" />
                    <div className="h-2.5 w-3/6 rounded-full bg-slate-100" />
                  </div>
                </div>

                <div className="border-r border-slate-200 px-8 py-10">
                  <div className="text-center">
                    <p className="text-[1.05rem] font-semibold text-foreground">Select a Date & Time</p>
                  </div>
                  <div className="mt-6 flex items-center justify-center gap-6 text-sm font-medium text-slate-600">
                    <button type="button">‹</button>
                    <span>July 2024</span>
                    <button type="button" className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-50 text-primary">›</button>
                  </div>

                  <div className="mt-8 grid grid-cols-7 gap-y-4 text-center text-[11px] font-medium text-slate-500">
                    {["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"].map((label) => (
                      <div key={label}>{label}</div>
                    ))}

                    {Array.from({ length: 35 }).map((_, index) => {
                      const day = index - 1;
                      const selected = [16, 17, 19, 22, 23, 24, 25, 30, 31].includes(day);

                      return (
                        <div
                          key={index}
                          className={`mx-auto flex h-9 w-9 items-center justify-center rounded-full text-sm ${
                            selected ? "bg-secondary font-semibold text-primary" : "text-slate-600"
                          }`}
                        >
                          {day > 0 && day < 32 ? day : ""}
                        </div>
                      );
                    })}
                  </div>

                  <div className="mt-8 text-sm text-slate-500">Timezone</div>
                  <div className="mt-2 flex items-center gap-2 text-[13px] font-medium text-foreground">
                    <Clock3 className="h-3.5 w-3.5 text-primary" />
                    Eastern time - US & Canada
                  </div>
                </div>

                <div className="px-10 py-10">
                  <p className="text-base font-semibold text-slate-500">Monday, July 22</p>
                  <div className="mt-8 space-y-3">
                    {["10:00am", "11:00am", "1:00pm", "2:30pm", "4:00pm"].map((time, index) => (
                      <div key={time} className="grid grid-cols-[1fr_auto] gap-2">
                        <button
                          type="button"
                          className={`rounded-md border px-4 py-3 text-sm font-semibold ${
                            index === 1
                              ? "border-[#5f7797] bg-[#5f7797] text-white"
                              : "border-blue-300 text-primary"
                          }`}
                        >
                          {time}
                        </button>
                        {index === 1 ? (
                          <button
                            type="button"
                            className="rounded-md bg-primary px-4 py-3 text-sm font-semibold text-white"
                          >
                            Confirm
                          </button>
                        ) : null}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          </div>
        </div>
      </section>

      <section className="border-b border-slate-100 py-6 sm:py-8">
        <div className="relative overflow-hidden">
          <div className="page-shell relative">
            <p className="text-center text-[1.1rem] text-slate-500">
              Trusted by more than <span className="font-bold text-foreground">100,000</span> of the world's leading organizations
            </p>
            <div className="mt-10 overflow-hidden">
              <div className="animate-trusted-marquee flex min-w-max items-center gap-20 whitespace-nowrap">
                {[...trustedBrands, ...trustedBrands].map((brand, index) => (
                  <div
                    key={`${brand.name}-${index}`}
                    className={`flex h-14 items-center justify-center ${brand.widthClassName}`}
                  >
                    <img
                      src={brand.src}
                      alt={brand.name}
                      className="max-h-12 w-full object-contain object-center"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-spacing bg-white">
        <div className="page-shell max-w-5xl text-center">
          <h2 className="text-[2.6rem] font-extrabold leading-[1.08] tracking-[-0.04em] text-foreground sm:text-[3.4rem] lg:text-[4.7rem]">
            Calendly makes scheduling simple
          </h2>
          <p className="mx-auto mt-6 max-w-4xl text-[1rem] leading-8 text-slate-500 sm:mt-8 sm:text-[1.08rem] sm:leading-9 lg:text-[1.15rem]">
            Calendly&apos;s easy enough for individual users, and powerful enough to meet the needs of enterprise organizations - including 86% of the Fortune 500 companies.
          </p>
          <Button className="mt-10" asChild size="lg">
            <Link to="/dashboard">Sign up for free</Link>
          </Button>
        </div>
      </section>

      <section id="solutions" className="section-spacing border-y border-slate-100 bg-white">
        <div className="page-shell grid gap-12 lg:grid-cols-[0.92fr_1.08fr] lg:items-start">
          <div className="space-y-1">
            {calendarSetupSteps.map((step, index) => (
              <div key={step.title} className="border-b border-slate-200 py-6 sm:py-8">
                <div className={`flex items-center gap-4 ${index === 0 ? "text-foreground" : "text-slate-300"}`}>
                  <div
                    className={`h-12 w-12 rounded-2xl ${
                      index === 0
                        ? "bg-blue-50"
                        : index === 1
                          ? "bg-violet-100"
                          : index === 2
                            ? "bg-fuchsia-100"
                            : index === 3
                              ? "bg-orange-100"
                              : "bg-emerald-100"
                    }`}
                  />
                  <h3 className="text-[1rem] font-semibold sm:text-[1.05rem]">{step.title}</h3>
                </div>
                <p className={`mt-4 max-w-xl text-[0.96rem] leading-7 sm:mt-5 sm:text-[1rem] sm:leading-8 ${index === 0 ? "text-slate-500" : "text-slate-300"}`}>
                  {step.description}
                </p>
                {index === 0 ? <div className="mt-8 h-1.5 w-3/4 rounded-full bg-primary" /> : null}
              </div>
            ))}
          </div>

          <div className="relative overflow-hidden rounded-[28px] bg-gradient-to-br from-[#d149f3] via-[#c84cf2] to-[#1698f7] p-1 shadow-soft sm:rounded-[32px] lg:rounded-[36px]">
            <div className="absolute inset-y-0 left-[10%] w-24 rounded-full bg-[#1b45ff]" />
            <div className="absolute inset-y-0 right-[-40px] w-40 rounded-full bg-[#1698f7]" />

            <div className="relative rounded-[24px] bg-white px-5 py-5 sm:rounded-[28px] sm:px-6 sm:py-6 lg:rounded-[32px] lg:px-8 lg:py-8">
              <div className="flex flex-wrap gap-3 sm:gap-4">
                <div className="rounded-full bg-secondary px-4 py-2 text-sm font-semibold text-primary">Availability</div>
                <div className="px-4 py-2 text-sm font-semibold text-foreground">Connect existing calendar</div>
              </div>

              <div className="mt-6 space-y-4 rounded-[22px] border border-slate-200 bg-white p-5 sm:mt-8 sm:space-y-6 sm:rounded-[28px] sm:p-6 lg:p-8">
                <div className="rounded-[20px] border border-slate-200 p-5 sm:rounded-[24px] sm:p-6">
                  <div className="flex items-center gap-4 text-[1.45rem] font-bold text-foreground sm:text-[1.7rem] lg:text-[2rem]">
                    <img
                      src="https://static.vecteezy.com/system/resources/previews/022/613/030/original/google-calendar-icon-logo-symbol-free-png.png"
                      alt="Google Calendar"
                      className="h-8 w-8"
                    />
                    Google
                  </div>
                  <div className="mt-4 rounded-2xl border border-slate-200 px-4 py-4 text-[1rem] text-slate-600 sm:mt-5 sm:px-5 sm:py-5 sm:text-[1.15rem] lg:text-[1.35rem]">
                    Google calendars
                  </div>
                </div>

                <div className="rounded-[20px] border border-slate-200 p-5 sm:rounded-[24px] sm:p-6">
                  <div className="flex items-center gap-4 text-[1.45rem] font-bold text-foreground sm:text-[1.7rem] lg:text-[2rem]">
                    <img
                      src="https://img.icons8.com/fluent/1200/microsoft-outlook-2019.jpg"
                      alt="Microsoft Outlook"
                      className="h-8 w-8"
                    />
                    Microsoft
                  </div>
                  <div className="mt-5 space-y-3">
                      <div className="rounded-2xl border border-slate-200 px-4 py-4 text-[1rem] text-slate-600 sm:px-5 sm:py-5 sm:text-[1.15rem] lg:text-[1.35rem]">
                      Outlook calendars
                    </div>
                      <div className="rounded-2xl border border-slate-200 px-4 py-4 text-[1rem] text-slate-600 sm:px-5 sm:py-5 sm:text-[1.15rem] lg:text-[1.35rem]">
                      Exchange calendars
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-spacing bg-white">
        <div className="page-shell grid gap-12 lg:grid-cols-[0.92fr_1.08fr] lg:items-start">
          <div className="space-y-1">
            {availabilitySteps.map((step, index) => (
              <div key={step.title} className="border-b border-slate-200 py-6 sm:py-8">
                <div className={`flex items-center gap-4 ${index === 1 ? "text-foreground" : "text-slate-300"}`}>
                  <div
                    className={`h-12 w-12 rounded-2xl ${
                      index === 0
                        ? "bg-blue-50"
                        : index === 1
                          ? "bg-violet-100"
                          : index === 2
                            ? "bg-fuchsia-100"
                            : index === 3
                              ? "bg-orange-100"
                              : "bg-emerald-100"
                    }`}
                  />
                  <h3 className="text-[1rem] font-semibold sm:text-[1.05rem]">{step.title}</h3>
                </div>
                <p className={`mt-4 max-w-xl text-[0.96rem] leading-7 sm:mt-5 sm:text-[1rem] sm:leading-8 ${index <= 1 ? "text-slate-500" : "text-slate-300"}`}>
                  {step.description}
                </p>
                {index === 1 ? <div className="mt-8 h-1.5 w-3/5 rounded-full bg-violet-500" /> : null}
              </div>
            ))}
          </div>

          <div className="relative overflow-hidden rounded-[28px] bg-gradient-to-br from-[#1de48d] via-[#24d58e] to-[#6d39ff] p-1 shadow-soft sm:rounded-[32px] lg:rounded-[36px]">
            <div className="absolute inset-y-0 left-[18%] w-32 rounded-full bg-[#123f85]" />
            <div className="absolute inset-y-0 right-[-40px] w-40 rounded-full bg-[#6e33ff]" />

            <div className="relative rounded-[24px] bg-white px-5 py-5 sm:rounded-[28px] sm:px-6 sm:py-6 lg:rounded-[32px] lg:px-8 lg:py-8">
              <div className="flex flex-wrap gap-3 sm:gap-4">
                <div className="rounded-full bg-secondary px-4 py-2 text-sm font-semibold text-primary">Availability</div>
                <div className="px-4 py-2 text-sm font-semibold text-foreground">Meeting hours</div>
              </div>

              <div className="mt-6 rounded-[22px] border border-slate-200 bg-white p-5 sm:mt-8 sm:rounded-[28px] sm:p-6 lg:p-8">
                <div className="flex items-center gap-3 text-[1.2rem] font-bold text-foreground sm:text-[1.4rem] lg:text-[1.55rem]">
                  <CalendarClock className="h-6 w-6 text-slate-500" />
                  Weekly hours
                </div>
                <p className="mt-2 text-base text-slate-500">Set when you are typically available for meetings</p>

                <div className="mt-6 space-y-4 sm:mt-8 sm:space-y-5">
                  {[
                    ["S", "Unavailable"],
                    ["M", "9:00 am", "4:30 pm"],
                    ["T", "Unavailable"],
                    ["W", "9:30 am", "5:00 pm"],
                    ["Th", "10:00 am", "6:00 pm"],
                    ["F", "10:00 am", "3:00 pm"],
                    ["S", "Unavailable"]
                  ].map((row) => (
                    <div key={row.join("-")} className="grid grid-cols-[52px_1fr] items-center gap-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#0e57a7] text-sm font-bold text-white">
                        {row[0]}
                      </div>
                      {row.length === 2 ? (
                        <div className="text-base text-slate-500">{row[1]}</div>
                      ) : (
                        <div className="grid grid-cols-[1fr_auto_1fr] gap-3">
                          <div className="rounded-2xl bg-slate-50 px-4 py-3 text-center text-base text-slate-700">{row[1]}</div>
                          <div className="flex items-center text-slate-300">-</div>
                          <div className="rounded-2xl bg-slate-50 px-4 py-3 text-center text-base text-slate-700">{row[2]}</div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="resources" className="section-spacing bg-white">
        <div className="page-shell">
          <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-start">
            <h2 className="max-w-4xl text-[2.7rem] font-extrabold leading-[1.08] tracking-[-0.04em] text-foreground sm:text-[3.5rem] lg:text-[4.8rem]">
              Connect Calendly to the tools you already use
            </h2>
            <div className="space-y-4 text-left lg:pt-6">
              <p className="text-[1rem] text-slate-500 sm:text-[1.1rem] lg:text-[1.2rem]">Boost productivity with 100+ integrations</p>
              <a href="#resources" className="flex items-center gap-3 text-[1rem] font-semibold text-foreground transition hover:text-primary sm:text-[1.05rem]">
                View all integrations
                <MoveRight className="h-6 w-6" />
              </a>
            </div>
          </div>

          <div className="mt-10 grid grid-cols-2 gap-3 sm:mt-12 sm:grid-cols-3 sm:gap-5 lg:grid-cols-4 xl:grid-cols-8">
            {integrationIcons.map((item) => (
              <div
                key={item.name}
                className="flex aspect-square items-center justify-center rounded-[20px] border border-slate-200 bg-white p-4 text-center shadow-sm sm:rounded-[24px]"
              >
                <img src={item.src} alt={item.name} className="h-12 w-12 sm:h-16 sm:w-16" />
              </div>
            ))}
          </div>

          <div className="mt-8 grid gap-4 sm:mt-10 sm:gap-5 lg:grid-cols-2">
            {[
              {
                title: "Google suite",
                description: "Get your job done faster by connecting Calendly to Google apps and workflows."
              },
              {
                title: "Microsoft suite",
                description: "Make your day easier with Calendly integrations for Microsoft products and services."
              }
            ].map((item) => (
              <div key={item.title} className="rounded-[26px] border border-slate-200 bg-white p-6 shadow-sm sm:rounded-[34px] sm:p-8">
                <div className="flex items-start justify-between">
                  <div>
                    <img
                      src={item.title === "Google suite"
                        ? "https://imagepng.org/wp-content/uploads/2019/08/google-icon.png"
                        : "http://purepng.com/public/uploads/large/purepng.com-microsoft-logo-iconlogobrand-logoiconslogos-251519939091wmudn.png"}
                      alt={item.title}
                      className="mb-6 h-12 w-12"
                    />
                    <h3 className="text-[1.55rem] font-bold tracking-tight text-foreground sm:text-[2rem]">{item.title}</h3>
                  </div>
                  <MoveRight className="h-7 w-7 text-foreground" />
                </div>
                <p className="mt-5 max-w-xl text-[0.96rem] leading-7 text-slate-500 sm:mt-6 sm:text-[1rem] sm:leading-8">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-spacing bg-white">
        <div className="page-shell max-w-5xl text-center">
          <h2 className="text-[2.65rem] font-extrabold leading-[1.08] tracking-[-0.04em] text-foreground sm:text-[3.4rem] lg:text-[4.8rem]">
            More than a scheduling link
          </h2>
          <p className="mx-auto mt-6 max-w-4xl text-[1rem] leading-8 text-slate-500 sm:mt-8 sm:text-[1.08rem] sm:leading-9 lg:text-[1.15rem]">
            Calendly&apos;s functionality goes way beyond just a scheduling link, with customizable, automated features to help you and your team achieve goals faster.
          </p>
          <Button className="mt-10" asChild size="lg">
            <Link to="/dashboard">Sign up for free</Link>
          </Button>
        </div>

          <div className="page-shell mt-10 grid gap-6 sm:mt-16 lg:grid-cols-[1.08fr_0.92fr]">
          <div className="overflow-hidden rounded-[28px] bg-gradient-to-br from-[#d84cf3] via-[#c548f3] to-[#6c35ff] p-1 sm:rounded-[36px]">
            <div className="h-full rounded-[24px] bg-[#eef4fb] p-5 sm:rounded-[32px] sm:p-8">
              <div className="rounded-[24px] bg-white p-5 shadow-soft sm:rounded-[30px] sm:p-8">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="h-14 w-14 rounded-full border-4 border-primary" />
                    <div className="h-4 w-4 rounded-full bg-slate-300" />
                  </div>
                  <Button size="lg">+ Create</Button>
                </div>
                <div className="mt-7 rounded-2xl border-2 border-dashed border-primary px-4 py-4 text-sm font-semibold text-primary sm:mt-10 sm:px-6 sm:py-5 sm:text-base">
                  24 hours before event starts
                </div>
                <div className="mx-auto mt-4 h-12 w-px border-l-2 border-dashed border-primary" />
                <div className="rounded-2xl bg-slate-100 px-4 py-4 text-sm font-semibold text-slate-700 sm:px-6 sm:py-5 sm:text-base">
                  Send text to invitees
                </div>
              </div>
            </div>
          </div>

          <div className="grid gap-4 sm:gap-5">
            {featureCards.map((item) => (
              <div key={item.title} className="rounded-[24px] border border-slate-200 bg-white p-6 shadow-sm sm:rounded-[30px] sm:p-8">
                <item.icon className="h-10 w-10 text-primary" />
                <h3 className="mt-5 text-[1.55rem] font-bold tracking-tight text-foreground sm:mt-6 sm:text-[2rem]">{item.title}</h3>
                <p className="mt-3 text-[0.96rem] leading-7 text-slate-500 sm:mt-4 sm:text-[1rem] sm:leading-8">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="pricing" className="section-spacing border-t border-slate-100 bg-white">
        <div className="page-shell">
          <div className="max-w-3xl">
            <h2 className="text-[2.75rem] font-extrabold leading-[1.08] tracking-[-0.04em] text-foreground sm:text-[3.5rem] lg:text-[4.7rem]">
              Pick the perfect plan for your team
            </h2>
            <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-slate-600 sm:mt-8 sm:gap-6 sm:text-base">
              <div className="flex items-center gap-3">
                <span className="h-6 w-6 rounded-full border-2 border-primary p-1">
                  <span className="block h-full w-full rounded-full bg-primary" />
                </span>
                Billed yearly
              </div>
              <div className="flex items-center gap-3">
                <span className="h-6 w-6 rounded-full border-2 border-slate-400" />
                Billed monthly
              </div>
            </div>
          </div>

          <div className="mt-10 grid gap-4 sm:mt-12 sm:gap-6 lg:grid-cols-4">
            {pricingCards.map((card) => (
              <div key={card.name} className="relative rounded-[24px] border border-slate-200 bg-white p-6 shadow-soft sm:rounded-[30px] sm:p-8">
                {card.featured ? (
                  <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-white">
                    Recommended plan
                  </div>
                ) : null}
                <h3 className="text-[1.7rem] font-bold text-foreground sm:text-[2rem]">{card.name}</h3>
                <p className="mt-3 text-base text-slate-500">{card.subtitle}</p>
                <p className="mt-10 text-[2.2rem] font-bold tracking-tight text-foreground sm:mt-12 sm:text-[2.75rem]">{card.price}</p>
                <Button className={`mt-10 w-full ${card.name === "Free" ? "bg-[#113b67] hover:bg-[#0e3154]" : ""}`}>
                  {card.cta}
                </Button>
              </div>
            ))}
          </div>

          <a href="#pricing" className="mt-8 inline-flex items-center gap-3 text-[1rem] font-semibold text-foreground sm:mt-10 sm:text-[1.1rem]">
            Learn more on our pricing page
            <ArrowRight className="h-6 w-6" />
          </a>
        </div>
      </section>

      <section className="border-t border-slate-100 bg-white py-16 sm:py-20">
        <div className="page-shell">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-slate-400">Customer stories</p>
              <h2 className="mt-5 text-[2.55rem] font-extrabold leading-[1.08] tracking-[-0.04em] text-foreground sm:text-[3.2rem] lg:text-[4.2rem]">
                Discover how businesses grow with Calendly
              </h2>
              <p className="mt-6 max-w-xl text-[1rem] leading-8 text-slate-500">
                From recruiting to revenue teams, organizations use automated scheduling to remove friction and move faster.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {storyCards.map((card) => (
                <div key={card.title} className="rounded-[26px] border border-slate-200 bg-white p-6 shadow-sm sm:p-7">
                  <div className="text-[2.25rem] font-extrabold tracking-tight text-foreground">{card.stat}</div>
                  <p className="mt-3 text-[1rem] leading-7 text-slate-500">{card.title}</p>
                  <button type="button" className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-foreground">
                    {card.cta}
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-slate-100 bg-slate-50 py-16 sm:py-20">
        <div className="page-shell">
          <div className="grid gap-10 lg:grid-cols-[1fr_0.92fr] lg:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-slate-400">Security</p>
              <h2 className="mt-5 text-[2.55rem] font-extrabold leading-[1.08] tracking-[-0.04em] text-foreground sm:text-[3.2rem] lg:text-[4.1rem]">
                Built to keep your organization secure
              </h2>
              <p className="mt-6 max-w-2xl text-[1rem] leading-8 text-slate-500">
                Calendly-style scheduling works best when it is dependable, private, and easy to govern. This clone keeps the architecture clean and interview-ready while reflecting that same trust-first product language.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                {securityBadges.map((badge) => (
                  <div
                    key={badge}
                    className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm"
                  >
                    {badge}
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[30px] border border-slate-200 bg-white p-6 shadow-soft sm:p-8">
              <div className="grid gap-4 sm:grid-cols-2">
                {[
                  {
                    icon: CheckCircle2,
                    title: "Clear scheduling rules",
                    description: "Availability, event types, and bookings are validated consistently on both frontend and backend."
                  },
                  {
                    icon: MonitorSmartphone,
                    title: "Modern product shell",
                    description: "The dashboard, public booking flow, and landing page follow a polished SaaS structure."
                  },
                  {
                    icon: Users,
                    title: "Admin-ready workflows",
                    description: "Meetings, event management, and availability settings are organized for a single default admin."
                  },
                  {
                    icon: CalendarDays,
                    title: "Reliable booking flow",
                    description: "Slot generation and double-booking prevention are handled in the backend before creating meetings."
                  }
                ].map((item) => (
                  <div key={item.title} className="rounded-[22px] border border-slate-200 bg-slate-50 p-5">
                    <item.icon className="h-8 w-8 text-primary" />
                    <h3 className="mt-4 text-[1.15rem] font-bold text-foreground">{item.title}</h3>
                    <p className="mt-3 text-sm leading-7 text-slate-500">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-slate-100 bg-slate-50 py-12 sm:py-16">
        <div className="page-shell">
          <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-slate-400">Workflows</p>
              <h2 className="mt-5 text-[2.7rem] font-extrabold leading-[1.08] tracking-[-0.04em] text-foreground sm:text-[3.4rem] lg:text-[4.1rem]">
                Reduce no-shows and stay on track
              </h2>
              <p className="mt-6 max-w-xl text-[1.05rem] leading-8 text-slate-500">
                Add reminders and follow-ups to your scheduling experience so invitees stay informed before and after every meeting.
              </p>
            </div>

            <div className="rounded-[26px] border border-slate-200 bg-white p-5 shadow-soft sm:rounded-[34px] sm:p-8">
              <h3 className="text-[1.6rem] font-bold tracking-tight text-foreground sm:text-[2rem]">Workflow automations</h3>
              <div className="mt-6 grid gap-4 sm:mt-8 sm:gap-5 md:grid-cols-2">
                <div className="rounded-[24px] border border-slate-200 p-5 sm:rounded-[28px] sm:p-6">
                  <div className="rounded-full bg-secondary px-4 py-2 text-sm font-semibold text-primary">Workflow</div>
                  <p className="mt-6 text-[1.7rem] font-bold text-foreground">Send text reminder</p>
                  <div className="mt-6 rounded-2xl border-2 border-primary px-4 py-4 text-center text-base font-semibold text-foreground">
                    24 hours before event starts
                  </div>
                  <div className="mx-auto mt-4 h-10 w-px border-l-2 border-dashed border-primary" />
                  <div className="rounded-2xl bg-slate-100 px-4 py-4 text-center text-base font-semibold text-slate-700">
                    Send text to invitees
                  </div>
                </div>

                <div className="rounded-[24px] border border-slate-200 p-5 sm:rounded-[28px] sm:p-6">
                  <div className="rounded-full bg-secondary px-4 py-2 text-sm font-semibold text-primary">Workflow</div>
                  <p className="mt-6 text-[1.7rem] font-bold text-foreground">Send follow-up email</p>
                  <div className="mt-6 rounded-2xl border-2 border-primary px-4 py-4 text-center text-base font-semibold text-foreground">
                    2 hours after event ends
                  </div>
                  <div className="mx-auto mt-4 h-10 w-px border-l-2 border-dashed border-primary" />
                  <div className="rounded-2xl bg-slate-100 px-4 py-4 text-center text-base font-semibold text-slate-700">
                    Send email to invitees
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-10 grid gap-4 sm:mt-12 sm:gap-6 lg:grid-cols-3">
            {[
              {
                icon: CheckCircle2,
                title: "Submission-ready foundation",
                description: "A clean full-stack codebase with modular backend APIs, database design, and polished frontend flows."
              },
              {
                icon: Users,
                title: "Interview-friendly architecture",
                description: "Each feature is split into routes, controllers, services, validators, reusable UI components, and typed API modules."
              },
              {
                icon: Mail,
                title: "Focused product experience",
                description: "The app covers event management, availability, booking logic, meeting management, and a strong public-facing experience."
              }
            ].map((item) => (
              <div key={item.title} className="rounded-[24px] border border-slate-200 bg-white p-6 shadow-sm sm:rounded-[28px] sm:p-8">
                <item.icon className="h-10 w-10 text-primary" />
                <h3 className="mt-5 text-[1.35rem] font-bold tracking-tight text-foreground sm:mt-6 sm:text-[1.65rem]">{item.title}</h3>
                <p className="mt-4 text-base leading-8 text-slate-500">{item.description}</p>
              </div>
            ))}
          </div>

        </div>
      </section>

      <section className="border-t border-slate-100 bg-white py-16 sm:py-20">
        <div className="page-shell">
          <div className="rounded-[34px] bg-[#0f2e57] px-8 py-12 text-center text-white shadow-soft sm:px-12 sm:py-16">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-blue-200">Final call to action</p>
            <h2 className="mx-auto mt-5 max-w-4xl text-[2.5rem] font-extrabold leading-[1.08] tracking-[-0.04em] sm:text-[3.2rem] lg:text-[4rem]">
              Power up your scheduling
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-[1rem] leading-8 text-blue-100">
              Explore the dashboard, try the public booking flow, and walk through the end-to-end scheduling experience just like a lightweight Calendly clone.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Button asChild size="lg" className="bg-white text-[#0f2e57] hover:bg-slate-100">
                <Link to="/dashboard">Start for free</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white/30 bg-transparent text-white hover:bg-white/10">
                <Link to="/book/30-minute-meeting">Get a demo</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
