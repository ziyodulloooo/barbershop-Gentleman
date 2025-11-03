
import React from "react";
import { View, Text, StyleSheet, ScrollView, Platform, Pressable, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { IconSymbol } from "@/components/IconSymbol";
import { useTheme } from "@react-navigation/native";
import { colors, commonStyles } from "@/styles/commonStyles";
import { useAppointmentContext } from "@/contexts/AppointmentContext";
import { router } from "expo-router";

export default function ProfileScreen() {
  const theme = useTheme();
  const { upcomingAppointments, pastAppointments, cancelAppointment } = useAppointmentContext();

  const handleCancelAppointment = (id: string) => {
    cancelAppointment(id);
    console.log('Appointment cancelled');
  };

  return (
    <SafeAreaView style={[commonStyles.container]} edges={['top']}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={[
          styles.contentContainer,
          Platform.OS !== 'ios' && styles.contentContainerWithTabBar
        ]}
      >
        {/* Profile Header */}
        <View style={styles.profileHeader}>
          <View style={styles.avatarContainer}>
            <IconSymbol name="person.circle.fill" size={80} color={colors.primary} />
          </View>
          <Text style={styles.name}>John Doe</Text>
          <Text style={styles.email}>john.doe@example.com</Text>
          <Pressable style={styles.editButton}>
            <IconSymbol name="pencil" size={16} color={colors.primary} />
            <Text style={styles.editButtonText}>Edit Profile</Text>
          </Pressable>
        </View>

        {/* Contact Info */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Contact Information</Text>
          <View style={styles.infoCard}>
            <View style={styles.infoRow}>
              <IconSymbol name="phone.fill" size={20} color={colors.textSecondary} />
              <Text style={styles.infoText}>+1 (555) 123-4567</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.infoRow}>
              <IconSymbol name="location.fill" size={20} color={colors.textSecondary} />
              <Text style={styles.infoText}>San Francisco, CA</Text>
            </View>
          </View>
        </View>

        {/* Upcoming Appointments */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Upcoming Appointments</Text>
            <Pressable onPress={() => router.push('/booking/select-barber')}>
              <IconSymbol name="plus.circle.fill" size={24} color={colors.primary} />
            </Pressable>
          </View>
          {upcomingAppointments.length === 0 ? (
            <View style={styles.emptyState}>
              <IconSymbol name="calendar" size={48} color={colors.textSecondary} />
              <Text style={styles.emptyStateText}>No upcoming appointments</Text>
              <Pressable
                style={styles.bookNowButton}
                onPress={() => router.push('/booking/select-barber')}
              >
                <Text style={styles.bookNowButtonText}>Book Now</Text>
              </Pressable>
            </View>
          ) : (
            upcomingAppointments.map((appointment) => (
              <View key={appointment.id} style={styles.appointmentCard}>
                <View style={styles.appointmentHeader}>
                  <View style={styles.appointmentIcon}>
                    <IconSymbol name="scissors" color={colors.primary} size={24} />
                  </View>
                  <View style={styles.appointmentInfo}>
                    <Text style={styles.appointmentService}>
                      {appointment.serviceName}
                    </Text>
                    <Text style={styles.appointmentBarber}>
                      with {appointment.barberName}
                    </Text>
                  </View>
                  <Text style={styles.appointmentPrice}>${appointment.price}</Text>
                </View>
                <View style={styles.appointmentDetails}>
                  <View style={styles.detailRow}>
                    <IconSymbol name="calendar" size={16} color={colors.textSecondary} />
                    <Text style={styles.detailText}>{appointment.date}</Text>
                  </View>
                  <View style={styles.detailRow}>
                    <IconSymbol name="clock" size={16} color={colors.textSecondary} />
                    <Text style={styles.detailText}>{appointment.time}</Text>
                  </View>
                </View>
                <View style={styles.appointmentActions}>
                  <Pressable
                    style={styles.cancelButton}
                    onPress={() => handleCancelAppointment(appointment.id)}
                  >
                    <Text style={styles.cancelButtonText}>Cancel</Text>
                  </Pressable>
                  <Pressable style={styles.rescheduleButton}>
                    <Text style={styles.rescheduleButtonText}>Reschedule</Text>
                  </Pressable>
                </View>
              </View>
            ))
          )}
        </View>

        {/* Past Appointments */}
        {pastAppointments.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Past Appointments</Text>
            {pastAppointments.map((appointment) => (
              <View key={appointment.id} style={styles.pastAppointmentCard}>
                <View style={styles.appointmentHeader}>
                  <View style={styles.appointmentInfo}>
                    <Text style={styles.appointmentService}>
                      {appointment.serviceName}
                    </Text>
                    <Text style={styles.appointmentBarber}>
                      with {appointment.barberName}
                    </Text>
                    <Text style={styles.pastAppointmentDate}>
                      {appointment.date} at {appointment.time}
                    </Text>
                  </View>
                  <View
                    style={[
                      styles.statusBadge,
                      appointment.status === 'completed'
                        ? styles.completedBadge
                        : styles.cancelledBadge,
                    ]}
                  >
                    <Text
                      style={[
                        styles.statusText,
                        appointment.status === 'completed'
                          ? styles.completedText
                          : styles.cancelledText,
                      ]}
                    >
                      {appointment.status}
                    </Text>
                  </View>
                </View>
              </View>
            ))}
          </View>
        )}

        {/* Settings */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Settings</Text>
          <View style={styles.settingsCard}>
            <Pressable style={styles.settingRow}>
              <View style={styles.settingLeft}>
                <IconSymbol name="bell.fill" size={20} color={colors.textSecondary} />
                <Text style={styles.settingText}>Notifications</Text>
              </View>
              <IconSymbol name="chevron.right" size={20} color={colors.textSecondary} />
            </Pressable>
            <View style={styles.divider} />
            <Pressable style={styles.settingRow}>
              <View style={styles.settingLeft}>
                <IconSymbol name="heart.fill" size={20} color={colors.textSecondary} />
                <Text style={styles.settingText}>Favorite Barbers</Text>
              </View>
              <IconSymbol name="chevron.right" size={20} color={colors.textSecondary} />
            </Pressable>
            <View style={styles.divider} />
            <Pressable style={styles.settingRow}>
              <View style={styles.settingLeft}>
                <IconSymbol name="creditcard.fill" size={20} color={colors.textSecondary} />
                <Text style={styles.settingText}>Payment Methods</Text>
              </View>
              <IconSymbol name="chevron.right" size={20} color={colors.textSecondary} />
            </Pressable>
            <View style={styles.divider} />
            <Pressable style={styles.settingRow}>
              <View style={styles.settingLeft}>
                <IconSymbol name="questionmark.circle.fill" size={20} color={colors.textSecondary} />
                <Text style={styles.settingText}>Help & Support</Text>
              </View>
              <IconSymbol name="chevron.right" size={20} color={colors.textSecondary} />
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
  },
  contentContainerWithTabBar: {
    paddingBottom: 100,
  },
  profileHeader: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 24,
    alignItems: 'center',
    marginBottom: 16,
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
    elevation: 3,
  },
  avatarContainer: {
    marginBottom: 12,
  },
  name: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 4,
  },
  email: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 16,
  },
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.primary,
  },
  editButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.primary,
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 12,
  },
  infoCard: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
    elevation: 3,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  infoText: {
    fontSize: 16,
    color: colors.text,
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: 12,
  },
  emptyState: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 32,
    alignItems: 'center',
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
    elevation: 3,
  },
  emptyStateText: {
    fontSize: 16,
    color: colors.textSecondary,
    marginTop: 12,
    marginBottom: 16,
  },
  bookNowButton: {
    backgroundColor: colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  bookNowButtonText: {
    color: colors.card,
    fontSize: 14,
    fontWeight: '600',
  },
  appointmentCard: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
    elevation: 3,
  },
  appointmentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  appointmentIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: `${colors.primary}15`,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  appointmentInfo: {
    flex: 1,
  },
  appointmentService: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 2,
  },
  appointmentBarber: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  appointmentPrice: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.primary,
  },
  appointmentDetails: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 12,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  detailText: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  appointmentActions: {
    flexDirection: 'row',
    gap: 12,
  },
  cancelButton: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.error,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: colors.error,
    fontSize: 14,
    fontWeight: '600',
  },
  rescheduleButton: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 8,
    backgroundColor: colors.primary,
    alignItems: 'center',
  },
  rescheduleButtonText: {
    color: colors.card,
    fontSize: 14,
    fontWeight: '600',
  },
  pastAppointmentCard: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
    elevation: 3,
  },
  pastAppointmentDate: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 4,
  },
  statusBadge: {
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 12,
  },
  completedBadge: {
    backgroundColor: `${colors.success}20`,
  },
  cancelledBadge: {
    backgroundColor: `${colors.error}20`,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  completedText: {
    color: colors.success,
  },
  cancelledText: {
    color: colors.error,
  },
  settingsCard: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
    elevation: 3,
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  settingText: {
    fontSize: 16,
    color: colors.text,
  },
});
