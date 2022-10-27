import React from "react";
import { View, StyleSheet, TouchableWithoutFeedback, Button, Image} from "react-native";


import Text from "./Text";
import colors from "../config/colors";

function Card({ title, subTitle, imageUrl = require('../assets/back.jpg'), onPress}) {


  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.card}>

        <View style={styles.detailsContainer}>

          <Text style={styles.title} numberOfLines={1}>
            {title}
          </Text>
          <View style={{flex: 1}}/>
          <Image
            style={styles.image}
            tint="light"
            source={imageUrl}
          />

        </View>

          <View style={styles.CardLine2}>

            <Text style={styles.subTitle}>
              Address
            </Text>
            <View style={{flex: 1}}/>
            <View style={{backgroundColor: colors.light, borderRadius: 10, padding: 5}}>
              <Text style={styles.subTitle} >
                {subTitle}
              </Text>
              
            </View>
  
          </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  AddBtn: {
    borderRadius: 20,
    width: 80,
    height: 10,
    backgroundColor: colors.black,

  },

  card: {
    borderRadius: 15,
    backgroundColor: colors.white,
    marginBottom: 20,
    overflow: "hidden",
    margin: 10,
  },
  CardLine2: {
    flexDirection: "row",
    margin: 10,
    marginBottom: 10,
  },
  detailsContainer: {
    padding: 20,
    flexDirection: "row-reverse",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 20,
  },
  subTitle: {
    color: colors.secondary,
    fontWeight: "bold",
  },
  title: {
    marginBottom: 30,
    fontSize: 20,
  },
});

export default Card;
