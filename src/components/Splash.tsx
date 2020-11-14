// //@ts-nocheck

import React from 'react';
// import theme from '~/config/theme';
// import Body from './Body';
// import Loading from './Loading';
// import Text from './Text';

// const Splash = ({ visible }) => {
//   console.log(visible);
//   return (
//     <Body flex={2} center>
//       <Text h2 color={theme.color.secondary} m="0 0 20px">
//         Hi you !
//       </Text>
//       {/* <Loading /> */}
//     </Body>
//   );
// };

// export default Splash;

import AnimatedSplash from 'react-native-animated-splash-screen';
import theme from '~/config/theme';

const Splash = ({ visible }) => {
  console.log(visible);
  return (
    <>
      <AnimatedSplash
        translucent={true}
        isLoaded={visible}
        logoImage={require('../../assets/images/shoe-1.jpg')}
        backgroundColor={theme.color.bg}
        logoHeight={150}
        logoWidth={150}
      />
    </>
  );
};

export default Splash;
