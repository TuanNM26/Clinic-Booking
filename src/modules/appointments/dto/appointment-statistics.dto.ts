export class AppointmentStatisticsDto {
  totalAppointments: number;
  confirmedAppointments: number;
  pendingAppointments: number;
  canceledAppointments: number;
  confirmationRate: number;
  cancellationRate: number;
  appointmentsPerDoctor: Record<string, number>;
  newPatientCount: number;
  returningPatientCount: number;
  averageConfirmationTimeInHours: number;
}
