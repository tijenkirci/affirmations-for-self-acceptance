import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ActionButton from '../components/ActionButton';
import { useSubscription } from '../context/SubscriptionContext';
import { COLORS, FONTS } from '../utils/theme';

export default function PaywallScreen({ navigation }) {
  const { purchaseLifetime, restorePurchase } = useSubscription();

  const handlePurchase = async () => {
    const success = await purchaseLifetime();
    if (success) {
      navigation.goBack();
    }
  };

  const handleRestore = async () => {
    const success = await restorePurchase();
    if (success) {
      navigation.goBack();
    }
  };

  const features = [
    { icon: 'infinite', text: 'Unlimited random affirmations' },
    { icon: 'grid', text: 'All 6 categories unlocked' },
    { icon: 'sunny', text: 'Daily affirmations forever' },
    { icon: 'heart', text: 'Support a woman-led project' },
  ];

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.closeRow}>
        <Ionicons
          name="close"
          size={28}
          color={COLORS.textLight}
          onPress={() => navigation.goBack()}
        />
      </View>

      <View style={styles.header}>
        <View style={styles.iconCircle}>
          <Ionicons name="sparkles" size={40} color={COLORS.accent} />
        </View>
        <Text style={styles.title}>Unlock Full Access</Text>
        <Text style={styles.subtitle}>
          One small investment in yourself — forever.
        </Text>
      </View>

      <View style={styles.featureList}>
        {features.map((feature, index) => (
          <View key={index} style={styles.featureRow}>
            <Ionicons name={feature.icon} size={22} color={COLORS.primary} />
            <Text style={styles.featureText}>{feature.text}</Text>
          </View>
        ))}
      </View>

      <View style={styles.priceBox}>
        <Text style={styles.price}>2,00 €</Text>
        <Text style={styles.priceLabel}>One-time payment — yours forever</Text>
      </View>

      <View style={styles.buttons}>
        <ActionButton title="Unlock Now — 2,00 €" onPress={handlePurchase} />
        <View style={styles.spacer} />
        <ActionButton
          title="Restore Purchase"
          onPress={handleRestore}
          variant="secondary"
        />
      </View>

      <Text style={styles.disclaimer}>
        Payment is processed securely through the App Store / Google Play.
        This is a one-time purchase — no subscriptions, no recurring charges.
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    paddingTop: 50,
    paddingBottom: 40,
    paddingHorizontal: 24,
  },
  closeRow: {
    alignItems: 'flex-right',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 10,
  },
  header: {
    alignItems: 'center',
    marginBottom: 32,
  },
  iconCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: COLORS.accent + '20',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  title: {
    ...FONTS.heading,
    fontSize: 28,
    color: COLORS.text,
    textAlign: 'center',
  },
  subtitle: {
    ...FONTS.body,
    color: COLORS.textLight,
    textAlign: 'center',
    marginTop: 8,
  },
  featureList: {
    backgroundColor: COLORS.surface,
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  featureText: {
    ...FONTS.body,
    color: COLORS.text,
    marginLeft: 14,
  },
  priceBox: {
    alignItems: 'center',
    marginBottom: 28,
  },
  price: {
    fontSize: 42,
    fontWeight: '800',
    color: COLORS.primary,
  },
  priceLabel: {
    ...FONTS.body,
    color: COLORS.textLight,
    marginTop: 4,
  },
  buttons: {
    alignItems: 'center',
  },
  spacer: {
    height: 12,
  },
  disclaimer: {
    fontSize: 12,
    color: COLORS.textLight,
    textAlign: 'center',
    marginTop: 24,
    lineHeight: 18,
  },
});
