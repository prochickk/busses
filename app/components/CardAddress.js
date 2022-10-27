
import React from "react";
import { View, StyleSheet, TouchableWithoutFeedback} from "react-native";

import Text from "./Text";
import colors from "../config/colors";
import AppButton from "./Button";

function CardAddress({ title, subTitle, onPress, deleteBtn }) {


  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.card}>

        <View style={styles.detailsContainer}>
          <Text style={styles.title} numberOfLines={1}>
            {title}
          </Text>
        </View>

          <View style={styles.CardLine2}>
            <View style={styles.BtnsView}>
              <Text style={styles.subTitle}>{subTitle}</Text>
              < View style={{flex:1}}/>
              <AppButton iconName={"delete"} width={80} height={50} onPress={deleteBtn}/>
          </View>

            <View style={{flex: 1}}/>
            {/* <View style={{backgroundColor: colors.light, borderRadius: 10, padding: 5}}>
              
            </View> */}
  
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
  BtnsView: { 
    flexDirection: "row-reverse",
    width: "100%",
    borderRadius: 20,
    padding: 5,
    paddingLeft: 15,
    paddingRight: 15,
    alignItems: 'center',
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
    marginBottom: 5,
  },
  detailsContainer: {
    padding: 10,
    flexDirection: "row-reverse",
    alignItems: "center",
    justifyContent: "center",
    flex: 1, 
  },
  subTitle: {
    color: colors.secondary,
    fontWeight: "bold",
  },
  title: {
    marginBottom: 5,
    fontSize: 20,
  },
});

export default CardAddress;

