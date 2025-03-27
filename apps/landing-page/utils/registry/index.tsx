"use client";

import React, { Fragment, useMemo } from "react";
import { usePathname } from "next/navigation";
// Registries
import StyledComponentsRegistry from "./StyledComponentsRegistry";
// Components
import { Toaster } from "sonner";
import GlobalNavigation from "components/GlobalNavigation";
import Footer from "components/Footer";
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
      <Fragment>
        {hasGlobalNavigation && <GlobalNavigation isSticky={!isProductPage} />}
        {children}
        <Footer />
      </Fragment>
      <Toaster visibleToasts={9} closeButton={false} />
    </StyledComponentsRegistry>
  );
};

export default Registry;
