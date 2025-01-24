import { useTheme } from "styled-components";

export interface LogoProps {
  size?: number;
  product?: "flags" | "forms" | "company";
  isOnDark?: boolean;
}

export interface LogoSvgProps {
  size: number;
  color: string;
  backgroundColor: string;
}

const FlagsLogo = ({ size, color, backgroundColor }: LogoSvgProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 36 36"
    fill="none"
  >
    <rect width="36" height="36" rx="4" fill={backgroundColor} />
    <g clipPath="url(#clip0_1217_2525)">
      <path
        d="M20.4 12L20.16 10.8C20.07 10.34 19.66 10 19.18 10H12C11.45 10 11 10.45 11 11V26C11 26.55 11.45 27 12 27C12.55 27 13 26.55 13 26V20H18.6L18.84 21.2C18.93 21.67 19.34 22 19.82 22H25C25.55 22 26 21.55 26 21V13C26 12.45 25.55 12 25 12H20.4Z"
        fill={color}
      />
    </g>
    <defs>
      <clipPath id="clip0_1217_2525">
        <rect width="24" height="24" fill={color} transform="translate(6 6)" />
      </clipPath>
    </defs>
  </svg>
);

const FormsLogo = ({ size, color, backgroundColor }: LogoSvgProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 36 36"
    fill="none"
  >
    <rect width="36" height="36" rx="4" fill={backgroundColor} />
    <g clipPath="url(#clip0_1217_2529)">
      <path
        d="M25 9H11C9.9 9 9 9.9 9 11V25C9 26.1 9.9 27 11 27H25C26.1 27 27 26.1 27 25V11C27 9.9 26.1 9 25 9ZM19 23H14C13.45 23 13 22.55 13 22C13 21.45 13.45 21 14 21H19C19.55 21 20 21.45 20 22C20 22.55 19.55 23 19 23ZM22 19H14C13.45 19 13 18.55 13 18C13 17.45 13.45 17 14 17H22C22.55 17 23 17.45 23 18C23 18.55 22.55 19 22 19ZM22 15H14C13.45 15 13 14.55 13 14C13 13.45 13.45 13 14 13H22C22.55 13 23 13.45 23 14C23 14.55 22.55 15 22 15Z"
        fill={color}
      />
    </g>
    <defs>
      <clipPath id="clip0_1217_2529">
        <rect width="24" height="24" fill={color} transform="translate(6 6)" />
      </clipPath>
    </defs>
  </svg>
);

const CompanyLogo = ({ size, color, backgroundColor }: LogoSvgProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 36 36"
    fill="none"
  >
    <rect width="36" height="36" rx="4" fill={backgroundColor} />
    <path
      d="M18 19.725C17.8333 19.725 17.6708 19.7042 17.5125 19.6625C17.3542 19.6208 17.2 19.5583 17.05 19.475L8.6 14.875C8.41667 14.775 8.2875 14.65 8.2125 14.5C8.1375 14.35 8.1 14.1833 8.1 14C8.1 13.8167 8.1375 13.65 8.2125 13.5C8.2875 13.35 8.41667 13.225 8.6 13.125L17.05 8.52499C17.2 8.44166 17.3542 8.37916 17.5125 8.33749C17.6708 8.29583 17.8333 8.27499 18 8.27499C18.1667 8.27499 18.3292 8.29583 18.4875 8.33749C18.6458 8.37916 18.8 8.44166 18.95 8.52499L27.4 13.125C27.5833 13.225 27.7125 13.35 27.7875 13.5C27.8625 13.65 27.9 13.8167 27.9 14C27.9 14.1833 27.8625 14.35 27.7875 14.5C27.7125 14.65 27.5833 14.775 27.4 14.875L18.95 19.475C18.8 19.5583 18.6458 19.6208 18.4875 19.6625C18.3292 19.7042 18.1667 19.725 18 19.725ZM18 17.725L24.825 14L18 10.275L11.175 14L18 17.725ZM18 21.725L25.85 17.45C25.8833 17.4333 26.0417 17.3917 26.325 17.325C26.6083 17.325 26.8458 17.4208 27.0375 17.6125C27.2292 17.8042 27.325 18.0417 27.325 18.325C27.325 18.5083 27.2833 18.675 27.2 18.825C27.1167 18.975 26.9833 19.1 26.8 19.2L18.95 23.475C18.8 23.5583 18.6458 23.6208 18.4875 23.6625C18.3292 23.7042 18.1667 23.725 18 23.725C17.8333 23.725 17.6708 23.7042 17.5125 23.6625C17.3542 23.6208 17.2 23.5583 17.05 23.475L9.2 19.2C9.01667 19.1 8.88333 18.975 8.8 18.825C8.71667 18.675 8.675 18.5083 8.675 18.325C8.675 18.0417 8.77083 17.8042 8.9625 17.6125C9.15417 17.4208 9.39167 17.325 9.675 17.325C9.75833 17.325 9.8375 17.3375 9.9125 17.3625C9.9875 17.3875 10.0667 17.4167 10.15 17.45L18 21.725ZM18 25.725L25.85 21.45C25.8833 21.4333 26.0417 21.3917 26.325 21.325C26.6083 21.325 26.8458 21.4208 27.0375 21.6125C27.2292 21.8042 27.325 22.0417 27.325 22.325C27.325 22.5083 27.2833 22.675 27.2 22.825C27.1167 22.975 26.9833 23.1 26.8 23.2L18.95 27.475C18.8 27.5583 18.6458 27.6208 18.4875 27.6625C18.3292 27.7042 18.1667 27.725 18 27.725C17.8333 27.725 17.6708 27.7042 17.5125 27.6625C17.3542 27.6208 17.2 27.5583 17.05 27.475L9.2 23.2C9.01667 23.1 8.88333 22.975 8.8 22.825C8.71667 22.675 8.675 22.5083 8.675 22.325C8.675 22.0417 8.77083 21.8042 8.9625 21.6125C9.15417 21.4208 9.39167 21.325 9.675 21.325C9.75833 21.325 9.8375 21.3375 9.9125 21.3625C9.9875 21.3875 10.0667 21.4167 10.15 21.45L18 25.725Z"
      fill={color}
    />
  </svg>
);

const Logo = ({
  size = 42,
  product = "flags",
  isOnDark = false,
}: LogoProps) => {
  const theme = useTheme();

  const backgroundColor = isOnDark ? theme.colors.gray600 : theme.colors.black;
  const color = isOnDark ? theme.colors.gray200 : theme.colors.white;

  const logoComponents = {
    company: CompanyLogo,
    forms: FormsLogo,
    flags: FlagsLogo,
  };

  const SelectedLogo = logoComponents[product] || FlagsLogo;

  return (
    <SelectedLogo size={size} backgroundColor={backgroundColor} color={color} />
  );
};

export default Logo;
