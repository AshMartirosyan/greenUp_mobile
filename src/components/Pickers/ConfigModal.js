import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Modal,
  FlatList,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {TouchableRipple, useTheme} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';

import styled from 'styled-components';

import {Colors} from '../../design/Colors';
import {setOpacity} from '../../redux/reducers/screenReducer';
import {pickerShowed} from '../../redux/reducers/dialogReducer';
import {changeConfig} from '../../redux/reducers/hardwareReducer';

const ScreenHeight = Dimensions.get('window').height;

const ModalTouchable = styled(TouchableOpacity)`
  flex: 1;
  justify-content: flex-end;
  align-items: center;
`;

const ModalView = styled(View)`
  background-color: ${Colors.GRAY_LIGHT};
  height: ${ScreenHeight / 3}px;
  border-radius: 20px;
`;

const List = styled(FlatList)`
  flex: 1;
`;

const ModalHeaderView = styled(View)`
  justify-content: center;
  height: 56px;
  padding-horizontal: 20px;
`;

const ModalHeaderText = styled(Text)`
  text-align: center;
  font-size: 18px;
`;

const ListItem = styled(TouchableRipple)`
  flex-direction: row
  justify-content: space-between;
  align-items: center;
  height 48px;
  padding-horizontal: 15px;
  padding-vertical: 10px
  border-bottom-width: 2px;
  border-bottom-color: ${(props) => props.colors.primary};
`;

const ConfigType = styled(Text)`
  font-size: 16px;
  width: 50%;
`;
const ConfigNormal = styled(Text)`
  font-size: 16px;
  text-align: center
  width: 25%;
`;
const ConfigMin = styled(Text)`
  text-align: right;
  font-size: 16px;
  width: 25%;
`;

export const ConfigModal = (props) => {
  const {configs, isOpened, hardwareId} = props;
  const {colors} = useTheme();
  const dispatch = useDispatch();
  const token = useSelector((state) => state.LoginReducer.token);

  const [visible, openModal] = useState(false);

  useEffect(() => {
    isOpened ? openModal(true) : openModal(false);
  }, [isOpened]);

  const closePicker = () => {
    dispatch(setOpacity(false));
    dispatch(pickerShowed(false));
    openModal(false);
  };

  const selectedNewType = (item) => {
    const data = {
      hardwareId: hardwareId,
      config: {
        id: item._id,
        type: item.type,
        normal: item.normal,
        min: item.min,
      },
    };
    dispatch(changeConfig(token, data));
    dispatch(setOpacity(false));
    dispatch(pickerShowed(false));
    openModal(false);
  };

  return (
    <Modal
      visible={visible}
      transparent={true}
      onRequestClose={closePicker}
      animationType="slide">
      <ModalTouchable onPress={closePicker}>
        <ModalView>
          <ModalHeaderView>
            <ModalHeaderText>Ընտրեք Ցանքի Տիպը</ModalHeaderText>
          </ModalHeaderView>
          <List
            data={configs}
            keyExtractor={(item) => item._id}
            renderItem={({item}) => {
              return (
                <ListItem
                  onPress={() => selectedNewType(item)}
                  colors={colors}
                  rippleColor={colors.primary}>
                  <>
                    <ConfigType>{item.type}</ConfigType>
                    <ConfigNormal>{item.normal}</ConfigNormal>
                    <ConfigMin>{item.min}</ConfigMin>
                  </>
                </ListItem>
              );
            }}
          />
        </ModalView>
      </ModalTouchable>
    </Modal>
  );
};
