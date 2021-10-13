import React, {useState} from 'react';
import {StyleSheet, View, Text, ScrollView} from 'react-native';
import {useDispatch} from 'react-redux';

import {Button} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';

import styled from 'styled-components';

import {HeaderImageView} from '../components/HeaderImageView/HeaderImage';
import {LoginTextInput} from '../components/TextInputs/LoginTextInput';
import {userLogin} from '../redux/reducers/loginReducer';

const LoginScreen = () => {
  const dispatch = useDispatch();
  const [usernameValue, setUsername] = useState('');
  const [passwordValue, setPassword] = useState('');

  const logInButtonPressed = () => {
    dispatch(userLogin(usernameValue.toLowerCase(), passwordValue));
  };

  return (
    <SafeAreaView edges={['top', 'left', 'right']} style={styles.safeArea}>
      <ScrollView>
        <HeaderView style={styles.headerView}>
          <HeaderImageView />
        </HeaderView>
        <SignInView style={styles.signInView}>
          <Text style={styles.signInText}>Մուտք Գործել</Text>
          <LoginTextInput
            label="Մուտքանուն"
            placeholder="Խնդրում ենք գրել ձեր մուտքանունը"
            value={usernameValue}
            onChangeText={setUsername}
          />
          <LoginTextInput
            label="Գաղտնաբառ"
            placeholder="Խնդրում ենք գրել ձեր գաղտնաբառը"
            value={passwordValue}
            onChangeText={setPassword}
            secureTextEntry={true}
          />
          <Button
            mode="contained"
            style={styles.signInButton}
            contentStyle={styles.signInButtonContent}
            onPress={logInButtonPressed}>
            Մուտք
          </Button>
        </SignInView>
      </ScrollView>
    </SafeAreaView>
  );
};

const HeaderView = styled(View)`
  width: 100%;
`;

const SignInView = styled(View)`
  width: 100%;
`;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  headerView: {
    borderColor: '#43a047',
    borderBottomWidth: 1,
    borderTopWidth: 1,
    width: '100%',
    height: 200,
  },
  signInView: {
    height: 300,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  signInText: {
    marginTop: 20,
    color: '#43a047',
    fontSize: 22,
  },
  signInButton: {
    marginTop: 10,
    backgroundColor: '#43a047',
  },
  signInButtonContent: {
    width: 200,
    height: 40,
  },
});

export default LoginScreen;
