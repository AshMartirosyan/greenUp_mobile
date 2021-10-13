import React, {useState, useEffect} from 'react';

import {View, Text, FlatList} from 'react-native';
import {Button, useTheme, Portal, Dialog, Paragraph} from 'react-native-paper';
import {connect, useDispatch} from 'react-redux';

import styled from 'styled-components';

import {Colors} from '../../design/Colors';
import {
  changeAll,
  fetchHardwaresAction,
} from '../../redux/reducers/hardwareReducer';
import {dialogShowed} from '../../redux/reducers/dialogReducer';
import {setOpacity} from '../../redux/reducers/screenReducer';
import HardwareListItem from '../../components/List/HardwareListItem';
import {
  DialogActions,
  DialogButton,
  DialogContainer,
  DialogContent,
} from '../../components/Dialogs/AddNewConfigDialog';

const MainView = styled(View)`
  flex: 1;
  align-items: center;
  background-color: ${(props) =>
    props.isShowed ? Colors.GRAY_DARK : Colors.BACKGROUND_DAY};
  opacity: ${(props) => (props.isShowed ? 0.3 : 1)};
`;

const HeaderView = styled(View)`
  height: 50px;
  width: 90%;
  border-color: #fff64f;
  border-width: 3px;
  margin-top: 12px;
  border-radius: 10px;
  justify-content: center;
`;

const HeaderText = styled(Text)`
  text-align: center;
  font-size: 20px;
`;

const HardwaresList = styled(FlatList)`
  flex: 1;
  width: 100%;
  margin-top: 20px;
`;

const BottomButton = styled(Button)`
  justify-content: center;
  width: 90%;
  height: 50px;
  margin-bottom: 5px;
`;

const HardwaresScreen = (props) => {
  const dispatch = useDispatch();
  const {colors} = useTheme();

  const [visible, setVisible] = useState(false);
  //const [hardwares, updateHardwaresList] = useState([]);

  useEffect(() => {
    dispatch(fetchHardwaresAction(props.token));
  }, [dispatch, props.token]);

  // useEffect(() => {
  //   updateHardwaresList(props.hardwares);
  // }, [props.hardwares]);

  const openDialog = () => {
    setVisible(true);
    dispatch(dialogShowed());
    dispatch(setOpacity(true));
  };
  const closeDialog = () => {
    setVisible(false);
    dispatch(dialogShowed());
    dispatch(setOpacity(false));
  };

  const change = (isAuto) => {
    const fetchedData = {
      auto: isAuto,
      valveState: props.isAllTurnedOn ? 1 : 0,
      token: props.token,
    };
    setVisible(false);
    dispatch(setOpacity(false));
    dispatch(dialogShowed());
    dispatch(changeAll(fetchedData));
  };

  return (
    <MainView isShowed={props.screenOpacity} onPress={() => {}}>
      {/* <HeaderView>
        <HeaderText> Այստեղ կարող է լինել ձեր գովազդը </HeaderText>
      </HeaderView> */}
      <HardwaresList
        data={props.hardwares}
        extraData={props.hardwares}
        keyExtractor={(item) => item._id}
        renderItem={({item}) => (
          <HardwareListItem
            title={item._id}
            auto={item.auto}
            location={item.location}
            value={item.moistureValue}
            switchValue={item.valveState === 1 ? false : true}
            config={item.config}
          />
        )}
      />
      <BottomButton
        mode="contained"
        labelStyle={{color: 'black'}}
        onPress={openDialog}>
        {props.isAllTurnedOn ? 'Անջատել բոլորը' : 'Միացնել բոլորը'}
      </BottomButton>
      <Portal>
        <DialogContainer visible={visible} onDismiss={closeDialog}>
          <Dialog.Title>
            {props.isAllTurnedOn ? 'Անջատել' : 'Միացնել'}
          </Dialog.Title>
          <DialogContent>
            <Paragraph style={{color: 'red'}}>Ուշադրություն!!!</Paragraph>
            <Paragraph style={{fontWeight: 'bold'}}>
              {!props.isAllTurnedOn
                ? 'Առանց Ավտոմատ Ղեկավարման'
                : 'Սարքը անջատված վիճակում'}
            </Paragraph>
            <Paragraph>
              {!props.isAllTurnedOn
                ? 'դեպքում, սարքը չի անջատվի ինքնուրույն։'
                : 'աշխատում է ավտոմատ ղեկավարմամբ։'}
            </Paragraph>
          </DialogContent>
          <DialogActions>
            <DialogButton
              mode="contained"
              onPress={() => change(true)}
              rippleColor={colors.primary}>
              Ավտոմատ Ղեկավարմամբ
            </DialogButton>
            {!props.isAllTurnedOn ? (
              <DialogButton onPress={() => change(false)}>
                Առանց Ավտոմատ Ղեկավարմամբ
              </DialogButton>
            ) : null}
            <DialogButton onPress={closeDialog}>Չեղարկել</DialogButton>
          </DialogActions>
        </DialogContainer>
      </Portal>
    </MainView>
  );
};

const mapStatetoProps = (state) => ({
  token: state.LoginReducer.token,
  isAllTurnedOn: state.HardwareReducer.isAllTurnedOn,
  hardwares: state.HardwareReducer.hardwares,
  isShowed: state.DialogReducer.hardwareDialogIsShowed,
  screenOpacity: state.ScreenReducer.screenOpacity,
});

export default connect(mapStatetoProps)(HardwaresScreen);
