import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import AffirmationCard from '../components/AffirmationCard';
import ActionButton from '../components/ActionButton';
import CategoryButton from '../components/CategoryButton';
import { useSubscription } from '../context/SubscriptionContext';
import {
  AFFIRMATIONS,
  CATEGORY_LABELS,
  CATEGORY_ICONS,
} from '../data/affirmations';
import { getRandomFromCategory } from '../utils/helpers';
import { COLORS, FONTS } from '../utils/theme';

// Free users can access the first 2 categories
const FREE_CATEGORIES = ['confidence', 'self-love'];

export default function CategoriesScreen() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [affirmation, setAffirmation] = useState(null);
  const navigation = useNavigation();
  const { isPremium } = useSubscription();

  const categoryKeys = Object.keys(AFFIRMATIONS);

  const handleCategoryPress = useCallback(
    (key) => {
      if (!isPremium && !FREE_CATEGORIES.includes(key)) {
        navigation.navigate('Paywall');
        return;
      }
      setSelectedCategory(key);
      setAffirmation(getRandomFromCategory(AFFIRMATIONS[key], null));
    },
    [isPremium, navigation]
  );

  const handleNext = useCallback(() => {
    if (selectedCategory) {
      setAffirmation((prev) =>
        getRandomFromCategory(AFFIRMATIONS[selectedCategory], prev)
      );
    }
  }, [selectedCategory]);

  const categoryColor = selectedCategory
    ? COLORS.categoryColors[selectedCategory]
    : COLORS.primary;

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Ionicons name="grid" size={42} color={COLORS.primary} />
        <Text style={styles.title}>Browse by Category</Text>
        <Text style={styles.subtitle}>Choose a theme that speaks to you</Text>
      </View>

      <View style={styles.categoryList}>
        {categoryKeys.map((key) => {
          const isLocked = !isPremium && !FREE_CATEGORIES.includes(key);
          return (
            <View key={key} style={{ opacity: isLocked ? 0.6 : 1 }}>
              <CategoryButton
                label={
                  isLocked
                    ? `${CATEGORY_LABELS[key]}  🔒`
                    : CATEGORY_LABELS[key]
                }
                icon={CATEGORY_ICONS[key]}
                color={COLORS.categoryColors[key]}
                onPress={() => handleCategoryPress(key)}
              />
            </View>
          );
        })}
      </View>

      {!isPremium && (
        <Text style={styles.lockHint}>
          Unlock all categories with a one-time purchase
        </Text>
      )}

      {selectedCategory && affirmation && (
        <View style={styles.resultSection}>
          <AffirmationCard
            label={CATEGORY_LABELS[selectedCategory]}
            affirmation={affirmation}
            accentColor={categoryColor}
          />
          <View style={styles.buttonContainer}>
            <ActionButton
              title="Next"
              onPress={handleNext}
              variant="secondary"
            />
          </View>
        </View>
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
    marginBottom: 24,
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
  },
  categoryList: {
    marginBottom: 10,
  },
  lockHint: {
    textAlign: 'center',
    color: COLORS.textLight,
    fontSize: 13,
    fontStyle: 'italic',
    marginBottom: 10,
  },
  resultSection: {
    marginTop: 10,
  },
  buttonContainer: {
    marginTop: 16,
    alignItems: 'center',
  },
});
