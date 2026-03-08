import React, { createContext, useContext, useState, useEffect } from 'react';
import { Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SubscriptionContext = createContext();

// Set your email here to always get free access
const OWNER_EMAIL = 'your-email@example.com';

const STORAGE_KEYS = {
  IS_PREMIUM: '@affirmations_premium',
  OWNER_EMAIL: '@affirmations_owner_email',
  FREE_RANDOM_COUNT: '@affirmations_free_randoms',
};

// Free tier limits
const FREE_RANDOM_LIMIT = 5; // per day

export function SubscriptionProvider({ children }) {
  const [isPremium, setIsPremium] = useState(false);
  const [freeRandomsUsed, setFreeRandomsUsed] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadSubscriptionState();
  }, []);

  async function loadSubscriptionState() {
    try {
      const [premium, countData] = await Promise.all([
        AsyncStorage.getItem(STORAGE_KEYS.IS_PREMIUM),
        AsyncStorage.getItem(STORAGE_KEYS.FREE_RANDOM_COUNT),
      ]);

      if (premium === 'true') {
        setIsPremium(true);
      }

      if (countData) {
        const { count, date } = JSON.parse(countData);
        const today = new Date().toDateString();
        if (date === today) {
          setFreeRandomsUsed(count);
        } else {
          // Reset count for new day
          await AsyncStorage.setItem(
            STORAGE_KEYS.FREE_RANDOM_COUNT,
            JSON.stringify({ count: 0, date: today })
          );
        }
      }
    } catch (e) {
      console.warn('Error loading subscription state:', e);
    } finally {
      setLoading(false);
    }
  }

  async function unlockWithEmail(email) {
    const normalized = email.trim().toLowerCase();
    if (normalized === OWNER_EMAIL.toLowerCase()) {
      setIsPremium(true);
      await AsyncStorage.setItem(STORAGE_KEYS.IS_PREMIUM, 'true');
      return true;
    }
    return false;
  }

  async function purchaseLifetime() {
    // This is where RevenueCat purchase would happen.
    // For now, this is a placeholder that simulates a successful purchase.
    // See README for RevenueCat integration instructions.
    //
    // In production, replace this with:
    //   import Purchases from 'react-native-purchases';
    //   const { customerInfo } = await Purchases.purchasePackage(package);
    //   if (customerInfo.entitlements.active['premium']) { ... }

    setIsPremium(true);
    await AsyncStorage.setItem(STORAGE_KEYS.IS_PREMIUM, 'true');
    return true;
  }

  async function restorePurchase() {
    // Placeholder for RevenueCat restore:
    //   const customerInfo = await Purchases.restorePurchases();
    //   if (customerInfo.entitlements.active['premium']) { ... }

    const premium = await AsyncStorage.getItem(STORAGE_KEYS.IS_PREMIUM);
    if (premium === 'true') {
      setIsPremium(true);
      return true;
    }
    return false;
  }

  async function incrementFreeRandoms() {
    const newCount = freeRandomsUsed + 1;
    setFreeRandomsUsed(newCount);
    await AsyncStorage.setItem(
      STORAGE_KEYS.FREE_RANDOM_COUNT,
      JSON.stringify({ count: newCount, date: new Date().toDateString() })
    );
    return newCount;
  }

  const canUseRandom = isPremium || freeRandomsUsed < FREE_RANDOM_LIMIT;
  const freeRandomsRemaining = Math.max(0, FREE_RANDOM_LIMIT - freeRandomsUsed);

  return (
    <SubscriptionContext.Provider
      value={{
        isPremium,
        loading,
        canUseRandom,
        freeRandomsRemaining,
        freeRandomLimit: FREE_RANDOM_LIMIT,
        unlockWithEmail,
        purchaseLifetime,
        restorePurchase,
        incrementFreeRandoms,
      }}
    >
      {children}
    </SubscriptionContext.Provider>
  );
}

export function useSubscription() {
  const context = useContext(SubscriptionContext);
  if (!context) {
    throw new Error('useSubscription must be used within a SubscriptionProvider');
  }
  return context;
}
