import React, { useState } from 'react';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { StyleSheet, View, Dimensions, Image, Button } from 'react-native';

import Screen from '../components/Screen';
import useLocation from '../hooks/useLocation';
import AppButton from '../components/Button';
import routes from '../navigation/routes';
import IconButton from '../components/IconButton';


function MapViewScreen({ navigation }) {

    const location = useLocation();
    //const locationInit = {...location}
    //const locationI = {latitudeDelta: 0.0922, longitudeDelta: 0.0421, ...location}
    //const { latitude, longitude } = locationInit;
    const [pickedAddress, setPickedAddress] = useState();


    const [pin, setPin] = useState({
        latitude: 25.3373183,
        longitude: 49.5989117,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,   
    });

    const onChangeValue = region => {
        const { latitudeDelta, longitudeDelta, ...rest} = region
        // console.log("rest", rest);
        setPickedAddress (rest)
      };

  return (
    <Screen >

      <MapView 
          style={styles.map} 
          showsUserLocation={true}
          followsUserLocation={true}
          showsMyLocationButton={true}
          initialRegion={pin}
          provider= {PROVIDER_GOOGLE}
          onRegionChangeComplete = {onChangeValue}
          mapPadding={{top:0, right:0, left:0, bottom:0}}
          zoomEnabled={true}
          minZoomLevel={5}
          maxZoomLevel={20}

      >
      </MapView>

      <View style={styles.MarkerImageView}>
          <Image style= {{height: 48, width: 48}} source={require("../assets/redMarker.png")}/>
      </View>

      <View style={styles.ButtonView}>
          <AppButton 
          title={"تـأكـيـد الموقع"}
          height={50}
          onPress={() => navigation.navigate(
            routes.ADDRESS_ADD, pickedAddress)}/>
      </View>

    </Screen>
);
}

const styles = StyleSheet.create({
    ButtonView: {
      width: 150,
      height: 50,
      top: "88%", 
      left: "50%",
      marginLeft: -75,
      borderRadius: 30,
      position: "absolute",

    },
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
    },
    map: {
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height,
      flex: 1,
      zIndex: -1,
    },
    MarkerImageView: {
      top: "50%",
      left: "50%",
      marginLeft: -24,
      marginTop: -48,
      position: "absolute"
    },
    myLocationIcon: {
      margin: 10,
    },
    
  });

export default MapViewScreen;