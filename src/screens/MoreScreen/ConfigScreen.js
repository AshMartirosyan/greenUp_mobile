import React, {useState, useEffect} from 'react';
import {ScrollView, View} from 'react-native';
import {
  Paragraph,
  DataTable,
  TouchableRipple,
  useTheme,
} from 'react-native-paper';
import {connect, useDispatch} from 'react-redux';

import styled from 'styled-components';
import {Colors} from '../../design/Colors';
import {AddNewConfigDialog} from '../../components/Dialogs/AddNewConfigDialog';
import {EditConfigDialog} from '../../components/Dialogs/EditConfigDialog';
import {
  newConfigDialogShowed,
  editConfigDialogShowed,
} from '../../redux/reducers/dialogReducer';
import {fetchConfigsAction} from '../../redux/reducers/configReducer';

import {default as AddIcon} from './add.svg';

const MainView = styled(View)`
  flex: 1;
  align-items: center;
  background-color: ${(props) =>
    props.isShowed ? Colors.GRAY_DARK : Colors.BACKGROUND_DAY};
  opacity: ${(props) => (props.isShowed ? 0.3 : 1)};
`;

const AddNewListItem = styled(View)`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-horizontal: 16px;
  padding-vertical: 12px;
  height: 56px;
  width: 100%;
`;
const AddIconView = styled(TouchableRipple)`
  justify-content: center;
  align-items: center;
  width: 48px;
  height: 48px;
  border-radius: 24px;
`;

const ConfigList = styled(ScrollView)`
  flex: 1;
  width: 100%;
  opacity: 1;
`;

const ConfigScreen = (props) => {
  const {configs, isShowedNew, isShowedEdit} = props;
  const {colors} = useTheme();
  const dispatch = useDispatch();

  const [isAdded, setAdded] = useState(false);
  const [isEdited, setEdited] = useState(false);
  const [editData, setEditData] = useState({});

  useEffect(() => {
    dispatch(fetchConfigsAction(props.token));
  }, [dispatch, props.token]);

  useEffect(() => {
    if (!isShowedNew) {
      setAdded(false);
    }
    if (!isShowedEdit) {
      setEdited(false);
    }
  }, [isShowedNew, isShowedEdit]);

  const addNew = () => {
    dispatch(newConfigDialogShowed(true));
    setAdded(true);
  };

  const rowPressed = (id, type, normal, min) => {
    dispatch(editConfigDialogShowed(true));
    setEditData({id: id, type: type, normal: normal, min: min});
    setEdited(true);
  };

  return (
    <MainView isShowed={isShowedNew}>
      <AddNewListItem>
        <Paragraph style={{fontWeight: 'bold'}}>
          Ավելացնել նոր կարգավորում
        </Paragraph>
        <AddIconView rippleColor={colors.primaryLight} onPress={addNew}>
          <AddIcon fill={colors.primary} />
        </AddIconView>
        <AddNewConfigDialog isShowed={isAdded} />
      </AddNewListItem>
      <ConfigList>
        <DataTable>
          <DataTable.Header>
            <DataTable.Title>Տեսակը</DataTable.Title>
            <DataTable.Title numeric>Նորմալ</DataTable.Title>
            <DataTable.Title numeric>Նվազագույն</DataTable.Title>
          </DataTable.Header>
          {configs.map((config) => {
            return (
              <DataTable.Row
                onPress={() =>
                  rowPressed(config._id, config.type, config.normal, config.min)
                }>
                <DataTable.Cell>{config.type}</DataTable.Cell>
                <DataTable.Cell numeric>{config.normal}%</DataTable.Cell>
                <DataTable.Cell numeric>{config.min}%</DataTable.Cell>
              </DataTable.Row>
            );
          })}
          <EditConfigDialog isShowed={isEdited} data={editData} />
        </DataTable>
      </ConfigList>
    </MainView>
  );
};

const mapStateToProps = (state) => ({
  token: state.LoginReducer.token,
  configs: state.ConfigReducer.configs,
  isShowedNew: state.DialogReducer.newConfigDialogIsShowed,
  isShowedEdit: state.DialogReducer.editConfigDialogIsShowed,
});

export default connect(mapStateToProps)(ConfigScreen);
