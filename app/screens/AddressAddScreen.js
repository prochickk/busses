import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import * as Yup from "yup";

import {
  Form,
  FormField,
  FormPicker as Picker,
  SubmitButton,
} from "../components/forms";
import CategoryPickerItem from "../components/CategoryPickerItem";
import Screen from "../components/Screen";
import addressesApi from "../api/addresses";
import UploadScreen from "./UploadScreen";
import routes from '../navigation/routes';
import AuthContext from "../auth/context";
import regionsApi from "../api/regions"
import useApi from "../hooks/useApi";

const validationSchema = Yup.object().shape({
  name: Yup.string().required().min(1).label("Name"),
  nearLocCate: Yup.object().required().nullable().label("NearLocCate"),
});

function AddressAddScreen({ navigation, route }) {
  const location = route.params;
  const { user } = useContext(AuthContext);
  const [uploadVisible, setUploadVisible] = useState(false);
  const [progress, setProgress] = useState(0);
  const getRegionsApi = useApi(regionsApi.getRegions)

  useEffect(() => {
    getRegionsApi.request({ ...user });
  }, []);

  const handleSubmit = async (address, { resetForm }) => {
    console.log('getRegionsApi', getRegionsApi)

    setProgress(0);
    setUploadVisible(true);
    const result = await addressesApi.addAddress(
      { ...address, location, user },
      (progress) => setProgress(progress)
    );
    
    if (!result.ok) {
      setUploadVisible(false);
      return alert("Could not save the Address");
    }
    resetForm();

    try {
      navigation.navigate(routes.ADDRESS)
      
    } catch (error) {
      navigation.navigate(routes.SCHEDULE_ADD)
    }
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
          name: "",
          nearLocCate: null,
        }}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        <FormField maxLength={255} name="name" placeholder="اسم العنوان                                " />
        
        <Picker
          items={getRegionsApi.data}
          name="nearLocCate"
          numberOfColumns={1}
          PickerItemComponent={CategoryPickerItem}
          placeholder="أقرب منصطقة لموقعك"
          width="80%"

        />
        <View style={{alignItems: "center", flexDirection: "row"}}>
          <SubmitButton title="حــفــظ"/>
        </View>
      </Form>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
    alignItems: "flex-end",
  },
});
export default AddressAddScreen;
