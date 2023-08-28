import React, { useEffect, useState } from "react";
import { StyleSheet, Image, TouchableOpacity  } from "react-native";
import * as Yup from "yup";

import Screen from "../components/Screen";
import routes from '../navigation/routes'
import {
  ErrorMessage,
  Form,
  FormField,
  SubmitButton,
} from "../components/forms";
import authApi from "../api/auth";
import useAuth from "../auth/useAuth";
import AppText from "../components/Text";
import { Alert } from "react-native";

const validationSchema = Yup.object().shape({
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(4).label("Password"),
});

function UserDeleteScreen() {
  const { auth, logOut } = useAuth();
  const [loginFailed, setLoginFailed] = useState(false);

  const handleSubmit = async ({ email, password }) => {
    const result = await authApi.login(email, password);
    if (!result.ok) return setLoginFailed(true);

    setLoginFailed(false);

    Alert.alert("حذف الحساب", "هل أنت متأكد من جميع بيانات حسابك؟", [
      {text: "نعم", onPress: async() => {
        const deleteResult = await authApi.userDelete(email, password);
        alert("تم حذف بيانات حسابك")
        if (deleteResult.ok) return logOut()}},
        {text: "لا"}])

  };

  return (
    <Screen style={styles.container}>
      <Image style={styles.logo} source={require("../assets/logo-red.png")} />

      <Form
        initialValues={{ email: "", password: ""}}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        <ErrorMessage
          error="اسم المسخدم او كلمة المرور خاطئة"
          visible={loginFailed}
        />
        <FormField
          autoCapitalize="none"
          autoCorrect={false}
          icon="email"
          keyboardType="email-address"
          name="email"
          placeholder="البريد الإلكتروني"
          textContentType="emailAddress"
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
        <SubmitButton title="Login" />
      </Form>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  logo: {
    width: 80,
    height: 80,
    alignSelf: "center",
    marginTop: 50,
    marginBottom: 20,
  },
});

export default UserDeleteScreen;
