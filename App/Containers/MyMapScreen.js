// An All Components Screen is a great way to dev and quick-test components
import React from 'react'
import { Platform, View, ScrollView, Text, Image } from 'react-native'
import { Images } from '../Themes'
import styles from './Styles/MyMapScreenStyle'

// Components to show examples (only real point of merge conflict)
import '../Components/AlertMessage'
import '../Components/FullButton'
import '../Components/RoundedButton'
import '../Components/DrawerButton'

import Geocoder from 'react-native-geocoder'
import TimeAgo from 'react-native-timeago'

class MyMapScreen extends React.Component {
  state = {
    initialPosition: 'unknown',
    lastPosition: 'unknown',
    timestamp: '0',
    lat: 0.0,
    lng: 0.0,
    streetName: '',
    locality: '',
    adminArea: '',
    streetNumber: '',
    country: '',
    countryCode: '',
    postalCode: '',
    subAdminArea: '',
    subLocality: '',
    formattedAddress: ''
  }

  watchID: ? number = null

  componentDidMount () {
    var GEOCOER_API_KEY = 'AIzaSyDv2VpqmZMncx534XuPreVaDcVGFV5jyGw'

    Geocoder.fallbackToGoogle(GEOCOER_API_KEY)

    navigator.geolocation.getCurrentPosition(
      (position) => {
        var initialPosition = JSON.stringify(position)
        this.setState({initialPosition})
      },
      (error) => console.log(JSON.stringify(error)),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
    )

    this.watchID = navigator.geolocation.watchPosition((position) => {
      var lastPosition = JSON.stringify(position)

      console.log('LastPositionJSON: ' + position.coords.latitude)

      this.setState({lastPosition, lat: position.coords.latitude, lng: position.coords.longitude})

      var CURRENT_LOCATION = {lat: position.coords.latitude, lng: position.coords.longitude}

      Geocoder.geocodePosition(CURRENT_LOCATION).then(res => {
        var values = JSON.stringify(res)

        this.setState({lastPosition,
          lat: position.coords.latitude,
          lng: position.coords.longitude,
          timestamp: position.timestamp,
          streetName: res[0].streetName,
          locality: res[0].locality,
          adminArea: res[0].adminArea,
          streetNumber: res[0].streetNumber,
          country: res[0].country,
          countryCode: res[0].countryCode,
          postalCode: res[0].postalCode,
          subAdminArea: res[0].subAdminArea,
          subLocality: res[0].subLocality,
          formattedAddress: res[0].formattedAddress
        })
      }).catch(err => console.log(err))
    })
  }

  componentWillUnmount () {
    navigator.geolocation.clearWatch(this.watchID)
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


        </ScrollView>
      </View>
    )
  }
}

export default MyMapScreen
