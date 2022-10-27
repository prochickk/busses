import React from "react";
import { TouchableOpacity, View, StyleSheet} from "react-native";
import Icon from "./Icon";
import colors from "../config/colors";

function IconButton({
  onPress,
  name,
  size = 50,
  iconColor= "red",
}) 
{
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
       <Icon name={name} backgroundColor={colors.white} iconColor={iconColor} size= {size}/>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
    button: {
        borderRadius: 25,
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
      },
})

export default IconButton;
