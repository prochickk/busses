import React, { useContext, useEffect } from 'react';
import { Image, Linking, StyleSheet, View} from 'react-native';
import AppButton from '../components/Button';
import Screen from '../components/Screen';
import AppText from '../components/Text';
import colors from '../config/colors';
import regionsApi from '../api/regions';
import useApi from '../hooks/useApi';
import AuthContext from '../auth/context';

function AdminContactScreen(props) {
    const getRegionsApi = useApi(regionsApi.getRegions)
    const { user } = useContext(AuthContext);

    useEffect(() => {
        getRegionsApi.request({ ...user });
      }, []);

    const msg = " مرحبا,\n انا اتواصل معك من حافل من مجموعة" + user.group + "\n" + "\n" +
    "فضلا, \n لدي مشكلة وأريد المساعدة" + "\n" +
    "الاسم: " + user.name +"\n"+
    "رقم الجوال: " + "0" + user.mobileNumber +"\n"+
    "رقم هوية حافل: " + user.userId

    let whatsApp = () => {
        let adminMobileNumber = getRegionsApi.data[0].adminNumber ? getRegionsApi.data[0].adminNumber : 581302920
        let phoneNumb = "966" + adminMobileNumber.toString()
        let mobile = Platform.OS == "ios" ? phoneNumb : "+" + phoneNumb;
        let output = "whatsapp://send?text=" + msg + "&phone=" + mobile;
        Linking.openURL(output)
    }

    return (
        <Screen style={styles.Container}>
            <View style={styles.ImageView}>
                <Image style={styles.Image} source= {require("../assets/waita.jpg")}/>
            </View>

            <View style={styles.TextTitleView}>
                <AppText  style={styles.TextTitle} > تواصل مع المشرف مباشرة </AppText>
                <AppText  style={styles.TextBody}>
                     سيتم نقلك للتواصل مع المشرف مباشرة عند وجود أي مشكلة عن طريق الواتس اب
                 </AppText>

            </View>
            <View style={{ alignItems: "center"}}>
                 <AppButton width={"50%"} height={50} title={"تواصل مع المشرف"} onPress={() => whatsApp()}/>
            </View>

        </Screen>
        );
}
const styles = StyleSheet.create({
    Container: {
        backgroundColor: colors.light,
        marginTop: -60
    },
    Image: {
        alignItems: 'center',
        width: 200,
        height: 200,
        justifyContent: "center",
        borderRadius: 50,
    },
    ImageView: {
        alignItems: "center",
        justifyContent: "center",
        marginTop: 100,
        
    },
    TextTitleView: { 
        alignItems: "center", 
        margin: 20,
        width: "80%",
        marginHorizontal: 30,

    },
    TextTitle: { 
        alignItems: "center", 
        fontSize: 23,
        fontWeight: "bold",
    },
    TextBody: { 
        alignItems: "center", 
        fontSize: 18,
        marginTop: 30,
        
    },
})

export default AdminContactScreen;