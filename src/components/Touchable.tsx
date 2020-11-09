import React from 'react';
import styled from 'styled-components';

//@ts-ignore
const TouchableOpacity = styled.TouchableOpacity`
  ${({ block }: any) => block && 'width: 100%;'}
  ${({ w }: any) => w && `width: ${w};`}
  ${({ h }: any) => h && `height: ${h};`}
  ${({ m }: any) => m && `margin: ${m};`}
  ${({ p }: any) => p && `padding: ${p};`}
  ${({ flex }: any) => flex && `flex: ${flex};`}
  ${({ row }: any) => row && 'flex-direction: row;'}
  ${({ column }: any) => column && 'flex-direction: column;'}
  ${({ center }: any) => center && 'justify-content: center;'}
  ${({ middle }: any) => middle && 'align-items: center;'}
  ${({ justify }: any) => justify && `justify-content: ${justify}`}
  ${({ alignItems }: any) => alignItems && `align-items: ${alignItems};`}
  ${({ alignSelf }: any) => alignSelf && `align-self: ${alignSelf};`}
  ${({ wrap }: any) => wrap && 'flex-wrap: wrap;'}
  ${({ absolute }: any) => absolute && 'position: absolute;'}
  ${({ relative }: any) => relative && 'position: relative;'}
  ${({ top }: any) => top && `top: ${top};`}
  ${({ bottom }: any) => bottom && `bottom: ${bottom};`}
  ${({ right }: any) => right && `right: ${right};`}
  ${({ left }: any) => left && `left: ${left};`}
  ${({ borderWidth }: any) => borderWidth && `border-width: ${borderWidth};`}
  ${({ borderColor }: any) => borderColor && `border-color: ${borderColor};`}
  ${({ borderRadius }: any) =>
    borderRadius && `border-radius: ${borderRadius};`}
  ${({ bg, theme }: any) =>
    theme?.color[bg]
      ? `background-color: ${theme.color[bg]}`
      : `background-color: ${bg}`}
    ${({ shadow, theme }: any) =>
    shadow &&
    `
    box-shadow: 0px 5px 5px ${theme.color.primaryLight};
    elevation: 1;
  `}
  ${({ opacity }: any) => opacity && `opacity: ${opacity};`}
  ${({ overflow }: any) => overflow && `overflow: ${overflow};`}
  
  ${({ style }: any) => style && { ...style }}
`;

export default ({ children, ...rest }: any) => {
  return <TouchableOpacity {...rest}>{children}</TouchableOpacity>;
};
