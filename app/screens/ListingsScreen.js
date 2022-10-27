import React, { useContext, useEffect, useState } from "react";
import { Alert, FlatList, StyleSheet, View} from "react-native";

import ActivityIndicator from "../components/ActivityIndicator";
import Button from "../components/Button";
import CardSchedule from "../components/CardSchedule";
import colors from "../config/colors";
import listingsApi from "../api/listings";
import Screen from "../components/Screen";
import AppText from "../components/Text";
import useApi from "../hooks/useApi";
import AuthContext from "../auth/context";
import AppButton from "../components/Button";
import IconButton from "../components/IconButton";
import IconPicker from "../components/IconPicker";
import CategoryPickerItem from "../components/CategoryPickerItem";

const days= [
  {label: "الأحد"},
  {label: "الأثنين"},
  {label: "الثلاثاء"},
  {label: "الأربعاء"},
  {label: "الخميس"},
]

function ListingsScreen({ navigation }) {

  const [refreshing, setRefreshing] = useState(false);
  const [uploadVisible, setUploadVisible] = useState(false);
  const [day, setDay] = useState("currentDay");
  const [textDay, setTextDay] = useState(null);
  const [progress, setProgress] = useState(0);
  const { user } = useContext(AuthContext);
  const getListingsApi = useApi(listingsApi.getListings);

  const alertDelete = "حـذف الرحــلــة";
  const bodyDelete = "هل أنت متأكد من حـذف هذه الرحلة من رحلات هـذا الأسـبـوع؟";
  
  useEffect(() => {
    getListingsApi.request([day ,{...user}]);
  }, []);

  const handleDelete = async (listing) => {
    setProgress(0);
    setUploadVisible(true);
       
    const result = await listingsApi.deleteListing(
      { ...listing },
      (progress) => setProgress(progress)
      );
      
    if (!result.ok) {
      setUploadVisible(false);
      return alert("Could not delete the Listing");
    }
  };

  return (
    <>
      <ActivityIndicator visible={getListingsApi.loading} />
      <Screen style={styles.screen}>

        <View>
          <AppText style={styles.title}>رحـلات هـذا الأسـبـوع</AppText>
        </View>
    
        <View style={{flexDirection: "row", width: "100%", justifyContent: 'center', alignItems: "center",}}>
          <View style={{flex:1}}/>
          <View style={{marginBottom: 10, width: "15%"}}>
          <IconButton 
              name={"refresh"}
              onPress= {() => getListingsApi.request([day ,{...user}])}
              />
          </View>
        <View style={{marginHorizontal: 25, alignItems: "center", marginTop: 10,}}>
          <IconPicker 
            icon={"filter"}
            items={days}
            name="goBackItem"
            numberOfColumns={1}
            PickerItemComponent={CategoryPickerItem}
            placeholder="أقرب منصطقة لموقعك"
            onSelectItem={(item) => {setTextDay(item.label) ,setDay(item.label)}}
            />
          { {textDay} && <View style={styles.Days}>
          <AppText>{textDay}</AppText>
          </View>}
        </View>
        </View>



        {getListingsApi.error && (
          <>
            <AppText>Couldn't retrieve the listings.</AppText>
            <Button title="Retry" onPress={() => getListingsApi.request([day ,{...user}])} />
          </>
        )}
        
        <FlatList
          data={getListingsApi.data}
          keyExtractor={(listing) => listing.idListing.toString()}
          renderItem={({ item }) => (
            <CardSchedule
                dayCate={item.tripDayL}
                timeCate={item.tripTimeL}
                addressCate= {item.addressRegionL}
                typeCate={item.tripTypeL}
                deleteBtn={() => {Alert.alert(alertDelete, bodyDelete, [
                  {text: "نعم", onPress: () => {
                    handleDelete({item}), getListingsApi.request([day ,{...user}])}},
                    {text: "لا"}])
                     }}
                />
                )}

              refreshing={refreshing}
              onRefresh={() => getListingsApi.request([day ,{...user}])}
        />
        <View>
          <AppText>جميع العناصر في هذه الصفحة يمكن لكابتن {user.group} الاطلاع عليها</AppText>
        </View>
      </Screen>
    </>
  );
}

const styles = StyleSheet.create({
  screen: {
    padding: 20,
    backgroundColor: colors.light,
  },
  OneTripView: {
    marginTop:20,
    width: "100%",
    height: 150,
    backgroundColor: colors.medium,
    borderRadius: 20,
    marginBottom: 20,
    alignItems: "center"
  },
  title: {
    backgroundColor: colors.light,
    borderRadius: 10,
    alignItems: "center",
    alignContent: "center",
    fontSize: 30,
    marginBottom: 30,

  },
  Days: {
    marginTop: 5,
    textAlign: 'right',
    backgroundColor: colors.light,
    paddingHorizontal: 0,
  },
  OneTripText: {
    margin: 10,
    backgroundColor: colors.white,
    marginBottom: 60,
  },
  tripMakingBtn: {
    width: "80%",
  },
});

export default ListingsScreen;
