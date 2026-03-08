import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import DailyScreen from '../screens/DailyScreen';
import RandomScreen from '../screens/RandomScreen';
import CategoriesScreen from '../screens/CategoriesScreen';
import SettingsScreen from '../screens/SettingsScreen';
import PaywallScreen from '../screens/PaywallScreen';
import { COLORS } from '../utils/theme';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const TAB_ICONS = {
  Daily: { focused: 'sunny', unfocused: 'sunny-outline' },
  Random: { focused: 'sparkles', unfocused: 'sparkles-outline' },
  Categories: { focused: 'grid', unfocused: 'grid-outline' },
  Settings: { focused: 'settings', unfocused: 'settings-outline' },
};

function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          const icons = TAB_ICONS[route.name];
          const iconName = focused ? icons.focused : icons.unfocused;
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.textLight,
        tabBarStyle: {
          backgroundColor: COLORS.surface,
          borderTopColor: COLORS.background,
          paddingBottom: 8,
          paddingTop: 8,
          height: 65,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
        },
      })}
    >
      <Tab.Screen name="Daily" component={DailyScreen} />
      <Tab.Screen name="Random" component={RandomScreen} />
      <Tab.Screen name="Categories" component={CategoriesScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Main" component={TabNavigator} />
      <Stack.Screen
        name="Paywall"
        component={PaywallScreen}
        options={{ presentation: 'modal' }}
      />
    </Stack.Navigator>
  );
}
