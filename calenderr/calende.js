document.addEventListener("DOMContentLoaded", () => {
  const calendarDates = document.getElementById("calendar-dates");
  const eventModal = document.getElementById("event-modal");
  const closeModal = document.querySelector(".close");
  const eventForm = document.getElementById("event-form");
  const currentMonthYear = document.getElementById("current-month-year");
  const prevMonthBtn = document.getElementById("prev-month");
  const nextMonthBtn = document.getElementById("next-month");

  let currentDate = new Date();

  function renderCalendar(date) {
    calendarDates.innerHTML = "";
    const year = date.getFullYear();
    const month = date.getMonth();
    currentMonthYear.innerText = `${date.toLocaleString("default", {
      month: "long",
    })} ${year}`;
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    for (let i = 0; i < firstDay; i++) {
      const emptyCell = document.createElement("div");
      calendarDates.appendChild(emptyCell);
    }

    for (let i = 1; i <= daysInMonth; i++) {
      const dateCell = document.createElement("div");
      dateCell.className = "calendar-date";
      dateCell.innerText = i;
      dateCell.dataset.date = new Date(year, month, i).toISOString();
      calendarDates.appendChild(dateCell);
    }
  }

  function openModal() {
    eventModal.style.display = "block";
  }

  function closeModalFunc() {
    eventModal.style.display = "none";
  }

  calendarDates.addEventListener("click", (e) => {
    if (e.target.classList.contains("calendar-date")) {
      const selectedDate = new Date(e.target.dataset.date);
      document.getElementById("event-date").valueAsDate = selectedDate;
      openModal();
    }
  });

  closeModal.addEventListener("click", closeModalFunc);

  window.addEventListener("click", (e) => {
    if (e.target === eventModal) {
      closeModalFunc();
    }
  });

  eventForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const title = e.target["event-title"].value;
    const date = e.target["event-date"].value;
    const time = e.target["event-time"].value;
    console.log(`Event: ${title} on ${date} at ${time}`);
    closeModalFunc();
  });

  prevMonthBtn.addEventListener("click", () => {
    currentDate.setMonth(currentDate.getMonth() - 1);
    renderCalendar(currentDate);
  });

  nextMonthBtn.addEventListener("click", () => {
    currentDate.setMonth(currentDate.getMonth() + 1);
    renderCalendar(currentDate);
  });

  renderCalendar(currentDate);
});
