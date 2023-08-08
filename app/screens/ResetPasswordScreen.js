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
import UploadScreen from "./UploadScreen";

const validationSchema = Yup.object().shape({
    password: Yup.string().required().min(4).label('Password'),
    passwordConfirm: Yup.string().required().min(4).label('Password Confirmation'),
  });


function ResetPasswordScreen({ navigation, route }) {
    const [emailCheck, setEmailCheck] = useState(false);
    const [uploadVisible, setUploadVisible] = useState(false);
    const [progress, setProgress] = useState(0);

    const handleSubmit = async ({ password, passwordConfirm }) => {
        setProgress(0);
        setUploadVisible(true);

        if (password !== passwordConfirm) {return setEmailCheck(true)}
        setEmailCheck(false);
        const email = route['params']['email']
        const result = await passwordForgot.passwordReset( {email, password},
            (progress) => setProgress(progress)
            );
        if (result.status == 404) { 
            setUploadVisible(false);
            return setEmailCheck(true) 
        }
        navigation.navigate(routes.LOGIN)
        };

    return (
        <Screen style={styles.container}>
          <UploadScreen
            onDone={() => setUploadVisible(false)}
            progress={progress}
            visible={uploadVisible}
          />

          <Image style={styles.logo} source={require("../assets/logo-red.png")} />

          <ErrorMessage
          error="كلمتا المرور غير متطابقتين"
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
                icon="lock"
                name="password"
                placeholder="كلمة المرور الجديدية"
                secureTextEntry
                textContentType="password"
            />
            
            <FormField
                autoCapitalize="none"
                autoCorrect={false}
                icon="lock"
                name="passwordConfirm"
                placeholder="تأكيد كلمة المرور"
                secureTextEntry
                textContentType="password"
            />

            <SubmitButton title="تغيير كلمة المرور" />
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
    
export default ResetPasswordScreen;