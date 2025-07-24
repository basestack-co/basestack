import { Switch, Text } from "@basestack/design-system";
import { Container, ContentContainer, Item } from "./styles";

type Environment = { name: string; enabled: boolean };

interface EnvironmentToggleAnimationProps {
  environments: Array<Environment>;
  onChange: (env: Environment) => void;
}

const EnvironmentToggleAnimation = ({
  environments,
  onChange,
}: EnvironmentToggleAnimationProps) => {
  return (
    <Container>
      <ContentContainer>
        {environments.map((environment, index) => (
          <Item key={index}>
            <Text>{environment.name}</Text>
            <Switch
              checked={environment.enabled}
              onChange={() =>
                onChange({ ...environment, enabled: !environment.enabled })
              }
            />
          </Item>
        ))}
      </ContentContainer>
    </Container>
  );
};

export default EnvironmentToggleAnimation;
