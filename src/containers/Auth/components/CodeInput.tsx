import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import theme from '~/config/theme';

const styles = StyleSheet.create({
  root: { padding: 5, minHeight: 300 },
  title: { textAlign: 'center', fontSize: 30 },
  codeFiledRoot: {
    marginTop: 15,
    marginBottom: 15,
    width: 280,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  cellRoot: {
    width: 34,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomColor: theme.color.neutral4,
    borderBottomWidth: 2,
  },
  cellText: {
    fontFamily: theme.font.primaryMedium,
    fontWeight: '500',
    color: theme.color.secondary2,
    fontSize: 34,
    textAlign: 'center',
  },
  focusCell: {
    borderBottomColor: theme.color.secondary,
    borderBottomWidth: 2,
  },
});

const CELL_COUNT = 6;

const CodeInput = ({ value, onChangeText, ...rest }: any) => {
  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue: onChangeText,
  });

  return (
    <CodeField
      ref={ref}
      {...props}
      value={value}
      onChangeText={onChangeText}
      cellCount={CELL_COUNT}
      rootStyle={styles.codeFiledRoot}
      keyboardType="number-pad"
      textContentType="oneTimeCode"
      renderCell={({ index, symbol, isFocused }) => (
        <View
          // Make sure that you pass onLayout={getCellOnLayoutHandler(index)} prop to root component of "Cell"
          onLayout={getCellOnLayoutHandler(index)}
          key={index}
          style={[styles.cellRoot, isFocused && styles.focusCell]}>
          <Text style={styles.cellText}>
            {symbol || (isFocused ? <Cursor /> : null)}
          </Text>
        </View>
      )}
      {...rest}
    />
  );
};

export default CodeInput;
