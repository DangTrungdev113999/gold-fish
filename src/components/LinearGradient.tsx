import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import styled from 'styled-components';

import theme from '~/config/theme';

const LinearGradientStyled = styled(LinearGradient)`
  ${({ block }: any) => block && 'flex: 1;'}
  ${({ flex }: any) => flex && `flex: ${flex};`}
  ${({ w }: any) => w && `width: ${w}px;`}
  ${({ h }: any) => h && `height: ${h}px;`}
  ${({ m }: any) => m && `margin: ${m};`}
  ${({ p }: any) => p && `padding: ${p};`}
  ${({ absolute }: any) => absolute && 'position: absolute;'}
  ${({ relative }: any) => relative && 'position: relative;'}
  ${({ top }: any) => top && `top: ${top}px;`}
  ${({ bottom }: any) => bottom && `bottom: ${bottom}px;`}
  ${({ right }: any) => right && `right: ${right}px;`}
  ${({ left }: any) => left && `right: ${left}px;`}
  ${({ borderWidth }: any) => borderWidth && `border-width: ${borderWidth}px;`}
  ${({ borderColor }: any) => borderColor && `border-color: ${borderColor};`}
  ${({ borderRadius }: any) => borderRadius && `border-radius: ${borderRadius}`}
  ${({ row }: any) => row && `flex-direction: ${row};`}
  ${({ column }: any) => column && `flex-direction: ${column};`}
  ${({ center }: any) => center && 'justify-content: center;'}
  ${({ middle }: any) => middle && 'align-items: center;'}
  ${({ justify }: any) => justify && `justify-content: ${justify}`}
  ${({ alignItems }: any) => alignItems && `align-items: ${alignItems};`}
  ${({ alignSelf }: any) => alignSelf && `align-self: ${alignSelf};`}
  ${({ disabled }: any) => disabled && `background-color: ${theme.color.gray};`}
    ${({ shadow }: any) =>
    shadow &&
    `
    box-shadow: 3px 3px 10px ${theme.color.gray};
    elevation: 2;
  `}
`;

export default ({
  colors,
  start = { x: 0, y: 0 },
  end = { x: 1, y: 1 },
  locations = [0.1, 0.9],
  disabled,
  children,
  ...props
}: any) => {
  return (
    <LinearGradientStyled
      start={start}
      end={end}
      locations={locations}
      disabled={disabled}
      colors={colors || [theme.color.primary, theme.color.secondary]}
      {...props}
      dis>
      {children}
    </LinearGradientStyled>
  );
};
