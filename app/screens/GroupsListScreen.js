import React, { useContext, useEffect, useState } from "react";
import { Alert, FlatList, StyleSheet, View} from "react-native";

import ActivityIndicator from "../components/ActivityIndicator";
import Button from "../components/Button";
import colors from "../config/colors";
import Screen from "../components/Screen";
import AppText from "../components/Text";
import useApi from "../hooks/useApi";

import CategoryPickerItem from "../components/CategoryPickerItem";
import groupsPricesApi from "../api/groupsPrices";
import CardPricingList from "../components/CardPricingList";
import routes from "../navigation/routes";
import RegisterationRoadMap from "../components/RegisterationRoadMap";
import useAuth from "../auth/useAuth";



function GroupsListScreen({ navigation, route}) {

  const getGroupsPricesApi = useApi(groupsPricesApi.getPrices);
  const [currentStep, setCurrentStep] = useState(1);
  const { user } = useAuth();

  const handleStepPress = (stepIndex) => {
    setCurrentStep(stepIndex);

    if (stepIndex == 0) {
      setCurrentStep(0);
      navigation.navigate(routes.GROUPFILTERING)
    } else {
      setCurrentStep(1);
    }
  };

  const alertText = "تأكيد الاشتراك";
  const bodyText = "هل أنت متأكدة من الانضمام لشركة ";
  
  useEffect(() => {
    getGroupsPricesApi.request(route.params)
  }, []);

  return (
    <>
      <ActivityIndicator visible={getGroupsPricesApi.loading} />
        <View>
        <RegisterationRoadMap currentStep={currentStep} onPressStep={handleStepPress} regPostition={user} />
        </View>
        <Screen style={styles.screen}>

          <AppText style={styles.title}>شركات التوصيل المتوفرة</AppText>

        {getGroupsPricesApi.error && (
          <>
            <AppText>Couldn't retrieve the listings.</AppText>
            <Button title="Retry" onPress={() => getGroupsPricesApi.request(route.params)} />
          </>
        )}
        
        <FlatList
          data={getGroupsPricesApi.data}
          keyExtractor={(listing) => listing.id.toString()}
          renderItem={({ item }) => (
            <CardPricingList
              dayCate={item.groupList}
              priceValue= {item.monthlyPrice}
              features = {item.features}
              addBtn={() => {Alert.alert(alertText, bodyText + item.groupList, [
                {text: "نعم", onPress: () => item.groupList === 'غير متوفر'? true : (user ? console.log('build your payment screen') : navigation.navigate(routes.REGISTER, item))},
                  {text: "لا"}])
                    }}
              infoBtn={() => { item.groupList === 'غير متوفر'? true : navigation.navigate(routes.GROUPDETAILS, item) }}
                />
                )}
          />
      </Screen>
    </>
  );
}

const styles = StyleSheet.create({
  screen: {
    padding: 20,
    backgroundColor: colors.light,
    alignContent: "center",
  },
  title: {
    backgroundColor: colors.light,
    borderRadius: 10,
    alignItems: "center",
    alignContent: "center",
    fontSize: 30,
    marginBottom: 10,
  },
  Days: {
    marginHorizontal: 30,
    textAlign: 'right',
    backgroundColor: colors.light,
    marginTop: 10,
  },
  filterButtons: {
    flexDirection: "row-reverse",
    width: "100%",
    justifyContent: 'center',
    alignItems:'center',
    marginHorizontal: 80
  },
});

export default GroupsListScreen;
