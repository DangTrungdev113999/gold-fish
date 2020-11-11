//@ts-nocheck
import React from 'react';
import styled from 'styled-components';

const TouchableOpacity = styled.TouchableOpacity`
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
    elevation: 1;
  `}
  ${({ opacity }) => opacity && `opacity: ${opacity};`}
  ${({ overflow }) => overflow && `overflow: ${overflow};`}
  
  ${({ style }) => style && { ...style }}
`;

export default ({ children, ...rest }) => {
  return <TouchableOpacity {...rest}>{children}</TouchableOpacity>;
};
