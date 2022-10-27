import React from "react";
import { View, StyleSheet, TouchableWithoutFeedback, Image} from "react-native";

import Text from "./Text";
import colors from "../config/colors";
import { ListItemDeleteAction } from "./lists";
import AppButton from "./Button";



function CardSchedule({dayCate, timeCate, onPress=null , addressCate, deleteBtn, addBtn, typeCate}) {

    

  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.card}>

        <View style={styles.detailsContainer}>
          <Text style={styles.title} numberOfLines={1}>
            {dayCate}
          </Text>
          <View style={{flex: 1}}/>

          <View style={{backgroundColor: colors.light, borderRadius: 10, padding: 5}}>
            <Text style={styles.timeCate}>{timeCate}</Text>
          </View>
        </View>

          <View style={styles.CardLine2}>

            <Text style={styles.AddressCate} numberOfLines={2}>
              {addressCate}
            </Text>
            <View style={{flex: 1}}/>
                
            <View style={{backgroundColor: colors.light, borderRadius: 10, padding: 5}}>
              <Text style={styles.subTitle}>
                {typeCate}
              </Text>
              
            </View>
             
          </View>
          <View style={styles.BtnsView}>
            {addBtn && <AppButton iconName={"plus-circle"} width={80} height={50} onPress={addBtn}/>}
            <View style={{flex:1}}/>
            <AppButton iconName={"delete"} width={80} height={50} onPress={deleteBtn}/>
          </View>
          <View>

            
            
            </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
    detailsContainer: {
    padding: 5,
    flexDirection: "row-reverse",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    alignContent: "center",
    marginHorizontal: 10,
    },
    BtnsView: { 
    flexDirection: "row-reverse",
    width: "100%",
    borderRadius: 20,
    padding: 5,
    paddingLeft: 15,
    paddingRight: 15,
  },
  AddBtn: {
    borderRadius: 20,
    width: "50%",
    backgroundColor: colors.black,
  },

  card: {
    borderRadius: 15,
    backgroundColor: colors.white,
    marginBottom: 5,
    overflow: "hidden",
    margin: 5,
  },
  CardLine2: {
    flexDirection: "row",
    marginHorizontal: 20,

  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 20,
  },
  subTitle: {
    color: colors.secondary,
    fontWeight: "bold",
    fontSize: 15,
  },
  timeCate: {
    color: colors.secondary,
    fontWeight: "bold",

  },
  AddressCate: {
    fontWeight: "bold",
    marginTop: 5,
  },
  title: {
    margin: 10,
    fontSize: 30,

  },
});

export default CardSchedule;
