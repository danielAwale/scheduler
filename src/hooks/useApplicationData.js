import { useState, useEffect } from "react";
import axios from "axios";

export default () => {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });
  useEffect(() => {
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers'),
    ])
      .then((res) => {
        setState((prev) => ({
          ...prev,
          days: res[0].data,
          appointments: { ...res[1].data },
          interviewers: { ...res[2].data },
        }));
      })
      .catch((e) => { console.error(e); });
  }, []);

  const setDay = (day) => { setState((prev) => ({ ...prev, day })); };

  const bookInterview = (id, interview) => {
    const appointment = {
      ...state.appointments[id],
      interview,
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    const foundDay = state.days.find((day) => day.appointments.includes(id));
    const days = state.days.map((day, index) => {
      if (day.name === foundDay.name && state.appointments[id].interview === null) {
        return { ...day, spots: day.spots - 1 };
      } else {
        return day;
      }
    });


    return axios.put(`/api/appointments/${id}`, { interview })
      .then((res) => {
        setState((prev) => ({
          ...prev,
          appointments,
          days,
        }));
      });
  };


  const cancelInterview = (id) => {
    const appointment = {
      ...state.appointments[id],
      interview: null,
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    const foundDay = state.days.find((day) => day.appointments.includes(id));
    const days = state.days.map((day, index) => {
      if (day.name === foundDay.name) {
        return { ...day, spots: day.spots + 1 };
      } else {
        return day;
      }
    });

    return axios.delete('/api/appointments/' + id)
      .then((res) => {
        setState((prev) => ({
          ...prev,
          appointments,
          days,
        }));
      });
  };

  return {
    state,
    setDay,
    bookInterview,
    cancelInterview
  };
};