export function FlameDoodle({
  className = "",
  variant = "default",
}: {
  className?: string;
  variant?: "default" | "round";
}) {
  if (variant === "round") {
    return (
      <svg
        viewBox="0 0 120 120"
        aria-hidden="true"
        className={className}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M59.7 14.8c-1.6 8.2-7.8 12.5-10.7 19-2.6 5.8-2 11.6-.2 15.7-4.7-1.6-8.4-5.5-10.4-10.6-8.2 8.2-13.1 19.5-13.1 31.8 0 23 17.1 40.6 38.8 40.6 22.6 0 36.7-16.6 36.7-35.7 0-12.2-5.9-22.8-14.9-29.5.5 5.5-.9 10.2-3.9 13.7-1.7-8.3-7.1-14.6-10.7-20-3.2-4.8-4.1-10.2-1.6-14.9Z"
          stroke="currentColor"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M36.4 84.7c0-7.2 4.1-13.2 10.1-16.7-1.1 7.7 3.4 12.3 8.7 16-2.1-5.5-.8-12.4 4.2-16.7-.8 5.6 2.7 9.4 6.4 13 3.1 3 6.1 6.8 6.1 12.1 0 8.4-6.8 14.7-15.4 14.7-11.4 0-20.1-9.1-20.1-22.4Z"
          stroke="currentColor"
          strokeWidth="3.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M27.3 61.8c1.2-2.9 3.2-5.6 5.8-7.8"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M84.4 90.6c2.8-2.3 4.9-5.8 5.4-9.8"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M47.6 22.4c-1.8 2.5-3 5.3-3.6 8.3"
          stroke="currentColor"
          strokeWidth="2.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M70.9 18.4c1.2 2.4 3.1 4.7 5.4 6.3"
          stroke="currentColor"
          strokeWidth="2.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M22.4 46.8c1.7 1.9 2.7 4.4 2.8 7"
          stroke="currentColor"
          strokeWidth="2.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M92.6 49.8c1.5 1.8 2.6 3.9 3.1 6.2"
          stroke="currentColor"
          strokeWidth="2.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 120 120"
      aria-hidden="true"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M59.5 8.5c-2.3 9-9.2 12.4-12 19.8-2.5 6.4-1.5 12.7.6 17.4-9.6-1.7-14.8-10.7-14.4-20.2C18.8 37.6 11 51.8 11 67.3 11 90.4 29.3 107 52 107c18.9 0 35.2-11 41.3-28.4 6.8-19.3-1.6-39.8-18.2-49.7.7 6.4-.7 12.6-4.6 17.1-1.5-9.6-7.7-17.7-11-23.1-3.3-5.3-2.5-9.9 0-14.7Z"
        stroke="currentColor"
        strokeWidth="4.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M45.8 95.7c-8.1-2.9-13.7-10.6-13.7-19.4 0-7.3 3.5-13.8 9-18-1.4 9.9 4.4 15.2 10.8 19.6-2.9-6.6-1.2-15.1 4.8-20.1-1 7 3.2 11.4 7.5 15.7 3.3 3.4 6.7 7.5 6.7 13.4 0 8.6-7 15.5-15.8 15.5-3.4 0-6.5-.8-9.3-2.3Z"
        stroke="currentColor"
        strokeWidth="3.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M77.2 93.2c4.4-3.1 7.3-8.1 7.3-13.8 0-4.8-1.9-8.5-4.6-12.1 6 .9 10.6 6.2 10.6 12.7 0 6.4-4.4 12.2-10.8 13.2"
        stroke="currentColor"
        strokeWidth="3.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M31.2 89.8c-3.5-2.8-5.7-7.2-5.7-12 0-4.6 2-8.8 5.2-11.8"
        stroke="currentColor"
        strokeWidth="3.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M27.5 17.2c1.4-3.2 4.3-6.1 7.8-7.6"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M89.7 22.8c2.8 1.8 5 4.7 6.1 7.9"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
