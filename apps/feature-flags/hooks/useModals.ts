import { useContext } from "react";
import { ModalsContext } from "contexts/modals";
import { Context } from "contexts/modals/types";

const useModals = (): Context => {
  const context = useContext(ModalsContext);
  if (context === undefined) {
    throw new Error(`useModals must be used within a ModalsContextProvider.`);
  }
  return context;
};

export default useModals;
