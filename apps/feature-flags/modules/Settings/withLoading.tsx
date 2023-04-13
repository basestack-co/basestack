import React from "react";
// Types
import { Project } from "types";
// Design System
import { Loader, Skeleton } from "@basestack/design-system";

export interface Props {
  project: Project;
}

const withLoading =
  <T extends Props>(Component: React.ElementType) =>
  (props: Props) => {
    if (!props.project) {
      return (
        <Loader>
          <Skeleton
            items={[
              { h: 24, w: "15%", mb: 10 },
              { h: 18, w: "40%", mb: 20 },
              { h: 100, w: "100%", mb: 20 },
              { h: 1, w: "100%", mb: 16 },
              { h: 36, w: 120, mb: 0, ml: "auto" },
            ]}
            padding={20}
          />
        </Loader>
      );
    }
    return <Component {...props} />;
  };

withLoading.displayName = "withLoading";

export default withLoading;
