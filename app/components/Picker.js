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

function AppPicker({
  icon,
  items,
  numberOfColumns = 1,
  onSelectItem,
  PickerItemComponent = PickerItem,
  placeholder,
  selectedItem,
  width = "80%",
}) {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <>
      <TouchableWithoutFeedback onPress={() => setModalVisible(true)}>
        <View style={[styles.container, { width }]}>
          {icon && (
            <MaterialCommunityIcons
              name={icon}
              size={20}
              color={defaultStyles.colors.medium}
              style={styles.icon}
            />
          )}
          {selectedItem ? ( 
            selectedItem.label ?
              <Text style={styles.text}>{selectedItem.label}</Text> : ( selectedItem.name ? 
              <Text style={styles.text}>{selectedItem.name}</Text> : ( selectedItem.value ? 
              <Text style={styles.text}>{selectedItem.value}</Text> : ( selectedItem.section ? 
              <Text style={styles.text}>{selectedItem.section}</Text> : ( selectedItem.university ?
              <Text style={styles.text}>{selectedItem.university}</Text> :
              <Text style={styles.text}>{selectedItem.region}</Text> 
                ) 
              ) )
            )
          ) : (
            <Text style={styles.placeholder}>{placeholder}</Text>
          )}

          <MaterialCommunityIcons
            name="chevron-down"
            size={20}
            color={defaultStyles.colors.medium}
          />
        </View>
      </TouchableWithoutFeedback>
      <Modal visible={modalVisible} animationType="slide">
        <Screen >
          <View style={styles.closeBtn}>
            <AppButton title="Close" style={styles.closeBtn} onPress={() => setModalVisible(false)} />
          </View>
          <FlatList
            data={items}
            keyExtractor={(item) => item.value ? item.value.toString() : (item.id ? item.id.toString() : item.label)}
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
    height: 50,
    width: '100',
    padding: 10,
    marginVertical: 10,
    flexDirection: "row-reverse",
    justifyContent: 'center',
    alignItems: 'center',
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
    color: defaultStyles.colors.black,
  },
});

export default AppPicker;
