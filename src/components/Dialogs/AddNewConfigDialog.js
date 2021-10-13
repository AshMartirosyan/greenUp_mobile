import React, {useState, useEffect} from 'react';
import {TextInput, View, Text} from 'react-native';
import {Portal, Dialog, Button, useTheme} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';

import styled from 'styled-components';

import {Colors} from '../../design/Colors';
import {newConfigDialogShowed} from '../../redux/reducers/dialogReducer';
import {addNewConfig} from '../../redux/reducers/configReducer';

export const DialogContainer = styled(Dialog)`
  background-color: ${Colors.GREEN_LIGHT};
  border-radius: 20px;
`;

export const DialogContent = styled(Dialog.Content)`
  justify-content: center;
`;

export const DialogButton = styled(Button)`
  width: 100%;
`;

export const DialogActions = styled(Dialog.Actions)`
  flex-direction: column;
  justify-content: space-between;
`;

export const DialogContentView = styled(View)`
  flex-direction: row;
  justify-content: space-between;
  align-items: center 
  height: 30px;
  border-bottom-width: 1px;
  border-bottom-color: ${Colors.GRAY_MATERIAL_LIGHT};
`;

export const DialogTextInputView = styled(View)`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-vertical: 10px;
`;

export const MiddleView = styled(View)`
  flex: 1;
  flex-direction: row;
  justify-content: space-between;
  margin-left: 40px;
`;

export const DialogTypeTextInput = styled(TextInput)`
  background-color: ${Colors.GRAY_MATERIAL_LIGHT};
  height: 30px;
  width: 115px;
  border-radius: 5px;
  padding: 5px;
`;

export const DialogNumberInput = styled(TextInput)`
  background-color: ${Colors.GRAY_MATERIAL_LIGHT};
  height: 30px;
  width: 60px;
  border-radius: 3px;
  padding: 5px;
`;

export const AddNewConfigDialog = (props) => {
  const {isShowed} = props;
  const {colors} = useTheme();
  const dispatch = useDispatch();

  const [visible, setVisible] = useState(false);

  const [newType, setNewType] = useState('');
  const [newNormal, setNewNormal] = useState('');
  const [newMin, setNewMin] = useState('');

  const token = useSelector((state) => state.LoginReducer.token);

  const onAdd = () => {
    const config = {
      type: newType,
      normal: newNormal,
      min: newMin,
    };
    dispatch(addNewConfig(token, config));
    closeDialog();
    setNewType('');
    setNewNormal('');
    setNewMin('');
  };

  const closeDialog = () => {
    dispatch(newConfigDialogShowed(false));
    setVisible(false);
  };

  useEffect(() => {
    isShowed ? setVisible(isShowed) : dispatch(newConfigDialogShowed(false));
  }, [dispatch, isShowed]);

  return (
    <Portal>
      <DialogContainer visible={visible} onDismiss={closeDialog}>
        <Dialog.Title>Ավելացնել կարգավորում</Dialog.Title>
        <DialogContent>
          <DialogContentView>
            <Text style={{width: 115}}>Տեսակը</Text>
            <MiddleView>
              <Text>Նորմալ</Text>
              <Text>Նվազագույնը</Text>
            </MiddleView>
          </DialogContentView>
          <DialogTextInputView>
            <DialogTypeTextInput
              autoFocus={true}
              value={newType}
              onChangeText={setNewType}
            />
            <MiddleView>
              <DialogNumberInput
                keyboardType="number-pad"
                value={newNormal}
                onChangeText={setNewNormal}
              />
              <DialogNumberInput
                keyboardType="number-pad"
                value={newMin}
                onChangeText={setNewMin}
              />
            </MiddleView>
          </DialogTextInputView>
        </DialogContent>
        <DialogActions>
          <DialogButton
            mode="contained"
            onPress={onAdd}
            rippleColor={colors.primary}>
            Ավելացնել
          </DialogButton>
          <DialogButton onPress={closeDialog}>Չեղարկել</DialogButton>
        </DialogActions>
      </DialogContainer>
    </Portal>
  );
};
