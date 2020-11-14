import theme from '../config/theme';

const mainOptions = {
  headerStyle: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
    elevation: 1,
    backgroundColor: theme.color.primary,
  },
  headerTitleStyle: {
    fontSize: 16,
    fontFamily: theme.font.primary,
    fontWeight: '400',
    lineHeight: 24,
    textAlign: 'center',
    color: '#f4f4f4',
  },
};

export { mainOptions };
