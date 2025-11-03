
import { useState, useEffect } from 'react';
import { Appointment } from '@/types/appointment';

export function useAppointments() {
  const [appointments, setAppointments] = useState<Appointment[]>([
    {
      id: '1',
      barberId: '1',
      barberName: 'Marcus Johnson',
      serviceId: '1',
      serviceName: 'Classic Haircut',
      date: '2024-02-15',
      time: '10:00 AM',
      status: 'upcoming',
      price: 25,
    },
    {
      id: '2',
      barberId: '2',
      barberName: 'David Chen',
      serviceId: '5',
      serviceName: 'Haircut & Beard Combo',
      date: '2024-01-20',
      time: '2:00 PM',
      status: 'completed',
      price: 45,
    },
  ]);

  const addAppointment = (appointment: Omit<Appointment, 'id'>) => {
    const newAppointment: Appointment = {
      ...appointment,
      id: Date.now().toString(),
    };
    setAppointments([...appointments, newAppointment]);
    console.log('Appointment added:', newAppointment);
  };

  const cancelAppointment = (id: string) => {
    setAppointments(
      appointments.map((apt) =>
        apt.id === id ? { ...apt, status: 'cancelled' as const } : apt
      )
    );
    console.log('Appointment cancelled:', id);
  };

  const upcomingAppointments = appointments.filter(
    (apt) => apt.status === 'upcoming'
  );

  const pastAppointments = appointments.filter(
    (apt) => apt.status === 'completed' || apt.status === 'cancelled'
  );

  return {
    appointments,
    upcomingAppointments,
    pastAppointments,
    addAppointment,
    cancelAppointment,
  };
}
