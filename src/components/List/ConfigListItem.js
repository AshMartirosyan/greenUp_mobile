import React, {useState} from 'react';
import {View, Text, DataTable} from 'react-native';
import {TextInput, useTheme} from 'react-native-paper';

import styled from 'styled-components';

import {Colors} from '../../design/Colors';

export const ConfigListItem = () => {
  const {colors} = useTheme();

  const [title, setTitle] = useState('Նոր Կարգավորում');
  const [textInputState, changeTextInputState] = useState(true);

  return (
    <ListItem colors={colors}>
      <Title disabled={textInputState} value={title} onChangeText={setTitle} />
      <SliderView />
    </ListItem>
  );
};
