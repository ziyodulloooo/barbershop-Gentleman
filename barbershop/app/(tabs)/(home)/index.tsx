
import React from "react";
import { Stack, Link, router } from "expo-router";
import { ScrollView, Pressable, StyleSheet, View, Text, Image, Platform } from "react-native";
import { IconSymbol } from "@/components/IconSymbol";
import { useTheme } from "@react-navigation/native";
import { colors, commonStyles } from "@/styles/commonStyles";
import { barbersData } from "@/data/barbersData";
import { servicesData } from "@/data/servicesData";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  const theme = useTheme();

  const renderHeaderRight = () => (
    <Pressable
      onPress={() => console.log('Notifications pressed')}
      style={styles.headerButtonContainer}
    >
      <IconSymbol name="bell.fill" color={colors.primary} size={24} />
    </Pressable>
  );

  return (
    <>
      {Platform.OS === 'ios' && (
        <Stack.Screen
          options={{
            title: "BarberShop",
            headerRight: renderHeaderRight,
          }}
        />
      )}
      <SafeAreaView style={[commonStyles.container]} edges={['top']}>
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={[
            styles.contentContainer,
            Platform.OS !== 'ios' && styles.contentContainerWithTabBar
          ]}
          showsVerticalScrollIndicator={false}
        >
          {/* Hero Section */}
          <View style={styles.heroSection}>
            <Text style={styles.heroTitle}>Welcome to BarberShop</Text>
            <Text style={styles.heroSubtitle}>
              Book your appointment with the best barbers in town
            </Text>
            <Pressable
              style={styles.bookButton}
              onPress={() => router.push('/booking/select-barber')}
            >
              <IconSymbol name="calendar" color={colors.card} size={20} />
              <Text style={styles.bookButtonText}>Book Appointment</Text>
            </Pressable>
          </View>

          {/* Featured Barbers */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Our Barbers</Text>
              <Pressable onPress={() => router.push('/booking/select-barber')}>
                <Text style={styles.seeAllText}>See All</Text>
              </Pressable>
            </View>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.horizontalScroll}
            >
              {barbersData.slice(0, 3).map((barber) => (
                <Pressable
                  key={barber.id}
                  style={styles.barberCard}
                  onPress={() => router.push('/booking/select-barber')}
                >
                  <Image
                    source={{ uri: barber.image }}
                    style={styles.barberImage}
                  />
                  <View style={styles.barberInfo}>
                    <Text style={styles.barberName}>{barber.name}</Text>
                    <Text style={styles.barberSpecialty}>{barber.specialty}</Text>
                    <View style={styles.ratingContainer}>
                      <IconSymbol name="star.fill" color={colors.highlight} size={14} />
                      <Text style={styles.ratingText}>{barber.rating}</Text>
                    </View>
                  </View>
                </Pressable>
              ))}
            </ScrollView>
          </View>

          {/* Popular Services */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Popular Services</Text>
              <Pressable onPress={() => router.push('/booking/select-service')}>
                <Text style={styles.seeAllText}>See All</Text>
              </Pressable>
            </View>
            {servicesData.slice(0, 4).map((service) => (
              <Pressable
                key={service.id}
                style={styles.serviceCard}
                onPress={() => router.push('/booking/select-service')}
              >
                <View style={styles.serviceIcon}>
                  <IconSymbol name="scissors" color={colors.primary} size={24} />
                </View>
                <View style={styles.serviceInfo}>
                  <Text style={styles.serviceName}>{service.name}</Text>
                  <Text style={styles.serviceDescription}>
                    {service.description}
                  </Text>
                  <View style={styles.serviceDetails}>
                    <Text style={styles.serviceDuration}>
                      {service.duration} min
                    </Text>
                    <Text style={styles.servicePrice}>${service.price}</Text>
                  </View>
                </View>
              </Pressable>
            ))}
          </View>

          {/* Quick Info */}
          <View style={styles.infoSection}>
            <View style={styles.infoCard}>
              <IconSymbol name="clock.fill" color={colors.accent} size={32} />
              <Text style={styles.infoTitle}>Opening Hours</Text>
              <Text style={styles.infoText}>Mon - Sat: 9AM - 8PM</Text>
              <Text style={styles.infoText}>Sunday: 10AM - 6PM</Text>
            </View>
            <View style={styles.infoCard}>
              <IconSymbol name="location.fill" color={colors.secondary} size={32} />
              <Text style={styles.infoTitle}>Location</Text>
              <Text style={styles.infoText}>123 Main Street</Text>
              <Text style={styles.infoText}>Downtown, CA 90210</Text>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  contentContainerWithTabBar: {
    paddingBottom: 100,
  },
  headerButtonContainer: {
    padding: 8,
    marginRight: 8,
  },
  heroSection: {
    backgroundColor: colors.primary,
    borderRadius: 16,
    padding: 24,
    marginTop: 16,
    marginBottom: 24,
    alignItems: 'center',
  },
  heroTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.card,
    textAlign: 'center',
    marginBottom: 8,
  },
  heroSubtitle: {
    fontSize: 16,
    color: colors.card,
    textAlign: 'center',
    marginBottom: 20,
    opacity: 0.9,
  },
  bookButton: {
    backgroundColor: colors.secondary,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 25,
    gap: 8,
  },
  bookButtonText: {
    color: colors.card,
    fontSize: 16,
    fontWeight: '600',
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.text,
  },
  seeAllText: {
    fontSize: 14,
    color: colors.primary,
    fontWeight: '600',
  },
  horizontalScroll: {
    gap: 12,
  },
  barberCard: {
    backgroundColor: colors.card,
    borderRadius: 12,
    width: 160,
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
    elevation: 3,
    overflow: 'hidden',
  },
  barberImage: {
    width: '100%',
    height: 160,
    backgroundColor: colors.border,
  },
  barberInfo: {
    padding: 12,
  },
  barberName: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 4,
  },
  barberSpecialty: {
    fontSize: 12,
    color: colors.textSecondary,
    marginBottom: 8,
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
  serviceCard: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
    elevation: 3,
  },
  serviceIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: `${colors.primary}15`,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
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
    marginBottom: 8,
  },
  serviceDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  serviceDuration: {
    fontSize: 13,
    color: colors.textSecondary,
  },
  servicePrice: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.primary,
  },
  infoSection: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
  infoCard: {
    flex: 1,
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
    elevation: 3,
  },
  infoTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
    marginTop: 8,
    marginBottom: 8,
  },
  infoText: {
    fontSize: 12,
    color: colors.textSecondary,
    textAlign: 'center',
  },
});
