import { useMemo, Fragment } from "react";
// Context
import { useFlagsContext } from "../hooks/useFlagsContext";

export interface Props {
  children?: React.ReactNode;
  name: string;
}

const Flag = ({ children, name }: Props) => {
  const { sdk } = useFlagsContext();

  const show = useMemo(() => {
    const flag = sdk.flag(name);
    return sdk.isInitialized && flag.enabled;
  }, [sdk, name]);

  return show ? <Fragment>{children}</Fragment> : null;
};

export default Flag;
