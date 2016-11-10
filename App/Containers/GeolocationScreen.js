// An All Components Screen is a great way to dev and quick-test components
import React from 'react'
import { Platform, View, ScrollView, Text, Image } from 'react-native'
import { Images } from '../Themes'
import styles from './Styles/GeolocationScreenStyle'

// Components to show examples (only real point of merge conflict)
import '../Components/AlertMessage'
import '../Components/FullButton'
import '../Components/RoundedButton'
import '../Components/DrawerButton'

import Geocoder from 'react-native-geocoder';

class GeolocationScreen extends React.Component {
  state = {
    initialPosition: 'unknown',
    lastPosition: 'unknown',
    lat: 0.0,
    lng: 0.0
  };

  watchID: ? number = null;

  componentDidMount() {
    var GEOCOER_API_KEY = 'AIzaSyDv2VpqmZMncx534XuPreVaDcVGFV5jyGw';
    Geocoder.fallbackToGoogle(GEOCOER_API_KEY);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        var initialPosition = JSON.stringify(position);
        this.setState({initialPosition});
      },
      (error) => alert(JSON.stringify(error)),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
    );

    this.watchID = navigator.geolocation.watchPosition((position) => {
      var lastPosition = JSON.stringify(position);
      var lastPositionJSON = JSON.parse(lastPosition);

      var coords = position.coords;

      console.log('LastPositionJSON: ' + position.coords.latitude);

      this.setState({lastPosition, lat: position.coords.latitude, lng: position.coords.longitude});

      CURRENT_LOCATION = {lat: position.coords.latitude, lng: position.coords.longitude};

      Geocoder.geocodePosition(CURRENT_LOCATION).then(res => {
        var values = JSON.stringify(res);
        console.log('geocodePosition' + values);
      }).catch(err => console.log(err))
    });
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchID);
  }

  renderAndroidWarning () {
    if (Platform.OS === 'android') {
      return (
        <Text style={styles.sectionText}>
          Android only: Animations are slow? You are probably running the app in debug mode.
          It will run more smoothly once your app will be built.
        </Text>
      )
    }
    return null
  }

  render () {
    return (
      <View style={styles.mainContainer}>
        <Image source={Images.background} style={styles.backgroundImage} resizeMode='stretch' />
        <ScrollView style={styles.container}>
          <View style={styles.section}>
            {this.renderAndroidWarning()}

            <Text style={styles.sectionText}>
              GeolocationScreen.js
            </Text>
            <Text style={styles.subtitle} >
              All components that register examples will be rendered below:
              {this.state.lastPosition}
              LAT HERE
              {this.state.lat}
              LNG
              {this.state.lng}
            </Text>
          </View>
        </ScrollView>
      </View>
    )
  }
}

export default GeolocationScreen
