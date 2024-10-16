import React from "react";
import { Banner, BannerProps } from "@basestack/design-system";
import { useTheme } from "styled-components";

export interface BannersItem extends BannerProps {
  isVisible: boolean;
}

export interface BannersProps {
  data: Array<BannersItem>;
}

const Banners = ({ data }: BannersProps) => {
  const theme = useTheme();

  return data.map((item, index, { length }) =>
    item.isVisible ? (
      <Banner
        key={index}
        variant={item.variant || "warning"}
        title={item.title}
        maxWidth={item.maxWidth || 1440}
        borderRadius={item.borderRadius || 0}
        isTranslucent={item.isTranslucent || true}
        mb={index + 1 === length ? 0 : theme.spacing.s1}
      />
    ) : null,
  );
};
export default Banners;
