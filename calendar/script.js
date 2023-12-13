const calendar = document.querySelector(".calendar"),
    date = document.querySelector(".date"),
    daysContainer = document.querySelector(".days"),
    prev = document.querySelector(".prev"),
    next = document.querySelector(".next"),
    todayBtn = document.querySelector(".today-btn"),
    gotoBtn = document.querySelector(".goto-btn"),
    dateInput = document.querySelector(".date-input"),
    eventDay = document.querySelector(".event-day"),
    eventDate = document.querySelector(".event-date"),
    eventsContainer = document.querySelector(".events");

let today = new Date();
let activeDay;
let month = today.getMonth();
let year = today.getFullYear();

const months = [
    "Январь",
    "Февраль",
    "Март",
    "Апрель",
    "Май",
    "Июнь",
    "Июль",
    "Август",
    "Сентябрь",
    "Октябрь",
    "Ноябрь",
    "Декабрь",
];

const eventsArr = [
    {
        day: 12,
        month: 12,
        year: 2023,
        events: [
            {
                title: "asd",
                time: "10:00 AM",
            },
            {
                title: "sad",
                time: "11:00 AM",
            },
        ],
    },
    {
        day: 14,
        month: 12,
        year: 2023,
        events: [
            {
                title: "asd",
                time: "10:00 AM",
            },
        ],
    },
];

function initCalendar(){                                        //функция добавления дней
    //get prev month days and current month all days and rem next month days
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const prevLastDay = new Date(year, month, 0);
    const prevDays = (firstDay.getDay() + 6) % 7;               //изм
    const lastDate = lastDay.getDate();
    const day = (firstDay.getDay() + 6) % 7;                    //изм
    const nextDays = (7 - lastDay.getDay() - 1 + 7) % 7;        //изм
    
    date.innerHTML = months[month] + "    " + year + " год"; //update date top of calendar
    
    let  days = ""; //adding days on dom
    
    //prev month days
    for (let x = day; x > 0; x--){
        days += `<div class="day prev-date">${prevLastDay.getDate() - x + 1}</div>`;    //изм
    }
    
    //current month days
    for (let i = 1; i <= lastDate; i++){
        let event = false;  //check if event present on current day
        eventsArr.forEach((eventObj) => {
            if (
                eventObj.day === i &&
                eventObj.month === month + 1 &&
                eventObj.year === year
            )
            {
                event = true;   //if event found
            }
        });

        //if day is today add class today
        if (i === new Date().getDate() && year === new Date().getFullYear() && month === new Date().getMonth()) {
            activeDay = i;
            getActiveDay(i);
            updateEvents(i);
            if (event) {
                days += `<div class="day today active event">${i}</div>`;                                             
            }
            else {
                days += `<div class="day today active">${i}</div>`;                                           
            }
        } else { //add remaing as it is
            if (event) {
                days += `<div class="day event">${i}</div>`;                                             
            }
            else {
                days += `<div class="day">${i}</div>`;                                           
            }
        }   
    }
    
    //next month days
    for(let j = 1; j <= nextDays+1; j++){  //изм
        days += `<div class="day next-date">${j}</div>`;
    }
    daysContainer.innerHTML = days;
    addListner();
}

initCalendar();

function prevMonth(){  //prev month
    month--;
    if (month < 0) {
        month = 11;
        year--;
    }
    initCalendar();
}

function nextMonth(){  //next month
    month++;
    if (month > 11){
        month = 0;
        year++;
    }
    initCalendar();
}

//add event listener on prev and next
prev.addEventListener("click", prevMonth);
next.addEventListener("click", nextMonth);

//add goto date and goto today
todayBtn.addEventListener("click", () => {
    today = new Date();
    month = today.getMonth();
    year = today.getFullYear();
    initCalendar();
});
dateInput.addEventListener("input", (e) => {
    dateInput.value = dateInput.value.replace(/[^0-9/]/g, "");
    if (dateInput.value.length === 2) {
      dateInput.value += "/";
    }
    if (dateInput.value.length > 7) {
      dateInput.value = dateInput.value.slice(0, 7);
    }
    if (e.inputType === "deleteContentBackward") {
      if (dateInput.value.length === 3) {
        dateInput.value = dateInput.value.slice(0, 2);
      }
    }
});

gotoBtn.addEventListener("click", gotoDate);

function gotoDate() {
    const dateArr = dateInput.value.split("/");
    if (dateArr.length === 2) {
        if (dateArr[0] > 0 && dateArr[0] < 13 && dateArr[1].length === 4) {
            month = dateArr[0] - 1;
            year = dateArr[1];
            initCalendar();
            return;
        }
    }
    alert("invalid date")
};

const addEventBtn = document.querySelector(".add-event"),
    addEventContainer = document.querySelector(".add-event-wrapper"),
    addEventCloseBtn = document.querySelector(".close"),
    addEventTitle = document.querySelector(".event-name"),
    addEventFrom = document.querySelector(".event-time-from"),
    addEventTo = document.querySelector(".event-time-to");

addEventBtn.addEventListener("click", () => {
    addEventContainer.classList.toggle("active");
});
addEventCloseBtn.addEventListener("click", () => {
    addEventContainer.classList.remove("active");
});
document.addEventListener("click", (e) => {
    if (e.target !== addEventBtn && !addEventContainer.contains(e.target)) {
      addEventContainer.classList.remove("active");
    }
});
addEventTitle.addEventListener("input",  (e) => {
    addEventTitle.value = addEventTitle.value.slice(0, 50); //allow only 50 chars in title
});
//time format in from and to time
addEventFrom.addEventListener("input", (e) => {
    addEventFrom.value = addEventFrom.value.replace(/[^0-9:]/g, "");
    if(addEventFrom.value.length === 2) {
        addEventFrom.value += ":";
    }
    if (addEventFrom.value.length > 5){
        addEventFrom.value = addEventFrom.value.slice(0, 5);
    }
});
addEventTo.addEventListener("input", (e) => {
    addEventTo.value = addEventTo.value.replace(/[^0-9:]/g, "");
    if(addEventTo.value.length === 2) {
        addEventTo.value += ":";
    }
    if (addEventTo.value.length > 5){
        addEventTo.value = addEventTo.value.slice(0, 5);
    }
});
  
function addListner () {
    const  days = document.querySelectorAll(".day");
    days.forEach((day) => {
        day.addEventListener("click", (e) => {
            activeDay = Number(e.target.innerHTML);
            getActiveDay(e.target.innerHTML);
            updateEvents(Number(e.target.innerHTML));
            days.forEach((day) => {
                day.classList.remove("active");
            });
            if(e.target.classList.contains("prev-date")) {
                prevMonth();
                setTimeout(() => {
                    const days = document.querySelectorAll(".day"); 
                    days.forEach((day) => {
                        if(!day.classList.contains("prev-date") && day.innerHTML === e.target.innerHTML){
                            day.classList.add("active");
                        }
                    });
                }, 100);
            } else if(e.target.classList.contains("next-date")) {
                nextMonth();
                setTimeout(() => {
                    const days = document.querySelectorAll(".day"); 
                    days.forEach((day) => {
                        if(!day.classList.contains("next-date") && day.innerHTML === e.target.innerHTML){
                            day.classList.add("active");
                        }
                    });
                }, 100);
            } else {
                e.target.classList.add("active");
            }
        });
    });
}

function getActiveDay(date) {  //заголовок этого дня
    const day = new Date(year, month, date);
    const dayName = day.toString().split(" ")[0];
    if (dayName === "Mon") {
        eventDay.innerHTML = "Понедельник";
    } else if (dayName === "Tue") {
        eventDay.innerHTML = "Вторник";
    } else if (dayName === "Wed") {
        eventDay.innerHTML = "Среда";
    } else if (dayName === "Thu") {
        eventDay.innerHTML = "Четверг";
    } else if (dayName === "Fri") {
        eventDay.innerHTML = "Пятница";
    } else if (dayName === "Sat") {
        eventDay.innerHTML = "Суббота";
    } else if (dayName === "Sun") {
        eventDay.innerHTML = "Воскресенье";
    }
    eventDate.innerHTML = date + " " + months[month] + " " + year;
};
function updateEvents(date) { //events на выбранный день
    let events = "";
    eventsArr.forEach((event) => {
        if (
            date === event.day &&
            month + 1 === event.month &&
            year === event.year
        ){
            event.events.forEach((event) => {
                events += `<div class="event">
                    <div class="title">
                      <i class="fas fa-circle"></i>
                      <h3 class="event-title">${event.title}</h3>
                    </div>
                    <div class="event-time">
                      <span class="event-time">${event.time}</span>
                    </div>
                </div>`;
            });
        }
    });
    if (events === "") {
        events = `<div class="no-event">
                <h3>Коммуникаций нет</h3>
            </div>`;
    }
    eventsContainer.innerHTML = events;
};





document.getElementById('calendarBtn').addEventListener('click', function() {
    this.classList.add('btn-active');
    document.getElementById('statsBtn').classList.remove('btn-active');
    document.getElementById('remindersBtn').classList.remove('btn-active');
    document.querySelector('.container').classList.add('active');
  document.querySelector('.statistic').classList.remove('active');
  document.querySelector('.reminders').classList.remove('active');
  });
  
  document.getElementById('statsBtn').addEventListener('click', function() {
    this.classList.add('btn-active');
    document.getElementById('calendarBtn').classList.remove('btn-active');
    document.getElementById('remindersBtn').classList.remove('btn-active');
    document.querySelector('.statistic').classList.add('active');
  document.querySelector('.container').classList.remove('active');
  document.querySelector('.reminders').classList.remove('active');
  });
  
  document.getElementById('remindersBtn').addEventListener('click', function() {
    this.classList.add('btn-active');
    document.getElementById('calendarBtn').classList.remove('btn-active');
    document.getElementById('statsBtn').classList.remove('btn-active');
    document.querySelector('.reminders').classList.add('active');
  document.querySelector('.container').classList.remove('active');
  document.querySelector('.statistic').classList.remove('active');
  });
