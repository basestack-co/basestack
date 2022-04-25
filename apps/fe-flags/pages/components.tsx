import React, { useState } from "react";
import MainLayout from "../layouts/Main";
import DemoPage from "./demo";
import {
  Text,
  Button,
  Avatar,
  Icon,
  Card,
  HorizontalRule,
} from "design-system";

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
      <Button icon="expand_more" mb={20} variant="tertiary">
        button icon
      </Button>
      <Button icon="search" iconPlacement="left" mb={20} variant="tertiary">
        button icon
      </Button>
      <Button mb={50} variant="neutral">
        Neutral button
      </Button>

      <Avatar mb={20} size="small" alt="image" />
      <Avatar mb={20} alt="image" />
      <Avatar
        mb={50}
        size="large"
        alt="image"
        src="https://images.pexels.com/photos/11245771/pexels-photo-11245771.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
      />

      <Icon size="small" icon="help" mb={20} />
      <Icon size="medium" icon="help" mb={20} />
      <Icon size="large" icon="help" mb={20} />
      <Icon color="red" size="xLarge" icon="help" mb={20} />
      <Icon muted size="xLarge" icon="help" mb={20} />
      <Icon size="xLarge" icon="help" mb={50} />

      <Card ml={20} p={20} mb={50} style={{ width: "300px" }}>
        <Text size="small" pb={100}>
          Card
        </Text>
      </Card>
      <br />

      <HorizontalRule />
      <br />
      <br />
    </div>
  );
};

DemoPage.Layout = MainLayout;

export default Components;
