import type { SVGProps } from 'react';

const CaretDownIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none" {...props}>
    <path d="M8 10L12 14L16 10" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export default CaretDownIcon;
