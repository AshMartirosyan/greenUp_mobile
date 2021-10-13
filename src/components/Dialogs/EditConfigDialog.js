import React, {useState, useEffect} from 'react';
import {Text} from 'react-native';
import {Portal, Dialog, useTheme} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';

import {editConfig, deleteConfig} from '../../redux/reducers/configReducer';

import {
  DialogContainer,
  DialogContent,
  DialogContentView,
  DialogTextInputView,
  DialogTypeTextInput,
  MiddleView,
  DialogNumberInput,
  DialogActions,
  DialogButton,
} from './AddNewConfigDialog';

import {editConfigDialogShowed} from '../../redux/reducers/dialogReducer';

export const EditConfigDialog = (props) => {
  const {isShowed, data} = props;
  const {colors} = useTheme();
  const dispatch = useDispatch();
  const token = useSelector((state) => state.LoginReducer.token);

  useEffect(() => {
    isShowed ? setVisible(isShowed) : dispatch(editConfigDialogShowed(false));
  }, [dispatch, isShowed]);

  useEffect(() => {
    setType(data.type);
    setNormal(data.normal);
    setMin(data.min);
    setId(data.id);
  }, [data]);

  const [visible, setVisible] = useState(false);

  const [type, setType] = useState('');
  const [normal, setNormal] = useState('');
  const [min, setMin] = useState('');
  const [id, setId] = useState('');

  const closeDialog = () => {
    dispatch(editConfigDialogShowed(false));
    setVisible(false);
  };

  const onEdit = () => {
    const config = {
      id: id,
      type: type,
      normal: normal,
      min: min,
    };
    dispatch(editConfig(token, config));
    closeDialog();
  };

  const onDelete = () => {
    dispatch(deleteConfig(token, {id: id}));
    closeDialog();
  };

  return (
    <Portal>
      <DialogContainer visible={visible} onDismiss={closeDialog}>
        <Dialog.Title>Փոփոխել կամ Ջնջել</Dialog.Title>
        <DialogContent>
          <DialogContentView>
            <Text style={{width: 115}}>Տեսակը</Text>
            <MiddleView>
              <Text>Նորմալ</Text>
              <Text>Նվազագույնը</Text>
            </MiddleView>
          </DialogContentView>
          <DialogTextInputView>
            <DialogTypeTextInput value={type} onChangeText={setType} />
            <MiddleView>
              <DialogNumberInput
                keyboardType="number-pad"
                value={normal}
                onChangeText={setNormal}
              />
              <DialogNumberInput
                keyboardType="number-pad"
                value={min}
                onChangeText={setMin}
              />
            </MiddleView>
          </DialogTextInputView>
        </DialogContent>
        <DialogActions>
          <DialogButton
            mode="contained"
            onPress={onEdit}
            rippleColor={colors.primary}>
            Փոփոխել
          </DialogButton>
          <DialogButton onPress={onDelete} rippleColor={colors.primary}>
            Ջնջել
          </DialogButton>
          <DialogButton onPress={closeDialog}>Չեղարկել</DialogButton>
        </DialogActions>
      </DialogContainer>
    </Portal>
  );
};
