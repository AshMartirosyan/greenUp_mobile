import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useTheme, IconButton} from 'react-native-paper';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import {ProfileScreen} from '../screens/ProfileScreen';
import HardwaresScreen from '../screens/HardwaresScreen/HardwaresScreen';
import {MoreScreen} from '../screens/MoreScreen/MoreScreen';
import ConfigScreen from '../screens/MoreScreen/ConfigScreen';
import {fetchHardwaresAction} from '../redux/reducers/hardwareReducer';

import {default as HardwareIcon} from './hardware.svg';
import {default as HomeIcon} from './home.svg';
import {default as MoreIcon} from './more.svg';
import {default as ReloadIcon} from './reload.svg';

const NavigationIcon = (props) => (
  <IconButton icon={props.icon} onPress={props.onPress} />
);

const ProfileStack = createStackNavigator();
const ProfileStackNavigator = () => {
  const {colors} = useTheme();
  return (
    <ProfileStack.Navigator>
      <ProfileStack.Screen
        name="Home"
        component={ProfileScreen}
        options={{
          headerStyle: {backgroundColor: colors.primary},
          headerTitle: 'Գլխավոր',
        }}
      />
    </ProfileStack.Navigator>
  );
};

const HardwareStack = createStackNavigator();
const HardwareStackNavigator = () => {
  const {colors} = useTheme();
  const dispatch = useDispatch();
  const token = useSelector((state) => state.LoginReducer.token);

  const reload = () => {
    dispatch(fetchHardwaresAction(token));
  };
  return (
    <HardwareStack.Navigator>
      <HardwareStack.Screen
        name="Harwares"
        component={HardwaresScreen}
        options={{
          headerStyle: {backgroundColor: colors.primary},
          headerTitle: 'Սարքեր',
          headerRight: () => (
            <NavigationIcon
              icon={() => <ReloadIcon fill="black" />}
              onPress={reload}
            />
          ),
        }}
      />
    </HardwareStack.Navigator>
  );
};

const MoreStack = createStackNavigator();
const MoreStackNavigator = () => {
  const {colors} = useTheme();
  return (
    <MoreStack.Navigator
      screenOptions={{
        headerBackTitleVisible: false,
        headerTintColor: 'black',
      }}>
      <MoreStack.Screen
        name="More"
        component={MoreScreen}
        options={{
          headerStyle: {backgroundColor: colors.primary},
          headerTitle: 'Այլ',
        }}
      />
      <MoreStack.Screen
        name="Configs"
        component={ConfigScreen}
        options={{
          headerStyle: {backgroundColor: colors.primary},
          headerTitle: 'Կարգավորումներ',
        }}
      />
    </MoreStack.Navigator>
  );
};

const BaseBottomTab = createBottomTabNavigator();
export const BaseBottomTabNavigation = () => {
  const {colors} = useTheme();
  return (
    <NavigationContainer>
      <BaseBottomTab.Navigator
        initialRouteName="Home"
        tabBarOptions={{
          activeTintColor: 'black',
          inactiveTintColor: 'gray',
          height: 72,
          labelStyle: {fontSize: 16, color: 'black', fontWeight: '400'},
        }}>
        <BaseBottomTab.Screen
          name="Home"
          component={ProfileStackNavigator}
          options={{
            tabBarIcon: ({focused}) =>
              focused ? (
                <HomeIcon width={24} height={24} fill={colors.primaryDark} />
              ) : (
                <HomeIcon width={24} height={24} fill={'gray'} />
              ),
            tabBarLabel: 'Գլխավոր',
          }}
        />
        <BaseBottomTab.Screen
          name="Hardwares"
          component={HardwareStackNavigator}
          options={{
            tabBarIcon: ({focused}) =>
              focused ? (
                <HardwareIcon fill={colors.primaryDark} />
              ) : (
                <HardwareIcon fill={'gray'} />
              ),
            tabBarLabel: 'Սարքեր',
          }}
        />
        <BaseBottomTab.Screen
          name="More"
          component={MoreStackNavigator}
          options={{
            tabBarIcon: ({focused}) =>
              focused ? (
                <MoreIcon fill={colors.primaryDark} />
              ) : (
                <MoreIcon fill={'gray'} />
              ),
            tabBarLabel: 'Այլ',
          }}
        />
      </BaseBottomTab.Navigator>
    </NavigationContainer>
  );
};
