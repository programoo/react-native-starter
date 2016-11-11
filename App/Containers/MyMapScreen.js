// An All Components Screen is a great way to dev and quick-test components
import React from 'react'
import { Platform, View, ScrollView, Text, Image, StyleSheet } from 'react-native'
import { Images } from '../Themes'

// Components to show examples (only real point of merge conflict)
import '../Components/AlertMessage'
import '../Components/FullButton'
import '../Components/RoundedButton'
import '../Components/DrawerButton'

import Geocoder from 'react-native-geocoder'
import TimeAgo from 'react-native-timeago'
import MapView from 'react-native-maps';

// const styles = StyleSheet.create({
//   container: {
//     ...StyleSheet.absoluteFillObject,
//     height: 400,
//     width: 400,
//     justifyContent: 'flex-end',
//     alignItems: 'center',
//   },
//   map: {
//     ...StyleSheet.absoluteFillObject,
//   },
// });
const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    height: 400,
    width: 400,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});

class MyMapScreen extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <MapView
        style={ styles.map }
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      />
    );
  }
}

export default MyMapScreen
