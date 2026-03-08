import React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './src/navigation/AppNavigator';
import { SubscriptionProvider } from './src/context/SubscriptionContext';
import { COLORS } from './src/utils/theme';

export default function App() {
  return (
    <SubscriptionProvider>
      <NavigationContainer>
        <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />
        <AppNavigator />
      </NavigationContainer>
    </SubscriptionProvider>
  );
}
