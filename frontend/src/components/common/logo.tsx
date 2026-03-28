import { Link } from "react-router-dom";

export function Logo() {
  return (
    <Link to="/" className="inline-flex items-center gap-3 text-primary">
      <svg
        viewBox="0 0 56 56"
        aria-hidden="true"
        className="h-11 w-11 shrink-0"
      >
        <circle cx="28" cy="28" r="26" fill="none" stroke="currentColor" strokeWidth="3" />
        <circle cx="28" cy="28" r="17" fill="none" stroke="currentColor" strokeWidth="3" />
        <path
          d="M41 18.5h-9.5a9.5 9.5 0 1 0 0 19H38"
          fill="none"
          stroke="currentColor"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span className="text-[2.05rem] font-medium tracking-[-0.045em] text-primary">
        Calendly
      </span>
    </Link>
  );
}
