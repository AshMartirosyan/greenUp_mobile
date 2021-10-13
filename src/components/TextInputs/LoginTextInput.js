import {useTheme} from '@react-navigation/native';
import React from 'react';

import {View, StyleSheet} from 'react-native';
import {TextInput} from 'react-native-paper';

export const LoginTextInput = (props) => {
  const {colors} = useTheme();
  return (
    <View style={styles.view}>
      <TextInput
        mode="outlined"
        selectionColor={colors.primary}
        label={props.label}
        placeholder={props.placeholder}
        value={props.value}
        onChangeText={props.onChangeText}
        secureTextEntry={props.secureTextEntry}
        style={styles.textInput}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  view: {
    flexDirection: 'row',
    paddingVertical: 10,
  },
  textInput: {
    width: '80%',
    height: 54,
    backgroundColor: 'white',
  },
});
