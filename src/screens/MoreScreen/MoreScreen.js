import React, {useState} from 'react';

import {useDispatch} from 'react-redux';
import {ScrollView, View} from 'react-native';
import {
  List,
  useTheme,
  Dialog,
  Portal,
  Button,
  Paragraph,
} from 'react-native-paper';

import styled from 'styled-components';

import {userLogOut} from '../../redux/reducers/loginReducer';

import {Colors} from '../../design/Colors';
import {
  DialogContainer,
  DialogContent,
} from '../../components/Dialogs/AddNewConfigDialog';
import {default as ConfigIcon} from './config.svg';
import {default as LogOutIcon} from './log_out.svg';

const BaseScrollView = styled(ScrollView)`
  flex: 1;
  background-color: ${(props) =>
    props.visible ? Colors.GRAY_DARK : Colors.BACKGROUND_DAY};
  opacity: ${(props) => (props.visible ? 0.3 : 1)};
`;

const ListItem = styled(List.Item)`
  width: 100%;
`;

export const DialogButton = styled(Button)`
  margin-right: 12px;
  width: 80px;
`;

export const MoreScreen = (props) => {
  const dispatch = useDispatch();
  const {colors} = useTheme();

  const [visible, setVisible] = useState(false);

  const closeDialog = () => setVisible(false);
  const openDialaog = () => setVisible(true);

  const logedOut = () => {
    closeDialog();
    dispatch(userLogOut());
  };

  const goToConfigs = () => {
    props.navigation.push('Configs');
  };

  return (
    <BaseScrollView visible={visible}>
      <ListItem
        title="Կարգավորումներ"
        right={() => (
          <View style={{justifyContent: 'center'}}>
            <ConfigIcon fill={colors.secondary} />
          </View>
        )}
        onPress={goToConfigs}
        rippleColor={colors.primaryLight}
      />

      <ListItem
        title="Դուրս Գալ"
        right={() => (
          <View style={{justifyContent: 'center'}}>
            <LogOutIcon fill={colors.secondary} />
          </View>
        )}
        onPress={openDialaog}
        rippleColor={colors.primaryLight}
      />

      <Portal>
        <DialogContainer visible={visible} onDismiss={closeDialog}>
          <Dialog.Title>Դուրս Գալ</Dialog.Title>
          <DialogContent>
            <Paragraph>Վստահ ե՞ք, որ ցանկանում եք դուրս գալ</Paragraph>
          </DialogContent>
          <Dialog.Actions>
            <DialogButton mode="contained" onPress={closeDialog}>
              Ոչ
            </DialogButton>
            <DialogButton onPress={logedOut}>Այո</DialogButton>
          </Dialog.Actions>
        </DialogContainer>
      </Portal>
    </BaseScrollView>
  );
};
