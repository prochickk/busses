import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import AppText from './Text';
import colors from '../config/colors';

const ProgressSteps = ({ currentStep, onPressStep, regPostition }) => {

  const steps = regPostition ? ['المواقع', 'الشركة', 'الدفع'] : ['المواقع', 'الشركة', 'التسجيل', 'الدفع'];

  return (
    <View style={styles.container}>
      {steps.map((step, index) => (
        <View key={index} style={styles.stepContainer}>
          <TouchableOpacity
            onPress={() => onPressStep(index)}
            style={[
              styles.stepButton,
              index === currentStep && styles.currentStepButton,
            ]}
          >
            <AppText
              style={[
                styles.stepText,
                index === currentStep && styles.currentStepText,
              ]}
            >
              {step}
            </AppText>
          </TouchableOpacity>
          {index < steps.length - 1 && <View style={styles.road} />}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    marginTop: 20,
  },
  stepContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepButton: {
    backgroundColor: '#E0E0E0',
    paddingVertical: 10,
    borderRadius: 20,
    width: 75, // Fixed button width
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:5, 
  },
  currentStepButton: {
    backgroundColor: colors.primary
  },
  stepText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 10,
  },
  currentStepText: {
    color: 'white', // White text for the current step
  },
  road: {
    height: 4, // Line height
    width: 20, // Line width
    backgroundColor: colors.medium
  },
});

export default ProgressSteps;
