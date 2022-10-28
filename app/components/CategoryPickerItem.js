import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";

import Icon from "./Icon";
import Text from "./Text";

function CategoryPickerItem({ item, onPress }) {
  return (

      <TouchableOpacity style={styles.container} onPress={onPress}>
        {item.icon && <Icon
          backgroundColor={item.backgroundColor}
          name={item.icon}
          size={40}
        />}
        <View style={{flexDirection: "row-reverse", marginHorizontal: 15,}}>
          { (item.label) && <Text style={styles.label}>{item.label}</Text>}
          { (item.name) &&<Text style={styles.label}>{item.name}</Text> }
          { (item.value) &&<Text style={styles.label}>{item.value}</Text> }
          { (item.groupList) &&<Text style={styles.label}>{item.groupList}</Text> }
          {(item.region) && <View style={{flex: 1}}/>}
          {(item.region) && <Text style={styles.label}>( {item.region} )</Text>}
        </View>

      </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {

    paddingVertical: 10,
    alignItems: "center",
    width: "100%",
    flexDirection: "row-reverse",
    margin:5,
    flex: 1,
    padding: 25,
  },
  label: {
    fontSize: 25,
    marginRight: 10,
    marginBottom: 1,
    textAlign: "center",
  },
});

export default CategoryPickerItem;
