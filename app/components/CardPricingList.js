import React from "react";
import { View, StyleSheet, TouchableWithoutFeedback, Image} from "react-native";

import Text from "./Text";
import colors from "../config/colors";
import { ListItemDeleteAction } from "./lists";
import AppButton from "./Button";
import AppButtonPrice from "./AppButtonPrice";



function CardPricingList({dayCate, onPress=null , priceValue, infoBtn, addBtn, features}) {

    

  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.card}>

        <View style={styles.detailsContainer}>
          <Text style={styles.title} numberOfLines={1}>
            {dayCate}
          </Text>

          <View style={{ flex:1}}/>

          <Text style={styles.title} numberOfLines={2}>
                {priceValue}/شهر
          </Text>
        </View>

        <View style={styles.CardLine2}>
          <View style={{backgroundColor: colors.light, borderRadius: 10, margin: 2}}>
            <Text style={styles.subTitle} numberOfLines={1}>
                {features[0]}
            </Text>
          </View>

          <View style={{ flex:1}}/>

          <View style={{backgroundColor: colors.light, borderRadius: 10, margin: 2}}>
            <Text style={styles.subTitle} numberOfLines={1}>
                {features[1]}
            </Text>
          </View>

        </View>
        
        { (features[2]) && <View style={styles.CardLine2}>
            <View style={{backgroundColor: colors.light, borderRadius: 10, margin: 2}}>
                <Text style={styles.subTitle} numberOfLines={1}>
                    {features[2]}
                </Text>
            </View>


            <View style={{ flex:1}}/>

            <View style={{backgroundColor: colors.light, borderRadius: 10, margin: 2}}>
                <Text style={styles.subTitle} numberOfLines={1}>
                    {features[3]}
                </Text>
            </View>

        </View> }

          <View style={styles.BtnsView}>
            {addBtn && <AppButtonPrice iconName={"plus-circle"} width={100} height={50} onPress={addBtn} color={'white'} iconColorr= {'primary'} />}
            <View style={{flex:1}}/>
            {infoBtn && <AppButtonPrice iconName={"information"} width={80} height={50} onPress={infoBtn} color={'white'} iconColorr={'medium'}/>}
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
    marginHorizontal: 5,
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
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center' ,
    margin: 5,
  },
  CardLine2: {
    flexDirection: "row",
    marginHorizontal: 20,
  },
  subTitle: {
    color: '#FB9B06',
    fontWeight: "bold",
    fontSize: 15,
    margin:5
  },
  priceValue: {
    fontWeight: "bold",
    marginTop: 5,
  },
  title: {
    margin: 10,
    fontSize: 30,
  },
});

export default CardPricingList;
