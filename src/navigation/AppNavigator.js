import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import DailyScreen from '../screens/DailyScreen';
import RandomScreen from '../screens/RandomScreen';
import CategoriesScreen from '../screens/CategoriesScreen';
import { COLORS } from '../utils/theme';

const Tab = createBottomTabNavigator();

const TAB_ICONS = {
  Daily: { focused: 'sunny', unfocused: 'sunny-outline' },
  Random: { focused: 'sparkles', unfocused: 'sparkles-outline' },
  Categories: { focused: 'grid', unfocused: 'grid-outline' },
};

export default function AppNavigator() {
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
    </Tab.Navigator>
  );
}
