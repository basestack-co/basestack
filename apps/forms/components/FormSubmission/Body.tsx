import React, {
  useEffect,
  useRef,
  useState,
  useMemo,
  useCallback,
} from "react";
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
// Server
import { trpc } from "libs/trpc";
// Toast
import { toast } from "sonner";
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

const Body = ({
  isOpen,
  data,
  metadata,
  blockIpAddresses,
  formId,
}: FormSubmissionBodyProps) => {
  const trpcUtils = trpc.useUtils();
  const { t } = useTranslation("forms");
  const [showMetadata, setShowMetadata] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  const updateForm = trpc.form.update.useMutation();

  const [style, animate] = useSpring(
    () => ({
      opacity: 0,
      height: 0,
      config: { duration: 200 },
    }),
    [],
  );

  const isIpBlocked = useMemo(() => {
    if (!metadata) return false;
    return (blockIpAddresses ?? "").includes(metadata.ip);
  }, [blockIpAddresses, metadata]);

  const ips = useMemo(() => {
    if (blockIpAddresses) {
      return blockIpAddresses.split(",");
    }

    return [];
  }, [blockIpAddresses]);

  const getFormattedMetaData = useMemo(() => {
    if (!metadata) return [];

    const order: Record<string, number> = {
      ip: -1,
      referer: 0,
      acceptLanguage: 1,
      userAgent: 2,
    };

    return Object.entries(metadata)
      .filter(([name]) => !["acceptLanguage", "userAgent"].includes(name))
      .map(([name, value]) => ({
        id: name,
        name:
          name === "ip"
            ? name.toUpperCase()
            : name.charAt(0).toUpperCase() + name.slice(1),
        value,
      }))
      .sort((a, b) => (order[a.id] || Infinity) - (order[b.id] || Infinity));
  }, [metadata]);

  useEffect(() => {
    if (contentRef.current) {
      animate.start({
        height: isOpen ? contentRef.current.offsetHeight + 20 : 0,
        opacity: isOpen ? 1 : 0,
      });
    }
  }, [animate, isOpen, showMetadata]);

  const onBlockIp = useCallback(
    (ip: string) => {
      if (formId) {
        const ipsValues = ips.filter((item) => item !== ip);
        const blockIpAddresses = (
          isIpBlocked ? ipsValues : [...(ipsValues ?? []), ip]
        ).join(",");

        updateForm.mutate(
          {
            formId,
            blockIpAddresses,
            feature: "hasBlockIPs",
          },
          {
            onSuccess: (result) => {
              const cache = trpcUtils.form.byId.getData({
                formId: result.form.id,
              });

              if (cache) {
                trpcUtils.form.byId.setData(
                  { formId: result.form.id },
                  {
                    ...cache,
                    blockIpAddresses: result.form.blockIpAddresses,
                  },
                );
              }

              toast.success(
                t(
                  `submission.metadata.ip.success.${isIpBlocked ? "unblock" : "block"}`,
                ),
              );
            },
            onError: (error) => {
              toast.error(error.message);
            },
          },
        );
      }
    },
    [t, updateForm, formId, trpcUtils, isIpBlocked, ips],
  );

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

        {getFormattedMetaData.length > 0 && (
          <MetadataContainer>
            <Text muted>{t("submission.metadata.title")}</Text>
            <MetadataTags>
              {getFormattedMetaData
                .slice(0, showMetadata ? getFormattedMetaData.length : 1)
                .map((item, index) => (
                  <Label
                    key={index}
                    variant="light"
                    size="small"
                    text={`${item.name}: ${item.value}`}
                    minHeight={rem("32px")}
                  >
                    {item.id === "ip" && (
                      <Tooltip placement="top">
                        <TooltipTrigger>
                          <IconButton
                            variant="secondary"
                            size="small"
                            icon={isIpBlocked ? "cancel" : "block"}
                            onClick={() => onBlockIp(item.value)}
                            isDisabled={updateForm.isLoading}
                          />
                        </TooltipTrigger>
                        <TooltipContent>
                          {isIpBlocked
                            ? t("submission.metadata.ip.unblock")
                            : t("submission.metadata.ip.block")}
                        </TooltipContent>
                      </Tooltip>
                    )}
                  </Label>
                ))}
              {getFormattedMetaData.length > 1 && (
                <Label
                  variant="light"
                  size="small"
                  text={
                    showMetadata
                      ? t("submission.metadata.expand.less")
                      : `+${getFormattedMetaData.length - 1}`
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
