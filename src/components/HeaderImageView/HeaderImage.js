import React from 'react';
import {View, StyleSheet, Image} from 'react-native';

export const HeaderImageView = (props) => {
  return (
    <View style={styles.headerView}>
      <Image source={require('./headerImage.png')} style={styles.image} />
    </View>
  );
};

const styles = StyleSheet.create({
  headerView: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  image: {
    flex: 1,
    resizeMode: 'stretch',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
