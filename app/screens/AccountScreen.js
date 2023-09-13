import React from "react";
import { StyleSheet, View, FlatList } from "react-native";

import { ListItem, ListItemSeparator } from "../components/lists";
import colors from "../config/colors";
import Icon from "../components/Icon";
import routes from "../navigation/routes";
import Screen from "../components/Screen";
import useAuth from "../auth/useAuth";
import { TouchableOpacity } from "react-native";
import AppText from "../components/Text";

const menuItems = [
  {
    title: "الاشتراك",
    icon: {
      name: "format-list-bulleted",
      backgroundColor: colors.secondary,
    },
    targetScreen: routes.SUBSCRIPTIONS,
  },
  {
    title: "العناوين",
    icon: {
      name: "format-list-bulleted",
      backgroundColor: colors.primary,
    },
    targetScreen: routes.ADDRESS,
  },
  {
    title: "تواصل مع المشرف",
    icon: {
      name: "whatsapp",
      backgroundColor: colors.secondary,
    },
    targetScreen: routes.ADMIN_CONTACT,
  },
];

function AccountScreen({ navigation }) {
  const { user, logOut } = useAuth();

  return (
    <Screen style={styles.screen}>
      <View style={styles.container}>
        <ListItem
          onPress={() => navigation.navigate(routes.USER_DETAILS, user)}
          title={user.name}
          subTitle={user.email}
          image={require("../assets/logo-red.png") }
        />
      </View>
      <View style={styles.container}>
        <FlatList
          data={menuItems}
          keyExtractor={(menuItem) => menuItem.title}
          ItemSeparatorComponent={ListItemSeparator}
          renderItem={({ item }) => (
            <ListItem
              title={item.title}
              IconComponent={
                <Icon
                  name={item.icon.name}
                  backgroundColor={item.icon.backgroundColor}
                />
              }
              onPress={() => navigation.navigate(item.targetScreen, user)}
            />
          )}
        />
      </View>
      <ListItem
        title="تسجيل الخروج"
        IconComponent={<Icon name="logout" backgroundColor="#ffe66d" />}
        onPress={() => logOut()}
      />

    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: colors.light,
  },
  container: {
    marginVertical: 20,

  },
});

export default AccountScreen;
