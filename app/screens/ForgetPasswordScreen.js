import React, { useState } from "react";
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
import AppText from "../components/Text";
import passwordForgot from "../api/passwordForgot";

const validationSchema = Yup.object().shape({
    email: Yup.string().required().email().label("Email"),
  });

function ForgetPasswordScreen({ navigation }) {
    const [emailCheck, setEmailCheck] = useState(false);

    const handleSubmit = async (email) => {
        const result = await passwordForgot.passwordForgot(email);
        if (result.status == 404) {return setEmailCheck(true)}
        setEmailCheck(false);

        navigation.navigate(routes.RESETPASSWORD, email)  
    }

    return (
        <Screen style={styles.container}>
            <Image style={styles.logo} source={require("../assets/logo-red.png")} />
        
            <ErrorMessage
            error="Invalid Email"
            visible={emailCheck}
            />
        
            <Form
                initialValues={{ email: ""}}
                onSubmit={handleSubmit}
                validationSchema={validationSchema}
            >

            <FormField
              autoCapitalize="none"
              autoCorrect={false}
              icon="email"
              keyboardType="email-address"
              name="email"
              placeholder="البريد الإلكتروني"
              textContentType="emailAddress"
            />
            <SubmitButton title="تحقق" />
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
    
export default ForgetPasswordScreen;