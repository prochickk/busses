import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Modal,
  Button,
  FlatList,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Text from "./Text";
import defaultStyles from "../config/styles";
import PickerItem from "./PickerItem";
import Screen from "./Screen";
import AppButton from "./Button";
import IconButton from "./IconButton";
import colors from "../config/colors";

function IconPicker({
  icon,
  items,
  numberOfColumns = 1,
  onSelectItem,
  PickerItemComponent = PickerItem,
  placeholder = "Null",
  selectedItem,
}) {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <>
      <TouchableWithoutFeedback>
        <View style={styles.container}>
          <IconButton
            onPress={() => setModalVisible(true)}
            name={icon}
            size={50}
            iconColor={defaultStyles.colors.black}
            style={styles.icon}
          />
          {selectedItem ? (
            <Text style={styles.text}>{selectedItem.label}</Text>
          ) : (
            <Text style={styles.placeholder}>{placeholder}</Text>
          )}
        </View>

      </TouchableWithoutFeedback>
      <Modal visible={modalVisible} animationType="slide">
        <Screen>
          <View style={styles.closeBtn}>
            <AppButton title="Close" style={styles.closeBtn} onPress={() => setModalVisible(false)} />
          </View>
          <FlatList
            data={items}
            keyExtractor={(item) => item.value ? item.value.toString() : item.label}
            numColumns={numberOfColumns}
            renderItem={({ item }) => (
              <PickerItemComponent
                item={item}
                label={item.label}
                onPress={() => {
                  setModalVisible(false);
                  onSelectItem(item);
                }}
              />
            )}
          />
        </Screen>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: defaultStyles.colors.light,
    borderRadius: 25,
    height: 5,
 
    flexDirection: "row-reverse",
    width: "10%",
    marginTop: 25,
    paddingBottom: 25,
  },
  closeBtn: {
     width: "90%",
     alignItems: "center",
     justifyContent: "center",
     marginLeft: 20,
  },
  icon: {
    marginRight: 15,
    
  },
  placeholder: {
    color: defaultStyles.colors.medium,
    flex: 1,
  },
  text: {
    flex: 1,
  },
});

export default IconPicker;
