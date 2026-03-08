import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AffirmationCard from '../components/AffirmationCard';
import ActionButton from '../components/ActionButton';
import CategoryButton from '../components/CategoryButton';
import {
  AFFIRMATIONS,
  CATEGORY_LABELS,
  CATEGORY_ICONS,
} from '../data/affirmations';
import { getRandomFromCategory } from '../utils/helpers';
import { COLORS, FONTS } from '../utils/theme';

export default function CategoriesScreen() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [affirmation, setAffirmation] = useState(null);

  const categoryKeys = Object.keys(AFFIRMATIONS);

  const handleCategoryPress = useCallback((key) => {
    setSelectedCategory(key);
    setAffirmation(getRandomFromCategory(AFFIRMATIONS[key], null));
  }, []);

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
        {categoryKeys.map((key) => (
          <CategoryButton
            key={key}
            label={CATEGORY_LABELS[key]}
            icon={CATEGORY_ICONS[key]}
            color={COLORS.categoryColors[key]}
            onPress={() => handleCategoryPress(key)}
          />
        ))}
      </View>

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
  resultSection: {
    marginTop: 10,
  },
  buttonContainer: {
    marginTop: 16,
    alignItems: 'center',
  },
});
