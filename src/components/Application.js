import React, { useState, useEffect } from "react";
import axios from 'axios';

import "components/Application.scss";
import DayList from "./DayList";
import Appointment from "./Appointment";


export default function Application(props) {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {}
  })






  useEffect(() => {
    axios.get("http://localhost:8001/api/days")
      .then((response) => {
        setDays(response.data);
        console.log(response.data)
      })
  }, [])


  return (
    <main className="layout">
      <section className="sidebar">
        {/* Replace this with the sidebar elements during the "Project Setup & Familiarity" activity. */}
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList
            days={days}
            value={day}
            onChange={setDay}
          />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {appointment}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
