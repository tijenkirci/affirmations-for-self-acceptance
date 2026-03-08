import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ActionButton from '../components/ActionButton';
import { useSubscription } from '../context/SubscriptionContext';
import { COLORS, FONTS } from '../utils/theme';

export default function SettingsScreen({ navigation }) {
  const { isPremium, unlockWithEmail } = useSubscription();
  const [email, setEmail] = useState('');

  const handleEmailUnlock = async () => {
    if (!email.trim()) {
      Alert.alert('Please enter your email');
      return;
    }

    const success = await unlockWithEmail(email);
    if (success) {
      Alert.alert('Welcome!', 'Full access has been unlocked for you.');
      setEmail('');
    } else {
      Alert.alert(
        'Not recognized',
        'This email does not have owner access. You can purchase lifetime access instead.'
      );
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Ionicons name="settings" size={42} color={COLORS.primary} />
        <Text style={styles.title}>Settings</Text>
      </View>

      {/* Subscription Status */}
      <View style={styles.card}>
        <Text style={styles.cardLabel}>Subscription</Text>
        <View style={styles.statusRow}>
          <Ionicons
            name={isPremium ? 'checkmark-circle' : 'lock-closed'}
            size={24}
            color={isPremium ? '#4BB89E' : COLORS.textLight}
          />
          <Text style={[styles.statusText, isPremium && styles.premiumText]}>
            {isPremium ? 'Premium — Full Access' : 'Free Tier'}
          </Text>
        </View>
        {!isPremium && (
          <View style={styles.upgradeButton}>
            <ActionButton
              title="Upgrade — 2,00 €"
              onPress={() => navigation.navigate('Paywall')}
            />
          </View>
        )}
      </View>

      {/* Owner Email Unlock */}
      {!isPremium && (
        <View style={styles.card}>
          <Text style={styles.cardLabel}>Owner Access</Text>
          <Text style={styles.description}>
            If you are the app creator, enter your registered email to unlock
            free access.
          </Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your email"
            placeholderTextColor={COLORS.textLight}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
          />
          <ActionButton
            title="Unlock"
            onPress={handleEmailUnlock}
            variant="secondary"
          />
        </View>
      )}

      {/* About */}
      <View style={styles.card}>
        <Text style={styles.cardLabel}>About</Text>
        <Text style={styles.description}>
          Affirmations for Self-Acceptance is built to empower women with daily
          positive messages. Every affirmation is crafted to uplift, encourage,
          and remind you of your incredible worth.
        </Text>
        <Text style={styles.version}>Version 1.0.0</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    paddingTop: 60,
    paddingBottom: 40,
  },
  header: {
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    ...FONTS.heading,
    fontSize: 28,
    color: COLORS.text,
    marginTop: 16,
  },
  card: {
    backgroundColor: COLORS.surface,
    borderRadius: 20,
    padding: 24,
    marginHorizontal: 20,
    marginBottom: 16,
    shadowColor: COLORS.cardShadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 20,
    elevation: 5,
  },
  cardLabel: {
    ...FONTS.label,
    color: COLORS.primary,
    marginBottom: 12,
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusText: {
    ...FONTS.body,
    color: COLORS.textLight,
    marginLeft: 10,
  },
  premiumText: {
    color: '#4BB89E',
    fontWeight: '700',
  },
  upgradeButton: {
    marginTop: 16,
  },
  description: {
    ...FONTS.body,
    color: COLORS.textLight,
    lineHeight: 22,
    marginBottom: 16,
  },
  input: {
    borderWidth: 1.5,
    borderColor: COLORS.primary + '40',
    borderRadius: 12,
    padding: 14,
    fontSize: 16,
    color: COLORS.text,
    marginBottom: 16,
    backgroundColor: COLORS.background,
  },
  version: {
    fontSize: 13,
    color: COLORS.textLight,
    marginTop: 4,
  },
});
