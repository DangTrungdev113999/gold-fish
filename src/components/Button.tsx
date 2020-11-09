import React from 'react';
import styled from 'styled-components';

import LinearGradient from './LinearGradient';

//@ts-ignore
const TouchableOpacity = styled.TouchableOpacity`
  padding: 0;
  ${({ block }: any) => block && 'flex: 1;'}
  ${({ flex }: any) => flex && `flex: ${flex};`}
  ${({ w }: any) => w && `width: ${w}px;`}
  ${({ h }: any) => h && `height: ${h}px;`}
  ${({ m }: any) => m && `margin: ${m};`}
  ${({ p }: any) => p && `padding: ${p};`}

  ${({ absolute }: any) => absolute && 'position: absolute;'}
  ${({ relative }: any) => relative && 'position: relative;'}
  ${({ top }: any) => top && `top: ${top};`}
  ${({ bottom }: any) => bottom && `bottom: ${bottom};`}
  ${({ right }: any) => right && `right: ${right};`}
  ${({ left }: any) => left && `left: ${left};`}
  ${({ borderWidth }: any) => borderWidth && `border-width: ${borderWidth}px;`}
  ${({ borderBottomWidth }: any) =>
    borderBottomWidth && `border-bottom-width: ${borderBottomWidth}px;`}
  ${({ borderColor }: any) => borderColor && `border-color: ${borderColor};`}
  ${({ borderRadius }: any) => borderRadius && `border-radius: ${borderRadius}`}
  ${({ bg, theme }: any) =>
    theme.color[bg]
      ? `background-color: ${theme.color[bg]}`
      : `background-color: ${bg}`}
  ${({ row }: any) => row && 'flex-direction: row;'}
  ${({ column }: any) => column && 'flex-direction: column;'}
  ${({ center }: any) => center && 'justify-content: center;'}
  ${({ middle }: any) => middle && 'align-items: center;'}
  ${({ justify }: any) => justify && `justify-content: ${justify}`}
  ${({ alignItems }: any) => alignItems && `align-items: ${alignItems};`}
  ${({ alignSelf }: any) => alignSelf && `align-self: ${alignSelf};`}
  ${({ wrap }: any) => wrap && 'flex-wrap: wrap;'}
  ${({ shadow, theme }: any) =>
    shadow &&
    `
    box-shadow: 3px 3px 10px ${theme.color.gray};
    elevation: 1;
  `}
  ${({ disabled, theme }: any) =>
    disabled &&
    `background-color: ${theme.color.primary};`} /* disabled && 'background-color: #070D17;'} */
`;

const Button = ({
  opacity = 0.5,
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
}: any) => {
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
