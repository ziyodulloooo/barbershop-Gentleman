
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, Image } from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { IconSymbol } from '@/components/IconSymbol';
import { colors, commonStyles } from '@/styles/commonStyles';
import { barbersData } from '@/data/barbersData';
import { Barber } from '@/types/appointment';

export default function SelectBarberScreen() {
  const [selectedBarber, setSelectedBarber] = useState<Barber | null>(null);

  const handleSelectBarber = (barber: Barber) => {
    setSelectedBarber(barber);
    console.log('Selected barber:', barber.name);
  };

  const handleContinue = () => {
    if (selectedBarber) {
      router.push({
        pathname: '/booking/select-service',
        params: { barberId: selectedBarber.id, barberName: selectedBarber.name },
      });
    }
  };

  return (
    <SafeAreaView style={[commonStyles.container]} edges={['bottom']}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>Choose Your Barber</Text>
        <Text style={styles.subtitle}>
          Select from our team of experienced professionals
        </Text>

        {barbersData.map((barber) => (
          <Pressable
            key={barber.id}
            style={[
              styles.barberCard,
              selectedBarber?.id === barber.id && styles.selectedCard,
            ]}
            onPress={() => handleSelectBarber(barber)}
          >
            <Image source={{ uri: barber.image }} style={styles.barberImage} />
            <View style={styles.barberInfo}>
              <View style={styles.barberHeader}>
                <Text style={styles.barberName}>{barber.name}</Text>
                {selectedBarber?.id === barber.id && (
                  <View style={styles.checkmark}>
                    <IconSymbol name="checkmark" color={colors.card} size={16} />
                  </View>
                )}
              </View>
              <Text style={styles.barberSpecialty}>{barber.specialty}</Text>
              <View style={styles.barberDetails}>
                <View style={styles.ratingContainer}>
                  <IconSymbol name="star.fill" color={colors.highlight} size={16} />
                  <Text style={styles.ratingText}>{barber.rating}</Text>
                </View>
                <View style={styles.experienceContainer}>
                  <IconSymbol name="briefcase.fill" color={colors.textSecondary} size={16} />
                  <Text style={styles.experienceText}>{barber.experience}</Text>
                </View>
              </View>
            </View>
          </Pressable>
        ))}
      </ScrollView>

      {selectedBarber && (
        <View style={styles.footer}>
          <Pressable style={styles.continueButton} onPress={handleContinue}>
            <Text style={styles.continueButtonText}>Continue</Text>
            <IconSymbol name="arrow.right" color={colors.card} size={20} />
          </Pressable>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
    paddingBottom: 100,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: colors.textSecondary,
    marginBottom: 24,
  },
  barberCard: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    flexDirection: 'row',
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
    elevation: 3,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  selectedCard: {
    borderColor: colors.primary,
    backgroundColor: `${colors.primary}08`,
  },
  barberImage: {
    width: 100,
    height: 100,
    borderRadius: 12,
    backgroundColor: colors.border,
    marginRight: 16,
  },
  barberInfo: {
    flex: 1,
    justifyContent: 'space-between',
  },
  barberHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  barberName: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
  },
  checkmark: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  barberSpecialty: {
    fontSize: 14,
    color: colors.textSecondary,
    marginTop: 4,
  },
  barberDetails: {
    flexDirection: 'row',
    gap: 16,
    marginTop: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  ratingText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
  },
  experienceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  experienceText: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: colors.card,
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    boxShadow: '0px -2px 8px rgba(0, 0, 0, 0.1)',
    elevation: 5,
  },
  continueButton: {
    backgroundColor: colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 12,
    gap: 8,
  },
  continueButtonText: {
    color: colors.card,
    fontSize: 16,
    fontWeight: '600',
  },
});
