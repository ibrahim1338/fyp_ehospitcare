import React, { useState } from 'react'
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
function CalenderComponent() {
    const localizer = momentLocalizer(moment);
    const [date, setDate] = useState(new Date());

    const handleNavigate = (newDate) => {
      setDate(newDate);}
  return (
    <div style={{ padding: "20px" }}>
      <h2 style={{ borderBottom: "2px solid #1976D2" }}>Calendar</h2>
      <Calendar
        localizer={localizer}
        events={[]} // You can add your events here
        startAccessor="start"
        endAccessor="end"
        defaultView="month"
        date={date}
        onNavigate={handleNavigate}
        views={["month", "week", "day", "agenda"]}
        style={{ height: "500px", margin: "20px auto", borderRadius: "10px" }}
      />
    </div>
  )
}

export default CalenderComponent