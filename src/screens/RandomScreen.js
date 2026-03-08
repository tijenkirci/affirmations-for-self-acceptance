import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import AffirmationCard from '../components/AffirmationCard';
import ActionButton from '../components/ActionButton';
import { useSubscription } from '../context/SubscriptionContext';
import { getRandomAffirmation } from '../utils/helpers';
import { COLORS, FONTS } from '../utils/theme';

export default function RandomScreen() {
  const [affirmation, setAffirmation] = useState(null);
  const navigation = useNavigation();
  const {
    isPremium,
    canUseRandom,
    freeRandomsRemaining,
    freeRandomLimit,
    incrementFreeRandoms,
  } = useSubscription();

  const handleInspire = useCallback(async () => {
    if (!canUseRandom) {
      navigation.navigate('Paywall');
      return;
    }
    setAffirmation((prev) => getRandomAffirmation(prev));
    if (!isPremium) {
      await incrementFreeRandoms();
    }
  }, [canUseRandom, isPremium, incrementFreeRandoms, navigation]);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Ionicons name="sparkles" size={48} color={COLORS.primary} />
        <Text style={styles.title}>Your Affirmation</Text>
        <Text style={styles.subtitle}>Tap the button to receive an uplifting message</Text>
      </View>

      {affirmation ? (
        <AffirmationCard
          label="Just for You"
          affirmation={affirmation}
          accentColor={COLORS.primary}
        />
      ) : (
        <View style={styles.placeholder}>
          <Ionicons name="heart-outline" size={64} color={COLORS.primary + '40'} />
          <Text style={styles.placeholderText}>
            Your affirmation is waiting...
          </Text>
        </View>
      )}

      <View style={styles.buttonContainer}>
        <ActionButton title="Inspire Me" onPress={handleInspire} />
      </View>

      {!isPremium && (
        <Text style={styles.limitText}>
          {canUseRandom
            ? `${freeRandomsRemaining} of ${freeRandomLimit} free inspirations remaining today`
            : "You've used today's free inspirations"}
        </Text>
      )}
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
    marginBottom: 30,
  },
  title: {
    ...FONTS.heading,
    fontSize: 28,
    color: COLORS.text,
    marginTop: 16,
  },
  subtitle: {
    ...FONTS.body,
    color: COLORS.textLight,
    marginTop: 6,
    textAlign: 'center',
    paddingHorizontal: 40,
  },
  placeholder: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  placeholderText: {
    ...FONTS.body,
    color: COLORS.textLight,
    marginTop: 16,
    fontStyle: 'italic',
  },
  buttonContainer: {
    marginTop: 24,
    alignItems: 'center',
  },
  limitText: {
    textAlign: 'center',
    color: COLORS.textLight,
    fontSize: 13,
    marginTop: 16,
    fontStyle: 'italic',
  },
});
