import type { SVGProps } from 'react';

const CircleWarningIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none" {...props}>
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 8.45v4M12 21a9 9 0 1 1 0-18 9 9 0 0 1 0 18zm.05-5.55v.1h-.1v-.1h.1z"
    />
  </svg>
);

export default CircleWarningIcon;
