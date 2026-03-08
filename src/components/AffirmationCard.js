import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { COLORS, FONTS } from '../utils/theme';

export default function AffirmationCard({ label, affirmation, accentColor, subtitle }) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(15)).current;

  useEffect(() => {
    fadeAnim.setValue(0);
    slideAnim.setValue(15);
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start();
  }, [affirmation]);

  return (
    <View style={[styles.card, accentColor && { borderTopColor: accentColor, borderTopWidth: 3 }]}>
      {label && <Text style={[styles.label, accentColor && { color: accentColor }]}>{label}</Text>}
      <Animated.Text
        style={[
          styles.affirmation,
          { opacity: fadeAnim, transform: [{ translateY: slideAnim }] },
        ]}
      >
        "{affirmation}"
      </Animated.Text>
      {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.surface,
    borderRadius: 20,
    padding: 28,
    marginHorizontal: 20,
    marginVertical: 12,
    shadowColor: COLORS.cardShadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 20,
    elevation: 5,
  },
  label: {
    ...FONTS.label,
    color: COLORS.primary,
    marginBottom: 16,
  },
  affirmation: {
    ...FONTS.affirmation,
    color: COLORS.text,
    textAlign: 'center',
  },
  subtitle: {
    ...FONTS.body,
    color: COLORS.textLight,
    textAlign: 'center',
    marginTop: 16,
    fontSize: 14,
  },
});
