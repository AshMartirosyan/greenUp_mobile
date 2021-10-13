import React from 'react';
import {FlatList, View} from 'react-native';
import {IconButton} from 'react-native-paper';

import styled from 'styled-components';

import {Colors} from '../../design/Colors';
import HardwareListItem from './HardwareListItem';

const HardwaresList = styled(FlatList)`
  flex: 1;
  width: 100%;
  margin-top: 20px;
`;

const SectionView = styled(View)`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  height: 48px;
  padding-horizontal: 16px;
`;

const LeftSectionView = styled(View)`
  align-items: center;
  justify-content: center;
  width: 56;
  height: auto;
`;

const RightSectionView = styled(View)`
  flex-direction: row;
  padding-left: 16px;
  width: 80px;
  align-items: center;
  justify-content: space-between;
`;

const SectionIconButton = styled(IconButton)``;

export const ListAccordionWithSections = () => {
  return (
    <SectionView>
      <LeftSectionView />
    </SectionView>
  );
};
