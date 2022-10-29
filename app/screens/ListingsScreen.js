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

          <AppText style={styles.title}>رحـلات هـذا الأسـبـوع</AppText>

        <View style={styles.filterButtons}>
          <IconButton 
              name={"refresh"}
              onPress= {() => getListingsApi.request([day ,{...user}])}
              />
          <View style={{flexDirection: "row"}}>
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
          <AppText>يمكن لكابتن {user.group} الاطلاع على جميع العناصر في هذه الصفحة</AppText>
        </View>
      </Screen>
    </>
  );
}

const styles = StyleSheet.create({
  screen: {
    padding: 20,
    backgroundColor: colors.light,
    alignContent: "center",
  },
  title: {
    backgroundColor: colors.light,
    borderRadius: 10,
    alignItems: "center",
    alignContent: "center",
    fontSize: 30,
    marginBottom: 10,
  },
  Days: {
    marginHorizontal: 30,
    textAlign: 'right',
    backgroundColor: colors.light,
    marginTop: 10,
  },
  filterButtons: {
    flexDirection: "row-reverse",
    width: "100%",
    justifyContent: 'center',
    alignItems:'center',
    marginHorizontal: 80
  },
});

export default ListingsScreen;
