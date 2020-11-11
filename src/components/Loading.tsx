//@ts-nocheck
import styled from 'styled-components';

import theme from '~/config/theme';
const Loading = styled.ActivityIndicator.attrs(({ color, ...rest }) => ({
  color: color ? theme.color[color] : theme.color.secondary,
  ...rest,
}))`
  ${({ m }: any) => m && `margin : ${m};`}
`;

export default Loading;
