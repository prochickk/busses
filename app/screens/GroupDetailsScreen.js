import React from "react";
import {
  View,
  StyleSheet,
  Image,
  ScrollView,
} from "react-native";

import colors from "../config/colors";
import Text from "../components/Text";
import Screen from "../components/Screen";
import AppText from "../components/Text";

function GroupDetailsScreen({ route }) {
  const Group = route.params;
  

  return (
    <ScrollView>
        <Screen style={styles.screen}>
            <Image style={styles.image} source={require("../assets/logo-red.png")}/>

                <View style={styles.LogoContainer}>
                    <View style= {{justifyContent:'center', alignItems: 'center'}}>
                        <AppText style={styles.groupName}>
                            {Group.groupList}
                        </AppText>
                        <AppText  style={styles.GroupPrice}>
                        {" " + Group.monthlyPrice + ' شهري'}
                        </AppText>
                    </View>
                    <Image style={styles.logoImage} source={require("../assets/logo-red.png")}/>
                </View>
            
            <View style={styles.detailsContainer}>
                <Text style={styles.title}>الميزات:</Text>
                {Group.longFeatures.map((element, index) => (
                    <AppText style={styles.subtitel} key={index}>{element}</AppText>
                    ))}

            </View>
        </Screen>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
    screen: {
        padding: 20,
        backgroundColor: colors.light,
        alignContent: "center",
      },
  detailsContainer: {
    padding: 20,
    backgroundColor: colors.white, 
    borderRadius: 20,
    margin: 10, 
    padding:10,
    justifyContent: 'flex-end',

  },
  image: {
    width: '100%',
    height: 300,
    resizeMode: 'contain'
  },
  logoImage: {
    width: 70,
    height: 70,
    // resizeMode: 'contain'
  },
  subtitel: {
    color: colors.secondary,
    fontWeight: "bold",
    fontSize: 20,
    marginVertical: 5,
    justifyContent: 'flex-end',

  },
  title: {
    fontSize: 24,
    fontWeight: "500",
  },
  groupName: {
    fontSize: 20,
    fontWeight: "500",

  },
  GroupPrice: {
    fontSize: 16,
    fontWeight: "500",
  },
  
  LogoContainer: {
    flexDirection:"row",
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: 20,
  },
});

export default GroupDetailsScreen;
