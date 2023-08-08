import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import WelcomeScreen from "../screens/WelcomeScreen";
import ForgetPasswordScreen from "../screens/ForgetPasswordScreen";
import ResetPasswordScreen from "../screens/ResetPasswordScreen";

const Stack = createStackNavigator();

const AuthNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Welcome"
      component={WelcomeScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen name="Login" component={LoginScreen} 
      options={{title: "تسجيل دخول", headerTitleStyle: { fontSize: 25}}}/>
    <Stack.Screen name="Register" component={RegisterScreen}
      options={{title: "تسجيل جديد", headerTitleStyle: { fontSize: 25}}}/>
    <Stack.Screen name="ForgetPassword" component={ForgetPasswordScreen}
      options={{title: 'نسيت كلمة المرور', headerTitleStyle: { fontSize: 25}}}/>
    <Stack.Screen name="ResetPassword" component={ResetPasswordScreen}
      options={{title: "إعادة ضبط كلمة المرور", headerTitleStyle: { fontSize: 25}}}/>
  </Stack.Navigator>
);

export default AuthNavigator;
