import styled from 'styled-components';

import theme from '~/config/theme';
//@ts-ignore
const Loading = styled.ActivityIndicator.attrs(({ color, ...rest }: any) => ({
  //@ts-ignore
  color: color ? theme.color[color] : theme.color.secondary,
  ...rest,
}))`
  ${({ m }: any) => m && `margin : ${m};`}
`;

export default Loading;
