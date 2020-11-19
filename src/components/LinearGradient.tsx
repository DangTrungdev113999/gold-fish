//@ts-nocheck
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import styled from 'styled-components';

import theme from '~/config/theme';

const LinearGradientStyled = styled(LinearGradient)`
  ${({ block }) => block && 'width: 100%;'}
  ${({ w }) => w && `width: ${w};`}
  ${({ h }) => h && `height: ${h};`}
  ${({ m }) => m && `margin: ${m};`}
  ${({ p }) => p && `padding: ${p};`}
  ${({ flex }) => flex && `flex: ${flex};`}
  ${({ row }) => row && 'flex-direction: row;'}
  ${({ column }) => column && 'flex-direction: column;'}
  ${({ center }) => center && 'justify-content: center;'}
  ${({ middle }) => middle && 'align-items: center;'}
  ${({ justify }) => justify && `justify-content: ${justify}`}
  ${({ alignItems }) => alignItems && `align-items: ${alignItems};`}
  ${({ alignSelf }) => alignSelf && `align-self: ${alignSelf};`}
  ${({ wrap }) => wrap && 'flex-wrap: wrap;'}
  ${({ absolute }) => absolute && 'position: absolute;'}
  ${({ relative }) => relative && 'position: relative;'}
  ${({ top }) => top && `top: ${top};`}
  ${({ bottom }) => bottom && `bottom: ${bottom};`}
  ${({ right }) => right && `right: ${right};`}
  ${({ left }) => left && `left: ${left};`}
  ${({ borderWidth }) => borderWidth && `border-width: ${borderWidth};`}
  ${({ borderColor }) => borderColor && `border-color: ${borderColor};`}
  ${({ borderRadius }) => borderRadius && `border-radius: ${borderRadius};`}
  ${({ bg, theme }) =>
    theme?.color[bg]
      ? `background-color: ${theme.color[bg]}`
      : `background-color: ${bg}`}
    ${({ shadow, theme }) =>
    shadow &&
    `
    box-shadow: 0px 5px 5px ${theme.color.primaryLight};
    elevation: 3;
    `}
  ${({ opacity }) => opacity && `opacity: ${opacity};`}
  ${({ overflow }) => overflow && `overflow: ${overflow};`}
  
  ${({ style }) => style && { ...style }}
`;

export default ({
  colors,
  start = { x: 0, y: 0 },
  end = { x: 1, y: 1 },
  locations = [0.1, 0.8],
  disabled,
  children,
  ...props
}) => {
  return (
    <LinearGradientStyled
      start={start}
      end={end}
      locations={locations}
      disabled={disabled}
      colors={colors || [theme.color.secondarylight1, theme.color.blue3]}
      {...props}
      dis>
      {children}
    </LinearGradientStyled>
  );
};
