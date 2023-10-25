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

import subscriptionsApi from "../api/subscriptions";
import paymentApi from "../api/payment";

import { StripeProvider, useStripe, PlatformPayButton, PlatformPay, usePlatformPay } from "@stripe/stripe-react-native";


function GroupsListScreen({ navigation, route}) {

  const STRIPE_KEY = 'pk_test_51NrbWrFH3G8J5UHm77SyP8mN89LwSLev8QIWc7HVx8PPLVzdmUzmYb5sZpfeprcYcLOLEtUKheliYvXb1bbGVNUr00Yi0h9ZGv'

  const getGroupsPricesApi = useApi(groupsPricesApi.getPrices);
  const [currentStep, setCurrentStep] = useState(1);
  const { user } = useAuth();

  const {initPaymentSheet, presentPaymentSheet} = useStripe();

  const onCheckout = async (item) => {
    
      try {
    // 1. Create a payment intent
    const intent = await paymentApi.paymentIntent(item, route, user);
    if (intent.error) {
      Alert.alert('حدث خطأ');
      return;
    }
      // 2. Initialize the Payment sheet
      const initResponse = await initPaymentSheet({
        merchantDisplayName: 'hwafel',
        paymentIntentClientSecret: intent.data.paymentIntent,
        defaultBillingDetails: {
          address: {
            country: 'SA',
          },
        },
        // applePay: {
        //   merchantCountryCode: 'SA',
        // },
        // googlePay: {
        //   merchantCountryCode: 'SA',
        //   testEnv: true, 
        // }
      });
  
      // 3. Present the Payment Sheet from Stripe
      const { error: paymentError } = await presentPaymentSheet();

      if (paymentError) {
        Alert.alert(`Error code: ${paymentError.code}`, paymentError.message);
        return;

      } else {
        // 4. If payment succeeded, create the order
        await subscriptionsApi.addSub(item, route, user);
        navigation.navigate(routes.SUBSCRIPTIONS, user);
      }

    } catch (error) {
      console.log(error);
      Alert.alert('حدث خطأ');
    }
  };

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

  const handleAddCo = (item) => {
    
    item.groupList === 'غير متوفر'? true : 
    (user ? onCheckout(item) :
     navigation.navigate(routes.REGISTER, item))

  }

  return (
    <>
      <ActivityIndicator visible={getGroupsPricesApi.loading} />
        <View>
          <RegisterationRoadMap currentStep={currentStep} onPressStep={handleStepPress} regPostition={user} />
        </View>

        <StripeProvider 
          publishableKey={STRIPE_KEY} 
          merchantIdentifier="merchant.com.engahmed.hafel" 
          >
          <Screen style={styles.screen}>
            <AppText style={styles.title}>شركات التوصيل المتوفرة</AppText>

          {getGroupsPricesApi.error && ( 
            <>
              <AppText>لم يتم تحميل الخيارات</AppText>
              <Button title="إعادة المحاولة" onPress={() => getGroupsPricesApi.request(route.params)} />
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
                {text: "نعم", onPress: () => handleAddCo(item)},
                {text: "لا"}])
              }}
              infoBtn={() => { item.groupList === 'غير متوفر'? true : navigation.navigate(routes.GROUPDETAILS, item) }}
              />
              )}
              />
        </Screen>
      </StripeProvider>
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
