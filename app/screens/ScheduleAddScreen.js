import React, { useContext, useEffect, useState } from "react";
import { Platform, StyleSheet, View } from "react-native";
import * as Yup from "yup";

import {
  Form,
  FormPicker as Picker,
  SubmitButton,
} from "../components/forms";
import CategoryPickerItem from "../components/CategoryPickerItem";
import Screen from "../components/Screen";
import schedulesApi from "../api/schedules";
import UploadScreen from "./UploadScreen";
import colors from "../config/colors";
import routes from "../navigation/routes";
import addressesApi from '../api/addresses';
import timesApi from '../api/times';
import useApi from "../hooks/useApi";
import AuthContext from "../auth/context";
import AppButton from "../components/Button";

const validationSchema = Yup.object().shape({
  typeCate: Yup.object().required().nullable().label("نوع الرحلة"),
  timeCate: Yup.object().required().nullable().label("الوقــت"),
  dayCate: Yup.object().required().nullable().label("الــيـوم"),
  addressCate: Yup.object().required().nullable().label("العـنـوان"),
});



const typeCates = [
  {
    backgroundColor: colors.secondary,
    icon: "home",
    label: "عودة مـن الجامعة",
  },
  {
    backgroundColor: colors.dark,
    icon: "electron-framework",
    label: "ذهاب لـلـجامـعـة",
  },
]

const timeCates = [
  {
    backgroundColor: colors.dark,
    icon: "timer",
    label: "12:00-12:50",
  },
  {
    backgroundColor: colors.dark,
    icon: "timer-outline",
    label: "11:00-11:50",
  },
  {
    backgroundColor: colors.dark,
    icon: "timer",
    label: "10:00-10:50",
  },
  {
    backgroundColor: colors.dark,
    icon: "timer-outline",
    label: "9:00-9:50",
  },
  {
    backgroundColor: colors.dark,
    icon: "timer",
    label: "8:00-8:50",
  },
  {
    backgroundColor: colors.dark,
    icon: "timer-outline",
    label: "7:00-7:50",
  },
  {
    backgroundColor: colors.dark,
    icon: "timer",
    label: "6:00-6:50",
  },
]

const dayCates = [
  {
    backgroundColor: colors.medium,
    label: "الأحد",
  },
  {
    backgroundColor: colors.medium,
    label: "الأثنين",
  },
  {
    backgroundColor: colors.medium,
    label: "الثلاثاء",
  },
  {
    backgroundColor: colors.medium,
    label: "الأربعاء",
  },
  {
    backgroundColor: colors.medium,
    label: "الخميس",
  },
];

function ScheduleAddScreen({ navigation }) {

  const [uploadVisible, setUploadVisible] = useState(false);
  const [progress, setProgress] = useState(0);
  const { user } = useContext(AuthContext);

  const getAddressesApi = useApi(addressesApi.getAddresses);
  const getTimesApi = useApi(timesApi.getTimes);

  useEffect(() => {
    getAddressesApi.request( {...user});
  }, []);
  useEffect(() => {
    getTimesApi.request("go");
  }, []);
  
  const handleSubmit = async (schedule, { resetForm }) => {
    setProgress(0);
    setUploadVisible(true);
    const result = await schedulesApi.addSchedule(
      {...schedule, user},
      (progress) => setProgress(progress)
      );
      
      if (!result.ok) {
        setUploadVisible(false);
      return alert("Could not save the schedule");
    }
    
    resetForm();
    navigation.navigate(routes.SCHEDULE)
  };

  return (
    <Screen style={styles.container}>
      <UploadScreen
        onDone={() => setUploadVisible(false)}
        progress={progress}
        visible={uploadVisible}
      />
      <Form
        initialValues={{
          typeCate: null,
          timeCate: null,
          dayCate: null,
          addressCate: null,
        }}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        <Picker
          items={typeCates}
          name="typeCate"
          numberOfColumns={1}
          PickerItemComponent={CategoryPickerItem}
          placeholder= "نــوع الرحــلة"
          width="55%"
          // onSelectItem = {(item) => console.log("typecate selected item ScheAddSCre",item)} 
          />
        <Picker
          items={getTimesApi.data}
          name="timeCate"
          numberOfColumns={1}
          PickerItemComponent={CategoryPickerItem}
          placeholder="الـوقـــت"
          width="55%"
        />
        <Picker
          items={dayCates}
          name="dayCate"
          numberOfColumns={1}
          PickerItemComponent={CategoryPickerItem}
          placeholder="الـــيــــوم"
          width="55%"
        />
        <View style={styles.AddressView}>
          <View style={{width: '67%', flexDirection: 'column-reverse'}}>
            <Picker
              items={getAddressesApi.data}
              name="addressCate"
              numberOfColumns={1}
              PickerItemComponent={CategoryPickerItem}
              placeholder="الـعـنــوان"
              width="85%"
            />
          </View>
          <View style={{flex:1}}/>
          <AppButton width="30%" title={"إضافة موقع"} height={50}
          onPress={() => {navigation.navigate( routes.ADDRESS), console.log("addressesssss ScheduleAddScreen",getAddressesApi.data),getAddressesApi.request({...user})}}/>
        </View>

        <SubmitButton title="إرسـال الرحـلـة للـجـدول " />
      </Form>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    marginTop: Platform.OS === "android" ? -15 : 5,
  },
  AddressView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
});
export default ScheduleAddScreen;
