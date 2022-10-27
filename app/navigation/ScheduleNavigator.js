import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import ScheduleAddScreen from "../screens/ScheduleAddScreen";
import ScheduleScreen from "../screens/ScheduleScreen";
import ListingsScreen from "../screens/ListingsScreen";
import AddressAddScreen from "../screens/AddressAddScreen";
import MapViewScreen from "../screens/MapViewScreen";
import AddressScreen from "../screens/AddressScreen";

const Stack = createStackNavigator();

const ScheduleNavigator = () => (
  <Stack.Navigator screenOptions={{
    headerStyle: {
      backgroundColor: 'white'}}}>
    <Stack.Screen name="Schedule" component={ScheduleScreen}  
    options={{title: "الجـدول الأسـبـوعـي الثـابـت", headerTitleStyle: { fontSize: 25, }}}/>
    <Stack.Screen name="Listing" component={ListingsScreen} 
    options={{headerShown: false}}/>
    <Stack.Screen name="ScheduleAdd" component={ScheduleAddScreen} 
    options={{title: "إضافة رحـلـة للجدول"}}/>
    <Stack.Screen name="AddressAdd" component={AddressAddScreen}
    options={{headerShown: false}} />
    <Stack.Screen name="MapView" component={MapViewScreen} 
    options={{headerShown: false}} /> 
    <Stack.Screen name="Address" component={AddressScreen} 
    options={{title: "العناوين المضـافـة", headerTitleStyle: { fontSize: 25}}}/>
  </Stack.Navigator>
);

export default ScheduleNavigator;
