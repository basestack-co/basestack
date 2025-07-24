import { rem } from "polished";
import React, { Fragment, useState } from "react";
import { useTheme } from "styled-components";
import IconButton from "../IconButton";
import Text from "../Text";

const TextVisibility = ({ title }: { title: string }) => {
  const theme = useTheme();
  const [isEyeVisible, setIsEyeVisible] = useState(false);

  const renderDots = () =>
    Array.from(Array(title.length).keys()).map((item) => (
      <Fragment key={item}>•</Fragment>
    ));

  return (
    <>
      <IconButton
        onClick={() => setIsEyeVisible((prevState) => !prevState)}
        icon={isEyeVisible ? "visibility_off" : "visibility"}
        variant="neutral"
        mr={theme.spacing.s2}
        size="small"
      />
      <Text
        fontWeight="400"
        lineHeight={rem("22px")}
        size={isEyeVisible ? "small" : "large"}
      >
        {isEyeVisible ? title : renderDots()}
      </Text>
    </>
  );
};

export default TextVisibility;
