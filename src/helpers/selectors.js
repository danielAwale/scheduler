export const getAppointmentsForDay = (state, day) => {
  const selectedDay = state.days.find((item) => item.name === day);
  if (!selectedDay) return [];

  return selectedDay.appointments.map((id) => state.appointments[id]);
};