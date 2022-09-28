import React, { useState, useEffect } from "react";
import axios from 'axios';

import "components/Application.scss";
import DayList from "./DayList";
import Appointment from "components/Appointment";
import { getAppointmentsForDay, getInterview, getInterviewersByDay } from "helpers/selectors";


export default function Application() {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: []
  })

  const appointments = getAppointmentsForDay(state, state.day);
  const daysInterviewers = getInterviewersByDay(state, state.day);

  const schedule = appointments.map((appointment) => {
    const interview = getInterview(state, appointment.interview);

    function bookInterview(id, interview) {
      const appointment = {
        ...state.appointments[id],
        interview: { ...interview }
      };
      const appointments = {
        ...state.appointments,
        [id]: appointment
      };

      return axios.put('/api/appointments/' + id, appointment)
        .then((res) => {
          setState((prev) => {
            return {
              ...prev,
              appointments,
            };
          });
        })
        .catch((err) => {
          console.error(err);
        })
    };


    return (
      <Appointment
        key={appointment.id}
        id={appointment.id}
        time={appointment.time}
        interview={interview}
        interviewers={daysInterviewers}
        bookInterview={bookInterview}
      />
    );
  });
  const setDay = day => setState({ ...state, day });


  useEffect(() => {
    const dayAPI = axios.get('http://localhost:8001/api/days')
    const appointmentAPI = axios.get('http://localhost:8001/api/appointments')
    const interviewersAPI = axios.get('http://localhost:8001/api/interviewers')
    Promise.all([
      dayAPI,
      appointmentAPI,
      interviewersAPI
    ]).then((res) => {
      setState((prev) => ({
        ...prev,
        days: res[0].data,
        appointments: res[1].data,
        interviewers: res[2].data
      }));
    })
      .catch((e) => {
        console.error(e);
      });
  }, []);


  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList
            days={state.days}
            day={state.day}
            setDay={setDay}
          />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        <ul>
          {schedule}
          <Appointment key="last" time="5pm" />
        </ul>
      </section>
    </main>
  );
}
