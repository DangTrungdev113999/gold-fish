import React from 'react';
import styled from 'styled-components';

import LinearGradient from './LinearGradient';

const TouchableOpacity = styled.TouchableOpacity`
  padding: 0;
  ${({block}) => block && 'flex: 1;'}
  ${({flex}) => flex && `flex: ${flex};`}
  ${({w}) => w && `width: ${w}px;`}
  ${({h}) => h && `height: ${h}px;`}
  ${({m}) => m && `margin: ${m};`}
  ${({p}) => p && `padding: ${p};`}

  ${({absolute}) => absolute && 'position: absolute;'}
  ${({relative}) => relative && 'position: relative;'}
  ${({top}) => top && `top: ${top};`}
  ${({bottom}) => bottom && `bottom: ${bottom};`}
  ${({right}) => right && `right: ${right};`}
  ${({left}) => left && `left: ${left};`}
  ${({borderWidth}) => borderWidth && `border-width: ${borderWidth}px;`}
  ${({borderBottomWidth}) =>
    borderBottomWidth && `border-bottom-width: ${borderBottomWidth}px;`}
  ${({borderColor}) => borderColor && `border-color: ${borderColor};`}
  ${({borderRadius}) => borderRadius && `border-radius: ${borderRadius}px`}
  ${({bg, theme}) =>
    theme.color[bg]
      ? `background-color: ${theme.color[bg]}`
      : `background-color: ${bg}`}
  ${({row}) => row && 'flex-direction: row;'}
  ${({column}) => column && 'flex-direction: column;'}
  ${({center}) => center && 'justify-content: center;'}
  ${({middle}) => middle && 'align-items: center;'}
  ${({justify}) => justify && `justify-content: ${justify}`}
  ${({alignItems}) => alignItems && `align-items: ${alignItems};`}
  ${({alignSelf}) => alignSelf && `align-self: ${alignSelf};`}
  ${({wrap}) => wrap && 'flex-wrap: wrap;'}
  ${({shadow, theme}) =>
    shadow &&
    `
    box-shadow: 3px 3px 10px ${theme.color.gray};
    elevation: 1;
  `}
  ${({disabled, theme}) =>
    disabled &&
    `background-color: ${theme.color.primary};`} /* disabled && 'background-color: #070D17;'} */
`;

const Button = ({
  opacity = 0.5,
  disable,
  gradient,
  colors,
  start,
  end,
  locations,
  children,
  shadow,
  disabled,
  onPress,
  ...props
}) => {
  if (gradient && !disabled) {
    return (
      <TouchableOpacity
        activeOpacity={opacity}
        onPress={onPress}
        disabled={disabled}>
        <LinearGradient
          start={start}
          end={end}
          locations={locations}
          shadow={shadow}
          colors={colors}
          {...props}>
          {children}
        </LinearGradient>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity
      activeOpacity={opacity}
      shadow={shadow}
      onPress={onPress}
      disabled={disabled}
      {...props}>
      {children}
    </TouchableOpacity>
  );
};

export default Button;
