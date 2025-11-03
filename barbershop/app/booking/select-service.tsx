
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { IconSymbol } from '@/components/IconSymbol';
import { colors, commonStyles } from '@/styles/commonStyles';
import { servicesData } from '@/data/servicesData';
import { Service } from '@/types/appointment';

export default function SelectServiceScreen() {
  const params = useLocalSearchParams();
  const { barberId, barberName } = params;
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  const handleSelectService = (service: Service) => {
    setSelectedService(service);
    console.log('Selected service:', service.name);
  };

  const handleContinue = () => {
    if (selectedService) {
      router.push({
        pathname: '/booking/select-datetime',
        params: {
          barberId,
          barberName,
          serviceId: selectedService.id,
          serviceName: selectedService.name,
          servicePrice: selectedService.price.toString(),
          serviceDuration: selectedService.duration.toString(),
        },
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
        <Text style={styles.title}>Select a Service</Text>
        <Text style={styles.subtitle}>
          Booking with {barberName}
        </Text>

        {servicesData.map((service) => (
          <Pressable
            key={service.id}
            style={[
              styles.serviceCard,
              selectedService?.id === service.id && styles.selectedCard,
            ]}
            onPress={() => handleSelectService(service)}
          >
            <View style={styles.serviceHeader}>
              <View style={styles.serviceIcon}>
                <IconSymbol name="scissors" color={colors.primary} size={24} />
              </View>
              <View style={styles.serviceInfo}>
                <Text style={styles.serviceName}>{service.name}</Text>
                <Text style={styles.serviceDescription}>{service.description}</Text>
              </View>
              {selectedService?.id === service.id && (
                <View style={styles.checkmark}>
                  <IconSymbol name="checkmark" color={colors.card} size={16} />
                </View>
              )}
            </View>
            <View style={styles.serviceFooter}>
              <View style={styles.durationContainer}>
                <IconSymbol name="clock" color={colors.textSecondary} size={16} />
                <Text style={styles.durationText}>{service.duration} min</Text>
              </View>
              <Text style={styles.priceText}>${service.price}</Text>
            </View>
          </Pressable>
        ))}
      </ScrollView>

      {selectedService && (
        <View style={styles.footer}>
          <View style={styles.footerInfo}>
            <Text style={styles.footerLabel}>Selected Service</Text>
            <Text style={styles.footerValue}>{selectedService.name}</Text>
          </View>
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
    paddingBottom: 150,
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
  serviceCard: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
    elevation: 3,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  selectedCard: {
    borderColor: colors.primary,
    backgroundColor: `${colors.primary}08`,
  },
  serviceHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  serviceIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: `${colors.primary}15`,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  serviceInfo: {
    flex: 1,
  },
  serviceName: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 4,
  },
  serviceDescription: {
    fontSize: 13,
    color: colors.textSecondary,
    lineHeight: 18,
  },
  checkmark: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  serviceFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  durationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  durationText: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  priceText: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.primary,
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
  footerInfo: {
    marginBottom: 12,
  },
  footerLabel: {
    fontSize: 12,
    color: colors.textSecondary,
    marginBottom: 2,
  },
  footerValue: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
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
