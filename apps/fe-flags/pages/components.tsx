import React, { useState } from "react";
import MainLayout from "../layouts/Main";
import DemoPage from "./demo";
import { Text } from "design-system";

const Components = () => {
  const [count, setCount] = useState(0);

  return (
    <div>
      <button onClick={() => setCount((prevState) => prevState + 1)}>
        plus
      </button>
      <Text size="xSmall">{count}</Text>
      <Text size="xSmall">xSmall</Text>
      <Text size="small">small</Text>
      <Text size="medium">medium</Text>
      <Text size="large">large</Text>
      <Text size="xLarge">xLarge</Text>
      <Text size="xxLarge">xxLarge</Text>

      <Text size="xxLarge" color="red">
        xxLarge muted
      </Text>
      <Text size="xxLarge" muted>
        xxLarge muted
      </Text>
    </div>
  );
};

DemoPage.Layout = MainLayout;

export default Components;
