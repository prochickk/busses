import React, { useContext, useEffect } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import AccountNavigator from "./AccountNavigator";
import FeedNavigator from "./FeedNavigator";
import NewListingButton from "./NewListingButton";
import routes from "./routes";
import navigation from "./rootNavigation";
import useNotifications from "../hooks/useNotifications";
import ScheduleNavigator from "./ScheduleNavigator";
import SubsWaitingScreen from "../screens/SubsWaitingScreen";
import AuthContext from "../auth/context";
import usersApi from '../api/users';


const Tab = createBottomTabNavigator();



const AppNavigator = () => {
  useNotifications();

  const { user } = useContext(AuthContext);
  const getUsersApi = useApi(usersApi.getUser);

  useEffect(() => {
    getUsersApi.request({ ...user });
  }, []);
  
  return (
    <Tab.Navigator>
      {getUsersApi.data.groupConfirmation && <Tab.Screen
        name="رحلات لهـذا الأسبوع"
        component={FeedNavigator}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
          headerShown: false,
        }}
      /> }{!getUsersApi.data.groupConfirmation && 
      <Tab.Screen
      name="رحلات لهـذا الأسبوع"
      component={SubsWaitingScreen}
      options={{
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="home" color={color} size={size} />
        ),
        headerShown: false,
      }}/> }

      { getUsersApi.data.groupConfirmation && <Tab.Screen
        name="Schedule"
        component={ScheduleNavigator}
        options={({ navigation }) => ({
          tabBarButton: () => (
            <NewListingButton
              onPress={() => navigation.navigate(routes.SCHEDULE)}
            />
          ),
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="plus-circle"
              color={color}
              size={size}
            />
          ),
          headerShown: false,})}
      /> }{!getUsersApi.data.groupConfirmation &&
      <Tab.Screen
      name="Schedule"
      component={SubsWaitingScreen}
      options={({ navigation }) => ({
        tabBarButton: () => (
          <NewListingButton
            onPress={() => navigation.navigate(routes.SCHEDULE)}
          />
        ),
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons
            name="plus-circle"
            color={color}
            size={size}
          />
        ),
        headerShown: false,})}
    />
    }
      <Tab.Screen
        name="الحـساب الشخصـي"
        component={AccountNavigator}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account" color={color} size={size} />
          ),
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
};

export default AppNavigator;
