"use client";

import Footer from "components/Footer";
import GlobalNavigation from "components/GlobalNavigation";
import { usePathname } from "next/navigation";
import { useMemo } from "react";
// Components
import { Toaster } from "sonner";
// Registries
import StyledComponentsRegistry from "./StyledComponentsRegistry";
// Fonts
import "material-symbols/rounded.css";

const Registry = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const isProductPage = useMemo(
    () => pathname.includes("/product"),
    [pathname],
  );

  const hasGlobalNavigation = useMemo(
    () =>
      !["/legal/privacy", "/legal/cookies", "/legal/terms"].includes(pathname),
    [pathname],
  );

  return (
    <StyledComponentsRegistry>
      {hasGlobalNavigation && <GlobalNavigation isSticky={!isProductPage} />}
      {children}
      <Footer />
      <Toaster visibleToasts={9} closeButton={false} />
    </StyledComponentsRegistry>
  );
};

export default Registry;
