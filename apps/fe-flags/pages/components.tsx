import React, { useState } from "react";
import MainLayout from "../layouts/Main";
import DemoPage from "./demo";
import { Text, Button } from "design-system";

const Components = () => {
  const [count, setCount] = useState(0);

  return (
    <div>
      <Text size="xSmall">xSmall {count}</Text>
      <Text size="small">small</Text>
      <Text size="medium">medium</Text>
      <Text size="large">large</Text>
      <Text size="xLarge">xLarge</Text>
      <Text size="xxLarge">xxLarge</Text>

      <Text size="xxLarge" color="red">
        xxLarge muted
      </Text>
      <Text size="xxLarge" muted mb={50}>
        xxLarge muted
      </Text>

      <Button onClick={() => setCount((prevState) => prevState + 1)} mb={20}>
        Primary button {count}
      </Button>
      <Button mb={20} variant="secondary">
        Secondary button
      </Button>
      <Button type="link" mb={20} variant="secondary">
        Secondary button link
      </Button>
      <Button mb={20} variant="tertiary">
        Tertiary button
      </Button>
      <Button mb={50} variant="neutral">
        Neutral button
      </Button>
    </div>
  );
};

DemoPage.Layout = MainLayout;

export default Components;
