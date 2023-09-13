import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import * as Yup from "yup";
import Screen from "../components/Screen";
import {
  ErrorMessage,
  Form,
  FormPicker as Picker,
  SubmitButton,
} from "../components/forms";
import colors from "../config/colors";
import useApi from "../hooks/useApi";
import ActivityIndicator from "../components/ActivityIndicator";
import groupsList from "../api/groupsList";
import CategoryPickerItemGroupsLists from "../components/CategoryPickerItemGroupsLists";
import routes from "../navigation/routes";
import RegisterationRoadMap from "../components/RegisterationRoadMap";
import { View } from "react-native";
import useAuth from "../auth/useAuth";

const validationSchema = Yup.object().shape({

    regions: Yup.object().required('اختر المنطقة').nullable().label("المنطقة"),
    universities: Yup.object().required("اختر الجامعة").nullable().label("الجامعة"),
    sections: Yup.object().required("اختر الحي").nullable().label("الحي"),
});


function GroupFilteringScreen({ navigation }) {
  const getGroupListApi = useApi(groupsList.getLists);
  const [error, setError] = useState();
  const [currentStep, setCurrentStep] = useState(0);
  const { user } = useAuth();
  
  const handleStepPress = () => {
    setCurrentStep(0);
  };
  

  
  useEffect(() => {
    getGroupListApi.request()
  }, []);



  const handleSubmit = async (regionsInfo) => {
    navigation.navigate(routes.GROUPSLIST, regionsInfo)

  };

  return (
    <>
      <ActivityIndicator visible={getGroupListApi.loading} />
        <View>
          <RegisterationRoadMap currentStep={currentStep} onPressStep={handleStepPress} regPostition={user} />
        </View>
      <Screen style={styles.container}>
        <Form
          initialValues={{
            universities: null,
            regions: null,
            sections: null,
          }}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          <ErrorMessage error={error} visible={error} />

          <Picker
          items={getGroupListApi.data.universities}
          name="universities"
          numberOfColumns={1}
          PickerItemComponent={CategoryPickerItemGroupsLists}
          placeholder="الجامعة"
          width="80%"
          />
          <Picker
          items={getGroupListApi.data.regions}
          name="regions"
          numberOfColumns={1}
          PickerItemComponent={CategoryPickerItemGroupsLists}
          placeholder="منطقة منزلك"
          width="80%"
          />
          <Picker
          items={getGroupListApi.data.sections}
          name="sections"
          numberOfColumns={1}
          PickerItemComponent={CategoryPickerItemGroupsLists}
          placeholder="أقرب حي لمنزلك"
          width="80%"
          />

          <SubmitButton title="بـــــحــــــث" />
        </Form>
      </Screen>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
});

export default GroupFilteringScreen;
