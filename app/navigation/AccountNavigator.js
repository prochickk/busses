import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import AccountScreen from "../screens/AccountScreen";
import AddressScreen from "../screens/AddressScreen";
import MapViewScreen from "../screens/MapViewScreen";
import AddressAddScreen from "../screens/AddressAddScreen";
import UserDetailsScreen from "../screens/UserDetailsScreen";
import AdminContactScreen from "../screens/AdminContactScreen";
import UserDeleteScreen from "../screens/UserDeleteScreen";
import WelcomeScreen from "../screens/WelcomeScreen";
import GroupFilteringScreen from "../screens/GroupFilteringScreen";
import GroupsListScreen from "../screens/GroupsListScreen";
import SubscriptionsScreen from "../screens/SubscriptionsScreen";

const Stack = createStackNavigator();

const AccountNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen name="Account" component={AccountScreen} 
       options={{title: "الــحــســاب الشـخـصـي", headerTitleStyle: { fontSize: 25}}}/>
    <Stack.Screen name="UserDetails" component={UserDetailsScreen}
       options={{title: "المـلـف الشـخـصـي", headerTitleStyle: { fontSize: 25}}} />
    <Stack.Screen name="UserDeleteScreen" component={UserDeleteScreen}
       options={{title: "حذف الحساب", headerTitleStyle: { fontSize: 25}}}/>
    <Stack.Screen name="AdminContact" component={AdminContactScreen}
     options={{title:"تواصل مع المشرف", headerTitleStyle: { fontSize: 25}}}/>
    <Stack.Screen name="Address" component={AddressScreen} 
       options={{title: "الأمـاكـن و العـنـاويـن", headerTitleStyle: { fontSize: 25}}}/>
    <Stack.Screen name="AddressAdd" component={AddressAddScreen}
       options={{title: "إضـافـة مـوقـع", headerTitleStyle: { fontSize: 25}}}/>
    <Stack.Screen name="MapView" component={MapViewScreen}
      options={{headerShown: false}}/>
    <Stack.Screen name="Subscriptions" component={SubscriptionsScreen}
      options={{title: "الاشتراك", headerTitleStyle: { fontSize: 25}}}/>
   <Stack.Screen name="GroupFiltering" component={GroupFilteringScreen}
      options={{title: "تحديد المنطقة", headerTitleStyle: { fontSize: 25}}}/>
    <Stack.Screen name="GroupsList" component={GroupsListScreen}
      options={{title: "اختيار شركة التوصيل", headerTitleStyle: { fontSize: 25}}}/>
  </Stack.Navigator>
);

export default AccountNavigator;
