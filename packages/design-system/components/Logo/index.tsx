export interface LogoProps {
  size?: number;
}

const Logo = ({ size = 42 }: LogoProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 36 36"
    fill="none"
  >
    <rect width="36" height="36" rx="4" fill="black" />
    <g clipPath="url(#clip0_3_10)">
      <path
        d="M20.4 12L20.16 10.8C20.07 10.34 19.66 10 19.18 10H12C11.45 10 11 10.45 11 11V26C11 26.55 11.45 27 12 27C12.55 27 13 26.55 13 26V20H18.6L18.84 21.2C18.93 21.67 19.34 22 19.82 22H25C25.55 22 26 21.55 26 21V13C26 12.45 25.55 12 25 12H20.4Z"
        fill="white"
      />
    </g>
    <defs>
      <clipPath id="clip0_3_10">
        <rect width="24" height="24" fill="white" transform="translate(6 6)" />
      </clipPath>
    </defs>
  </svg>
);

export default Logo;
