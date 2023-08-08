import { useEffect, useState } from "react";
import * as Location from "expo-location";
import { Alert } from "react-native";

export default useLocation = () => {
  const [location, setLocation] = useState();

  const getLocation = async () => {
    try {
      const { granted } = await Location.requestForegroundPermissionsAsync();
      if (!granted) {
        Alert.alert('Location Permission', 'Kindly permit Hafel to use the location from the settings. A General location is set instead', [
        {text: "OK"}])
        return;
      };
      const {
        coords: { latitude, longitude },
      } = await Location.getLastKnownPositionAsync();
      setLocation({ latitude, longitude });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getLocation();
  }, []);

  return location;
};
