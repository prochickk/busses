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

const validationSchema = Yup.object().shape({
  name: Yup.string().required().label("Name"),
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(4).label("Password"),
  mobileNumber: Yup.string().required().min(10).max(10).label("MobileNumber"),
  groupCate: Yup.object().required().nullable().label("مجموعة التوصيل"),

});


function RegisterScreen() {
  const registerApi = useApi(usersApi.register);
  const loginApi = useApi(authApi.login);
  const auth = useAuth();
  const [error, setError] = useState();
  
  const getRegionsApi = useApi(regionsApi.getRegions)
  const driver = {group: "New"};
  useEffect(() => {
    getRegionsApi.request(driver);
  }, []);

  const handleSubmit = async (userInfo) => {
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
      <Screen style={styles.container}>
        <Form
          initialValues={{
            name: "",
            email: "",
            password: "",
            groupCate: null,
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
          <Picker
          items={getRegionsApi.data}
          name="groupCate"
          numberOfColumns={1}
          PickerItemComponent={CategoryPickerItem}
          placeholder="مجموعة التوصيل"
          width="80%"
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
