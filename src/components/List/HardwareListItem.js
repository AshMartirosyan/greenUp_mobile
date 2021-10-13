import React, {useState, useEffect} from 'react';
import {View, Text} from 'react-native';
import {
  Switch,
  useTheme,
  TouchableRipple,
  Portal,
  Dialog,
  Paragraph,
} from 'react-native-paper';
import {connect, useDispatch} from 'react-redux';

import {isEqual, isEmpty} from 'lodash';

import styled from 'styled-components';
import {Colors} from '../../design/Colors';

import {
  DialogActions,
  DialogButton,
  DialogContainer,
  DialogContent,
} from '../Dialogs/AddNewConfigDialog';

import {dialogShowed, pickerShowed} from '../../redux/reducers/dialogReducer';
import {changeOne, changeConfig} from '../../redux/reducers/hardwareReducer';
import {setOpacity} from '../../redux/reducers/screenReducer';
import {ConfigModal} from '../Pickers/ConfigModal';
import {default as HardwareListIcon} from './hardware-list-icon.svg';
import {default as ExpandMoreIcon} from './expand_more.svg';
import {default as ExpandLessIcon} from './expand_less.svg';

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const ListItem = styled(TouchableRipple)`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  height: ${(props) => (props.more ? 160 : 72)}px;
  padding: 16px;
  width: 100%;
  background-color: ${(props) =>
    props.visible ? Colors.GRAY_DARK : Colors.BACKGROUND_DAY};
  opacity: ${(props) => (props.visible ? 0.3 : 1)};
  border-bottom-width: 2px;
  border-bottom-color: ${(props) => props.colors.primary};
`;

const IconView = styled(View)`
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  margin-right: 16px;
`;

const InformationView = styled(View)`
  flex: 1;
  align-items: flex-start;
  justify-content: center;
`;
const Title = styled(Text)`
  font-size: 18px;
`;
const Subtitle = styled(Text)`
  font-size: 16px;
`;

const CustomSwitch = styled(Switch)`
  margin-left: 16px;
`;

const TypeChooseView = styled(TouchableRipple)`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 6px;
  margin-top: 3px;
  height: auto;
  width: 70%;
  height: 36px;
  border-width: 1px;
  border-radius: 5px;
  border-color: ${(props) => props.colors.primary};
`;

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const HardwareListItem = (props) => {
  const {
    title,
    value,
    auto,
    location,
    screenOpacity,
    switchValue,
    configs,
    pickerIsShowed,
    config,
  } = props;
  const dispatch = useDispatch();
  const {colors} = useTheme();

  const [turnOn, changeSwitchValue] = useState(false);
  const [more, showMore] = useState(false);
  const [visible, setVisible] = useState(false);
  const [isOpened, openModal] = useState(false);

  useEffect(() => {
    const updatedConfig = configs.filter(
      (newConfig) => newConfig._id === config._id,
    );
    if (!isEqual(updatedConfig[0], config)) {
      const data = {
        hardwareId: title,
        config: {
          id: updatedConfig[0]._id,
          type: updatedConfig[0].type,
          normal: updatedConfig[0].normal,
          min: updatedConfig[0].min,
        },
      };
      dispatch(changeConfig(props.token, data));
    }
  }, [configs, config, title, dispatch, props.token]);

  useEffect(() => {
    changeSwitchValue(switchValue);
  }, [switchValue]);

  useEffect(() => {
    if (!pickerIsShowed) {
      openModal(false);
    }
  }, [pickerIsShowed]);

  const closeDialog = () => {
    setVisible(false);
    dispatch(dialogShowed());
    dispatch(setOpacity(false));
  };
  const openDialaog = () => {
    setVisible(true);
    dispatch(dialogShowed());
    dispatch(setOpacity(true));
  };

  const switchChenged = (isAuto) => {
    const data = {
      id: title,
      auto: isAuto,
      valveState: turnOn ? 1 : 0,
      token: props.token,
    };
    changeSwitchValue(!turnOn);
    setVisible(false);
    dispatch(setOpacity(false));
    dispatch(dialogShowed());
    dispatch(changeOne(data));
  };

  const openPicker = () => {
    dispatch(setOpacity(true));
    dispatch(pickerShowed(true));
    openModal(true);
  };

  return (
    <ListItem
      rippleColor={colors.primaryLight}
      onPress={() => {
        showMore(!more);
      }}
      more={more}
      colors={colors}
      visible={screenOpacity}>
      <>
        <IconView>
          <HardwareListIcon fill={turnOn ? colors.primary : colors.secondary} />
        </IconView>
        <InformationView>
          <Title>{title}</Title>
          {auto ? (
            <Subtitle style={{color: 'green'}}>Ավտոմատ ղեկավարում</Subtitle>
          ) : (
            <Subtitle style={{color: 'red'}}>
              Ավտոմատ ղեկավարումը անջատված է
            </Subtitle>
          )}
          {more ? <Subtitle>{`Խոնավությունը ~ ${value}%`}</Subtitle> : null}
          {more ? <Subtitle>{`Գտնվելու վայրը ${location}`}</Subtitle> : null}
          {more ? (
            <>
              <TypeChooseView colors={colors} onPress={openPicker}>
                <>
                  <Subtitle>{config.type}</Subtitle>
                  {!isOpened ? (
                    <ExpandMoreIcon fill={'black'} />
                  ) : (
                    <ExpandLessIcon fill={'black'} />
                  )}
                </>
              </TypeChooseView>
              <ConfigModal
                configs={configs}
                isOpened={isOpened}
                hardwareId={title}
              />
            </>
          ) : null}
        </InformationView>
        <CustomSwitch
          trackColor={{
            false: colors.secondary,
            true: colors.primary,
          }}
          value={turnOn}
          onValueChange={openDialaog}
        />
        <Portal>
          <DialogContainer visible={visible} onDismiss={closeDialog}>
            <Dialog.Title>{!turnOn ? 'Միացնել' : 'Անջատել'}</Dialog.Title>
            <DialogContent>
              <Paragraph style={{color: 'red'}}>Ուշադրություն!!!</Paragraph>
              <Paragraph style={{fontWeight: 'bold'}}>
                {!turnOn
                  ? 'Առանց Ավտոմատ Ղեկավարման'
                  : 'Սարքը անջատված վիճակում'}
              </Paragraph>
              <Paragraph>
                {!turnOn
                  ? 'դեպքում, սարքը չի անջատվի ինքնուրույն։'
                  : 'աշխատում է ավտոմատ ղեկավարմամբ։'}
              </Paragraph>
            </DialogContent>
            <DialogActions>
              <DialogButton
                mode="contained"
                onPress={() => switchChenged(true)}
                rippleColor={colors.primary}>
                Ավտոմատ Ղեկավարմամբ
              </DialogButton>
              {!turnOn ? (
                <DialogButton onPress={() => switchChenged(false)}>
                  Առանց Ավտոմատ Ղեկավարմամբ
                </DialogButton>
              ) : null}
              <DialogButton onPress={closeDialog}>Չեղարկել</DialogButton>
            </DialogActions>
          </DialogContainer>
        </Portal>
      </>
    </ListItem>
  );
};

const mapStatetoProps = (state) => ({
  hardwares: state.HardwareReducer.hardwares,
  token: state.LoginReducer.token,
  configs: state.ConfigReducer.configs,
  screenOpacity: state.ScreenReducer.screenOpacity,
  pickerIsShowed: state.DialogReducer.pickerDialogIsShowed,
});

export default connect(mapStatetoProps)(HardwareListItem);
