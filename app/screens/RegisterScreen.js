import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import * as Yup from "yup";
import CategoryPickerItem from '../components/CategoryPickerItem'
import Screen from "../components/Screen";
import usersApi from "../api/users";
import authApi from "../api/auth";
import useAuth from "../auth/useAuth";
import {
  ErrorMessage,
  Form,
  FormPicker as Picker,
  FormField,
  SubmitButton,
} from "../components/forms";
import colors from "../config/colors";
import useApi from "../hooks/useApi";
import ActivityIndicator from "../components/ActivityIndicator";
import regionsApi from "../api/regions"
import routes from "../navigation/routes";
import RegisterationRoadMap from "../components/RegisterationRoadMap";
import { View } from "react-native";

const validationSchema = Yup.object().shape({
  name: Yup.string().required().label("Name"),
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(4).label("Password"),
  mobileNumber: Yup.string().required().min(10).max(10).label("MobileNumber"),
});


function RegisterScreen({ navigation, route }) {
  const registerApi = useApi(usersApi.register);
  const loginApi = useApi(authApi.login);
  const auth = useAuth();
  const [error, setError] = useState();

  const [currentStep, setCurrentStep] = useState(2);

  const handleStepPress = (stepIndex) => {
    setCurrentStep(stepIndex);
    if (stepIndex == 0) {
      setCurrentStep(stepIndex);
      navigation.navigate(routes.GROUPFILTERING)
    }
    if (stepIndex == 1) {
      navigation.navigate(routes.GROUPSLIST)
    } else {
      setCurrentStep(2);
    }
  };
  
  const handleSubmit = async (userInfo) => {
    userInfo.groupCate = route.params.groupList
    const result = await registerApi.request(userInfo);

    if (!result.ok) {
      if (result.data) setError(result.data.error);
      else {
        setError("An unexpected error occurred.");
        console.log(result);
      }
      return;
    }

    const { data: authToken } = await loginApi.request(
      userInfo.email,
      userInfo.password
    );
    auth.logIn(authToken);
  };

  return (
    <>
      <ActivityIndicator visible={registerApi.loading || loginApi.loading} />

      <View>
        <RegisterationRoadMap currentStep={currentStep} onPressStep={handleStepPress} />
        </View>

      <Screen style={styles.container}>
        <Form
          initialValues={{
            name: "",
            email: "",
            password: "",
            mobileNumber: ""
          }}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          <ErrorMessage error={error} visible={error} />
          <FormField
            autoCorrect={false}
            icon="account"
            name="name"
            placeholder="الاسم الثلاثي"
          />
          <FormField
            autoCapitalize="none"
            autoCorrect={false}
            icon="email"
            keyboardType="email-address"
            name="email"
            placeholder="البريد الالكتروني"
            textContentType="emailAddress"
          />
          <FormField
            autoCapitalize="none"
            autoCorrect={false}
            icon="phone"
            keyboardType="numeric"
            name="mobileNumber"
            placeholder="رقم الهاتف (الواتس اب)"
          />
          <FormField
            autoCapitalize="none"
            autoCorrect={false}
            icon="lock"
            name="password"
            placeholder="كلمة المرور"
            secureTextEntry
            textContentType="password"
          />
          <SubmitButton title="تسجيل" />
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

export default RegisterScreen;
