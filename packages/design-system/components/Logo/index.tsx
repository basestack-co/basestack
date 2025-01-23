export interface LogoProps {
  size?: number;
  product?: "flags" | "forms" | "company";
}

const FlagsLogo = ({ size }: { size: number }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 36 36"
    fill="none"
  >
    <rect width="36" height="36" rx="4" fill="black" />
    <g clipPath="url(#clip0_1217_2525)">
      <path
        d="M20.4 12L20.16 10.8C20.07 10.34 19.66 10 19.18 10H12C11.45 10 11 10.45 11 11V26C11 26.55 11.45 27 12 27C12.55 27 13 26.55 13 26V20H18.6L18.84 21.2C18.93 21.67 19.34 22 19.82 22H25C25.55 22 26 21.55 26 21V13C26 12.45 25.55 12 25 12H20.4Z"
        fill="white"
      />
    </g>
    <defs>
      <clipPath id="clip0_1217_2525">
        <rect width="24" height="24" fill="white" transform="translate(6 6)" />
      </clipPath>
    </defs>
  </svg>
);

const FormsLogo = ({ size }: { size: number }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 36 36"
    fill="none"
  >
    <rect width="36" height="36" rx="4" fill="black" />
    <g clipPath="url(#clip0_1217_2529)">
      <path
        d="M25 9H11C9.9 9 9 9.9 9 11V25C9 26.1 9.9 27 11 27H25C26.1 27 27 26.1 27 25V11C27 9.9 26.1 9 25 9ZM19 23H14C13.45 23 13 22.55 13 22C13 21.45 13.45 21 14 21H19C19.55 21 20 21.45 20 22C20 22.55 19.55 23 19 23ZM22 19H14C13.45 19 13 18.55 13 18C13 17.45 13.45 17 14 17H22C22.55 17 23 17.45 23 18C23 18.55 22.55 19 22 19ZM22 15H14C13.45 15 13 14.55 13 14C13 13.45 13.45 13 14 13H22C22.55 13 23 13.45 23 14C23 14.55 22.55 15 22 15Z"
        fill="white"
      />
    </g>
    <defs>
      <clipPath id="clip0_1217_2529">
        <rect width="24" height="24" fill="white" transform="translate(6 6)" />
      </clipPath>
    </defs>
  </svg>
);

const CompanyLogo = ({ size }: { size: number }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 36 36"
    fill="none"
  >
    <rect width="36" height="36" rx="4" fill="black" />
    <g clipPath="url(#clip0_1217_2529)">
      <path
        d="M25 9H11C9.9 9 9 9.9 9 11V25C9 26.1 9.9 27 11 27H25C26.1 27 27 26.1 27 25V11C27 9.9 26.1 9 25 9ZM19 23H14C13.45 23 13 22.55 13 22C13 21.45 13.45 21 14 21H19C19.55 21 20 21.45 20 22C20 22.55 19.55 23 19 23ZM22 19H14C13.45 19 13 18.55 13 18C13 17.45 13.45 17 14 17H22C22.55 17 23 17.45 23 18C23 18.55 22.55 19 22 19ZM22 15H14C13.45 15 13 14.55 13 14C13 13.45 13.45 13 14 13H22C22.55 13 23 13.45 23 14C23 14.55 22.55 15 22 15Z"
        fill="white"
      />
    </g>
    <defs>
      <clipPath id="clip0_1217_2529">
        <rect width="24" height="24" fill="white" transform="translate(6 6)" />
      </clipPath>
    </defs>
  </svg>
);

const Logo = ({ size = 42, product = "flags" }: LogoProps) => {
  if (product === "company") {
    return <CompanyLogo size={size} />;
  }

  if (product === "forms") {
    return <FormsLogo size={size} />;
  }

  return <FlagsLogo size={size} />;
};

export default Logo;
