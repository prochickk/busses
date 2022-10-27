import React, { useEffect, useState, useContext } from "react";
import { StyleSheet, View, FlatList, Alert } from "react-native";

import ActivityIndicator from "../components/ActivityIndicator";
import colors from "../config/colors";
import routes from "../navigation/routes";
import Screen from "../components/Screen";
import AppText from "../components/Text";
import AppButton from "../components/Button";
import CardAddress from "../components/CardAddress";
import useApi from "../hooks/useApi";
import addressesApi from '../api/addresses';
import AuthContext from "../auth/context";



function AddressScreen({ navigation }) {
  const [refreshing, setRefreshing] = useState(false);
  const { user } = useContext(AuthContext);
  const [uploadVisible, setUploadVisible] = useState(false);
  const [progress, setProgress] = useState(0);
  const getAddressesApi = useApi(addressesApi.getAddresses);

  const alertDelete = "حـذف العــنــوان";
  const bodyDelete = "هل أنت متأكد من حـذف هـذا الموقع مـن قـائـمـة الـعنـاويـن؟";

    useEffect(() => {
        getAddressesApi.request({ ...user });
      }, []);

      const handleDelete = async (address) => {
        setProgress(0);
        setUploadVisible(true);      
        const result = await addressesApi.deleteAddress(
          { ...address },
          (progress) => setProgress(progress)
          );
          if (!result.ok) {
            setUploadVisible(false);
            return alert("Could not delete the Address");
          }
      };

    return (
      <>
        <ActivityIndicator visible={getAddressesApi.loading} />
        <Screen style={styles.screen}>

          <View style={styles.MapAddBtn}>
          <AppButton width="80%"
            height={45}
            title={"إضافة عنوان"}
            onPress={() => {navigation.navigate(routes.MAPVIEW)}}/>
          </View>

          {getAddressesApi.error && (
          <>
            <AppText>Couldn't retrieve the addresses.</AppText>
            <AppButton title="Retry" onPress={() => getAddressesApi.request({...user})} />
          </>
        )}
        <FlatList
          data={getAddressesApi.data}
          keyExtractor={(address) => address.idAddress.toString()}
          renderItem={({ item }) => (
            <CardAddress
              title={item.name}
              subTitle={item.region}
              deleteBtn = {() => {Alert.alert(alertDelete, bodyDelete, [
                {text: "نعم", onPress: () => {
                  handleDelete({item}), getAddressesApi.request({...user})}},
                  {text: "لا"}])
                   }}
              onPress={() => null}
            />
          )}
          refreshing={refreshing}
          onRefresh={() => getAddressesApi.request({...user})}
        />

      </Screen>
      </>
  );
}
const styles = StyleSheet.create({
  screen: {
    backgroundColor: colors.light,
    alignContent: "center",
    margin: 10,
    marginTop: -10,
  },
  screen2: {
    backgroundColor: colors.light,
    alignContent: "center",
    alignItems: "center",

  },
  container: {
    marginVertical: 20,
  },
  title: {
    backgroundColor: colors.light,
    borderRadius: 10,
    alignItems: "center",
    alignContent: "center",
    fontSize: 25,

  },
  MapAddBtn: {
    marginEnd: 15,

    alignItems: "center", 
    justifyContent: "center",
    margin: 5,
  },
});

export default AddressScreen;
