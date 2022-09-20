import React, { useState, useEffect } from "react";
import axios from 'axios';

import "components/Application.scss";
import DayList from "./DayList";
import Appointment from "components/Appointment";
import { getAppointmentsForDay } from "helpers/selectors";


export default function Application() {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {}
  })

  const dailyAppointments = getAppointmentsForDay(state, state.day);


  useEffect(() => {
    const dayAPI = axios.get('http://localhost:8001/api/days')
    const appointmentAPI = axios.get('http://localhost:8001/api/appointments')
    Promise.all([
      dayAPI,
      appointmentAPI
    ]).then((res) => {
      setState((prev) => ({
        ...prev,
        days: res[0].data,
        appointments: res[1].data,
      }));
    })
      .catch((e) => {
        console.error(e);
      });
  }, []);

  const setDay = day => setState({ ...state, day });


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
          {dailyAppointments.map(appointment => {
            return (
              <Appointment key={appointment.id} {...appointment} />
            );
          })}
          <Appointment time="5pm" />
        </ul>
      </section>
    </main>
  );
}
