import React, { useEffect, useRef, useState } from "react";
import { rem } from "polished";
import { animated, useSpring } from "react-spring";
// Locales
import useTranslation from "next-translate/useTranslation";
// Components
import {
  Text,
  Label,
  IconButton,
  TooltipTrigger,
  TooltipContent,
  Tooltip,
} from "@basestack/design-system";
// Types
import { FormSubmissionBodyProps } from "./types";
// styles
import {
  BodyContainer,
  BodyValue,
  BodyWrapper,
  Box,
  MetadataContainer,
  MetadataTags,
} from "./styles";

const AnimatedBody = animated(BodyContainer);

const Body = ({ isOpen, data, metadata }: FormSubmissionBodyProps) => {
  const { t } = useTranslation("forms");
  const [showMetadata, setShowMetadata] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  const [style, animate] = useSpring(
    () => ({
      opacity: 0,
      height: 0,
      config: { duration: 200 },
    }),
    [],
  );

  useEffect(() => {
    if (contentRef.current) {
      animate.start({
        height: isOpen ? contentRef.current.offsetHeight + 20 : 0,
        opacity: isOpen ? 1 : 0,
      });
    }
  }, [animate, isOpen, showMetadata]);

  const metadataArray = Object.entries(metadata)
    .map(([name, value]) => {
      if (name === "ip") {
        return { id: name, name: name.toUpperCase(), value: value };
      } else {
        return {
          id: name,
          name: name.charAt(0).toUpperCase() + name.slice(1),
          value: value,
        };
      }
    })
    .sort((a, b) => {
      const order = ["ip", "referer", "acceptLanguage", "userAgent"];
      return order.indexOf(a.id) - order.indexOf(b.id);
    });

  return (
    <AnimatedBody style={style}>
      <BodyWrapper ref={contentRef}>
        {data.map((item, index) => (
          <Box
            key={index}
            display="flex"
            flexDirection="column"
            alignItems="flex-start"
          >
            <Text muted>{item.title}</Text>
            <BodyValue>
              <Text>{item.description}</Text>
            </BodyValue>
          </Box>
        ))}

        {metadataArray.length > 0 && (
          <MetadataContainer>
            <Text muted>{t("submission.metadata.title")}</Text>
            <MetadataTags>
              {metadataArray
                .slice(0, showMetadata ? metadataArray.length : 1)
                .map((item, index) => (
                  <Label
                    key={index}
                    variant="light"
                    size="small"
                    text={`${item.name}: ${item.value}`}
                    minHeight={rem("32px")}
                  >
                    {item.id === "ip" ? (
                      <Tooltip placement="top">
                        <TooltipTrigger>
                          <IconButton
                            variant="secondary"
                            size="small"
                            icon="block"
                            onClick={() => console.log("")}
                          />
                        </TooltipTrigger>
                        <TooltipContent>
                          {t("submission.metadata.ip.block")}
                        </TooltipContent>
                      </Tooltip>
                    ) : null}
                  </Label>
                ))}
              {metadataArray.length > 1 && (
                <Label
                  variant="light"
                  size="small"
                  text={
                    showMetadata
                      ? t("submission.metadata.expand.less")
                      : `+${metadataArray.length - 1}`
                  }
                  minHeight={rem("32px")}
                >
                  <IconButton
                    variant="secondary"
                    size="small"
                    icon={showMetadata ? "chevron_left" : "chevron_right"}
                    onClick={() => setShowMetadata((prevState) => !prevState)}
                  />
                </Label>
              )}
            </MetadataTags>
          </MetadataContainer>
        )}
      </BodyWrapper>
    </AnimatedBody>
  );
};

export default Body;
