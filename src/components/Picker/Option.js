import React, {PureComponent} from 'react';
import styled from 'styled-components';

import Text from '../Text';
import Icon from '../Icon';
import theme from '~/config/theme';

const Container = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  padding: 0 12px;
  height: 40px;
  border: 0px solid ${theme.color.neutral4};
  border-top-width: 0.5px;
  background-color: ${({active}) => (active ? theme.color.neutral2 : 'white')};
`;

class Option extends PureComponent {
  onPress = () => {
    this.props.onPress(this.props.item);
  };

  render() {
    const {
      active,
      item: {name, value},
    } = this.props;

    return (
      <Container active={active} onPress={this.onPress}>
        <Text center flex={1}>
          {name}
        </Text>
        {active ? (
          <Icon
            name="check"
            type="antDesign"
            color={theme.color.success}
            style={{position: 'absolute', right: 10}}
          />
        ) : null}
      </Container>
    );
  }
}

export default Option;
