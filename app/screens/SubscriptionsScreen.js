import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  FlatList,
} from "react-native";


import colors from "../config/colors";
import ListItem from "../components/lists/ListItem";
import Screen from "../components/Screen";
import AppText from "../components/Text";
import routes from "../navigation/routes";
import AppButton from "../components/Button";
import ActivityIndicator from "../components/ActivityIndicator";
import subscriptionsApi from "../api/subscriptions";
import { ScrollView } from "react-native";
import CardSubsList from "../components/CardSubsList";

function SubscriptionsScreen({ navigation, route }) {
  const user = route.params;
  const [subscriptionsData, setSubscriptionsData] = useState([]);

  
  const getSubscriptionsApi = useApi(subscriptionsApi.getSubs);

//   useEffect(() => {
//     getSubscriptionsApi.request(user)
//   }, []);

useEffect(() => {
    const fetchData = async () => {
      const result = await getSubscriptionsApi.request(user);
      if (result.ok) {
        setSubscriptionsData(result.data);
      }
    };

    fetchData();
  }, []);

    const currentDate = new Date();
    console.log('currentDate', currentDate)

  return (
    <Screen style={styles.Screen}>  
        <ActivityIndicator visible={getSubscriptionsApi.loading} />

        <View style={styles.detailsContainer}>
        <ScrollView>
            <ListItem
            iconName={"account"}
            title= {"رقم هوية حوافل"}
            subTitle= {user.userId}
            />
            <ListItem
            iconName={"account"}
            title="حالة الاشتراك"
            subTitle={subscriptionsData.length > 0 ? (new Date(subscriptionsData[0].expiredAt) > currentDate ? 'نشط' : "منتهي") : ''}
          />
            <ListItem
            iconName={"account"}
            title={"الشركة"}
            subTitle= {subscriptionsData.length > 0 ? subscriptionsData[0].group : ''}
            />
            <ListItem
            iconName={"account"}
            title="نوع الاشتراك"
            subTitle= {subscriptionsData.length > 0 ? (subscriptionsData[0].subType == 'Semester'? 'فصلي' : "شهري") : ''}
            />
            <ListItem
            iconName={'account'}
            title="انتهاء الاشتراك"
            subTitle= {subscriptionsData.length > 0 ? subscriptionsData[0].expiredAt.slice(0, 10) : ''}
            />
        </ScrollView>
        <View style={ styles.btn }>
            <AppButton
                height= {40}
                title="تجديد الاشتراك"
                onPress={() => navigation.navigate(routes.GROUPFILTERING, user)}
                />
        </View>
        </View>
        <View style={styles.detailsContainer2}>

        <AppText style={styles.title}>الاشتراكات السابقة</AppText>

        {getSubscriptionsApi.error && (
        <>
            <AppText>Couldn't retrieve the listings.</AppText>
            <AppButton title="Retry" onPress={() => getSubscriptionsApi.request(route.params)} />
        </>
        )}
        <FlatList
        data={getSubscriptionsApi.data}
        keyExtractor={(item) => item.subId.toString()}
        renderItem={({ item }) => (
            <CardSubsList
            groupCo={item.group}
            priceValue= {item.price}
            createDate = {item.createdAt.slice(0, 10)}
            expireDate = {item.expiredAt.slice(0, 10)}
            // infoBtn={() => { navigation.navigate(routes.GROUPDETAILS, item) }}
                />
                )} 
        />
        </View>
    </Screen> 
  );
}

const styles = StyleSheet.create({
  Screen: {
    backgroundColor: colors.light,
    marginVertical: -30,
    marginTop: Platform.OS === "android" ? -15 : 5,
  },
  detailsContainer: {
    padding: 20,
    flex:1,
  },
  detailsContainer2: {
    padding: 20,
    marginTop: -40,
    flex:1,
    marginBottom:40
  },
  price: {
    color: colors.secondary,
    fontWeight: "bold",
    fontSize: 20,
    marginVertical: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "500",
  },
  btn: {
    backgroundColor: colors.primary,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center', 
    marginHorizontal:90, 
    margin: 5
  }
});

export default SubscriptionsScreen;
