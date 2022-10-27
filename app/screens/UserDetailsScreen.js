import React from "react";
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  ScrollView,
  Image,
} from "react-native";


import colors from "../config/colors";
import ListItem from "../components/lists/ListItem";
import Screen from "../components/Screen";

function UserDetailsScreen({ route }) {
  const user = route.params;

  return (
    <Screen style={styles.Screen}>      
      <ScrollView>
        <KeyboardAvoidingView
          behavior="position"
          keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 100}
        >
          
          <View style={styles.detailsContainer}>
            <ListItem
              iconName={"account"}
              title= {"الاسـم"}
              subTitle= {user.name}
            />
            <ListItem
              iconName={"account"}
              title={"البريد الإلكتروني"}
              subTitle= {user.email}
            />
            <ListItem
              iconName={"account"}
              title="رقـم الهـاتـف"
              subTitle= {user.mobileNumber}
            />
            <ListItem
              iconName={"account"}
              title="شـركة التـوصيل"
              subTitle= {user.group}
            />
            <View style={{alignItems: 'center'}}>
              <Image
              style={styles.image}
              tint="light"
              source={require("../assets/logo-red.png")}
              />
            </View>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  Screen: {
    backgroundColor: colors.light,
    marginVertical: -30,
    marginTop: Platform.OS === "android" ? -25 : 5,
  },
  detailsContainer: {
    padding: 20,
    marginBottom: 70,
    marginRight: 10,
    
  },
  image: {
    width: 150,
    height: 150,
    margin:20,
  },
  price: {
    color: colors.secondary,
    fontWeight: "bold",
    fontSize: 20,
    marginVertical: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "500",
  },
});

export default UserDetailsScreen;
