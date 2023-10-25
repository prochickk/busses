import React, { useContext, useState } from "react";
import { View, StyleSheet, Alert } from 'react-native';
import AppButton from '../components/Button';
import Screen from '../components/Screen';
import AppText from '../components/Text';
import colors from '../config/colors';
import routes from '../navigation/routes';

import { useEffect } from "react";
import { FlatList } from "react-native";

import ActivityIndicator from "../components/ActivityIndicator";
import CardSchedule from "../components/CardSchedule";
import schedulesApi from "../api/schedules";
import useApi from "../hooks/useApi";
import listingsApi from "../api/listings";
import AuthContext from "../auth/context";


function ScheduleScreen( {navigation} ) {
  const [refreshing, setRefreshing] = useState(false);
  const [uploadVisible, setUploadVisible] = useState(false);
  const [progress, setProgress] = useState(0);
  const { user } = useContext(AuthContext);

  const alertAdd = "اضافة لرحلات الاسبوع";
  const bodyAdd = "هل أنت متأكد من اضافة هذه الرحلة لقائمة رحلات هذا الاسبوع؟";
  const alertDelete = "حـذف الرحــلــة";
  const bodyDelete = "هل أنت متأكد من حـذف هذه الرحلة من الجـدول؟";
  
  const reff = () => getSchedulesApi.request({...user});
  const getSchedulesApi = useApi(schedulesApi.getSchedules);

  useEffect(() => {
    getSchedulesApi.request({ ...user });
  }, []);

  const handleDelete = async (schedule) => {
    setProgress(0);
    setUploadVisible(true);    
    const result = await schedulesApi.deleteSchedule(
      { ...schedule },
      (progress) => setProgress(progress)
      );
      
      if (!result.ok) {
        setUploadVisible(false);
        return alert("Could not delete the Schedule");
      }
    };
    
    return (    
      <>
        <Screen style={styles.screen}>
          <View style={styles.OneTripView}>
            <AppButton 
              title= {" إضافة رحلة للجدول"}
              width="80%"
              height= {45}
              onPress={() => {reff(), navigation.navigate(routes.SCHEDULE_ADD)}}/>
          </View>
      
        <ActivityIndicator visible={getSchedulesApi.loading} />
          {getSchedulesApi.error && (
            <>
              <AppText>لم يتم تحميل الخيارات</AppText>
              <AppButton title="إعادة المحاولة" onPress={() => getSchedulesApi.request({...user})} />
            </>
              )}
        <View style={styles.AddDeleteBtns}>
          <FlatList
            data={getSchedulesApi.data}
            keyExtractor={(schedule) => schedule.idSchedule.toString()}
            renderItem={({ item }) => (

              <CardSchedule
                dayCate={item.tripDay}
                timeCate={item.tripTime}
                addressCate= {item.addressRegion}
                typeCate={item.tripType}
                onPress={() => null} 
                deleteBtn={() => {Alert.alert(alertDelete, bodyDelete, [
                  {text: "نعم", onPress: () => {
                    handleDelete({item}), reff()}}, {text: "لا"}])
                     }}
                addBtn= {() => {Alert.alert(alertAdd, bodyAdd, [
                  {text: "نعم", onPress: () => { 
                    listingsApi.addListing({...item, user}), reff(), 
                    navigation.navigate(routes.LISTINGS)}}, {text: "لا"}])
                     }}/>
                     )}

                refreshing={refreshing}
                onRefresh={() => getSchedulesApi.request({...user})}
            />
            <View style={styles.BottomText}>
              <AppText>جميع العناصر في هذه الصفحة خاصة بك ولن يمكن لكابتن {user.group} رؤيتها </AppText>
            </View>
          </View> 
      </Screen>
    </>
      );
    }


const styles = StyleSheet.create({
  AddDeleteBtns: {
    backgroundColor: colors.light,
    borderRadius: 20,
  },
  container: {
    backgroundColor: colors.light,
    alignItems: "center",
    padding: 20,
    width: "100%",
    alignItems: "center",
  },
  AddToSchedule: {
    width: "100%",
    height: 80,
    backgroundColor: colors.white,
    },
    OneTripView: {
      marginTop:20,
      width: "100%",
      height: 80,
      backgroundColor: colors.white,
      borderRadius: 20,
      marginBottom: 20,
      alignItems: "center",
      justifyContent: "center",
    },
    OneTripText: {
      margin: 10,
      backgroundColor: colors.white,
      marginBottom: 10,
    },
    screen: {
      padding: 20,
      backgroundColor: colors.light,
      marginBottom: 80,
      marginTop: -30,
    },
    BottomText: {
      padding: 10,
     
    },
});
 
export default ScheduleScreen;