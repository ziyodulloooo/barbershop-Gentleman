
import React, { createContext, useContext, ReactNode } from 'react';
import { useAppointments } from '@/hooks/useAppointments';
import { Appointment } from '@/types/appointment';

interface AppointmentContextType {
  appointments: Appointment[];
  upcomingAppointments: Appointment[];
  pastAppointments: Appointment[];
  addAppointment: (appointment: Omit<Appointment, 'id'>) => void;
  cancelAppointment: (id: string) => void;
}

const AppointmentContext = createContext<AppointmentContextType | undefined>(
  undefined
);

export function AppointmentProvider({ children }: { children: ReactNode }) {
  const appointmentData = useAppointments();

  return (
    <AppointmentContext.Provider value={appointmentData}>
      {children}
    </AppointmentContext.Provider>
  );
}

export function useAppointmentContext() {
  const context = useContext(AppointmentContext);
  if (context === undefined) {
    throw new Error(
      'useAppointmentContext must be used within an AppointmentProvider'
    );
  }
  return context;
}
