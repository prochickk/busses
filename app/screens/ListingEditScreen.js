import React, { useState } from "react";
import { StyleSheet } from "react-native";
import * as Yup from "yup";

import {
  Form,
  FormField,
  FormPicker as Picker,
  SubmitButton,
} from "../components/forms";
import CategoryPickerItem from "../components/CategoryPickerItem";
import Screen from "../components/Screen";
import listingsApi from "../api/listings";
import useLocation from "../hooks/useLocation";
import UploadScreen from "./UploadScreen";
import colors from "../config/colors";


const validationSchema = Yup.object().shape({
  typeCate: Yup.object().required().nullable().label("نوع الرحلة"),
  timeCate: Yup.object().required().nullable().label("الوقــت"),
  dayCate: Yup.object().required().nullable().label("الــيـوم"),
  addressCate: Yup.object().required().nullable().label("العـنـوان"),
  description: Yup.string().label("مـلاحـظات (إختـياري)"),
});





const typeCates = [
  {
    backgroundColor: colors.medium,
    icon: "floor-lamp",
    label: "عودة مـن الجامعة",
    value: 1,
  },
  {
    backgroundColor: colors.medium,
    icon: "floor-lamp",
    label: "ذهـــاب للـجامـعـة",
    value: 2,
  },
]

const timeCates = [
  {
    backgroundColor: colors.medium,
    icon: "floor-lamp",
    label: "12:00-12:50",
    value: 12,
  },
  {
    backgroundColor: colors.medium,
    icon: "floor-lamp",
    label: "11:00-11:50",
    value: 11,
  },
  {
    backgroundColor: colors.medium,
    icon: "floor-lamp",
    label: "10:00-10:50",
    value: 10,
  },
  {
    backgroundColor: colors.medium,
    icon: "floor-lamp",
    label: "9:00-9:50",
    value: 0,
  },
  {
    backgroundColor: colors.medium,
    icon: "floor-lamp",
    label: "8:00-8:50",
    value: 8,
  },
  {
    backgroundColor: colors.medium,
    icon: "floor-lamp",
    label: "7:00-7:50",
    value: 7,
  },

  {
    backgroundColor: colors.medium,
    icon: "floor-lamp",
    label: "6:00-6:50",
    value: 6,
  }, 
]

const dayCates = [
  {
    backgroundColor: colors.medium,
    icon: "floor-lamp",
    label: "الأحد",
    value: 1,
  },
  {
    backgroundColor: colors.medium,
    icon: "floor-lamp",
    label: "الأثنين",
    value: 2,
  },
  {
    backgroundColor: colors.medium,
    icon: "floor-lamp",
    label: "الثلاثاء",
    value: 3,
  },
  {
    backgroundColor: colors.medium,
    icon: "floor-lamp",
    label: "الأربعاء",
    value: 4,
  },
  {
    backgroundColor: colors.medium,
    icon: "floor-lamp",
    label: "الخميس",
    value: 5,
  },
];

const addressCates = [
  {
    backgroundColor: colors.medium,
    icon: "floor-lamp",
    label: "المباركية - الـمحـدود",
    value: 1,
  },
  {
    backgroundColor: colors.medium,
    icon: "floor-lamp",
    label: "الشـهـابية - الـمزروعية",
    value: 2,
  },
]


function ListingEditScreen() {
  const [uploadVisible, setUploadVisible] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleSubmit = async (listing, { resetForm }) => {
    setProgress(0);
    setUploadVisible(true);
    const result = await listingsApi.addListing(
      { ...listing },
      (progress) => setProgress(progress)
    );

    if (!result.ok) {
      setUploadVisible(false);
      return alert("Could not save the listing");
    }

    resetForm();
  };

  return (
    <Screen style={styles.container}>
      <UploadScreen
        onDone={() => setUploadVisible(false)}
        progress={progress}
        visible={uploadVisible}
      />
      <Form
        initialValues={{
          title: "",
          price: "",
          description: "",
          category: null,
        }}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        <FormField maxLength={255} name="title" placeholder="Title" />
        <FormField
          keyboardType="numeric"
          maxLength={8}
          name="price"
          placeholder="Price"
          width={120}
        />
        <Picker
          items={categories}
          name="category"
          numberOfColumns={3}
          PickerItemComponent={CategoryPickerItem}
          placeholder="Category"
          width="50%"
        />
        <FormField
          maxLength={255}
          multiline
          name="description"
          numberOfLines={3}
          placeholder="Description"
        />
        <SubmitButton title="Post" />
      </Form>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
});
export default ListingEditScreen;
