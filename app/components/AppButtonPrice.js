import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

import colors from "../config/colors";
import Icon from "./Icon";

function AppButtonPrice({ title, iconName, onPress, color = "primary", width = "100%", height= 60, iconColorr= 'red' }) {
  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor: colors[color] }, width={width}, height= {height}]}
      onPress={onPress}
    >
      {iconName &&<Icon name={iconName} backgroundColor={colors.white} iconColor={colors[iconColorr]} size= {60}/>}
      {title && <Text style={styles.text}>{title}</Text>}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.primary,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    width: "100%",
    marginVertical: 10,
  },
  text: {
    color: colors.white,
    fontSize: 18,
    textTransform: "uppercase",
    fontWeight: "bold",
  },
});

export default AppButtonPrice;
