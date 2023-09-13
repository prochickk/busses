import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";

import Icon from "./Icon";
import Text from "./Text";

function CategoryPickerItemGroupsLists({ item, onPress }) {
  return (

      <TouchableOpacity style={styles.container} onPress={onPress}>
        {item.icon && <Icon
          backgroundColor={item.backgroundColor}
          name={item.icon}
          size={40}
        />}
        <View style={{flexDirection: "row-reverse", marginHorizontal: 15,}}>
          { (item.university) && <Text style={styles.label}>{item.university}</Text>}
          { (item.name) && <Text style={styles.label}>{item.name}</Text> }
          { (item.section) && <Text style={styles.label}>{item.section}</Text> }
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

export default CategoryPickerItemGroupsLists;
