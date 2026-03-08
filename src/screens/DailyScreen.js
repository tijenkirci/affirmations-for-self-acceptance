import React, { useMemo } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AffirmationCard from '../components/AffirmationCard';
import { getDailyAffirmation, formatDate } from '../utils/helpers';
import { COLORS, FONTS } from '../utils/theme';

export default function DailyScreen() {
  const dailyAffirmation = useMemo(() => getDailyAffirmation(), []);
  const todayDate = useMemo(() => formatDate(), []);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Ionicons name="sunny" size={48} color={COLORS.accent} />
        <Text style={styles.greeting}>Good day, beautiful</Text>
        <Text style={styles.date}>{todayDate}</Text>
      </View>

      <AffirmationCard
        label="Today's Affirmation"
        affirmation={dailyAffirmation}
        accentColor={COLORS.accent}
      />

      <Text style={styles.footerText}>
        This affirmation was chosen for you today.{'\n'}
        Come back tomorrow for a new one.
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
    paddingTop: 60,
    paddingBottom: 40,
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
  },
  greeting: {
    ...FONTS.heading,
    fontSize: 28,
    color: COLORS.text,
    marginTop: 16,
  },
  date: {
    ...FONTS.body,
    color: COLORS.textLight,
    marginTop: 6,
  },
  footerText: {
    ...FONTS.body,
    color: COLORS.textLight,
    textAlign: 'center',
    marginTop: 30,
    paddingHorizontal: 40,
    fontSize: 14,
    lineHeight: 22,
  },
});
