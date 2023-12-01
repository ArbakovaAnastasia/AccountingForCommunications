const calendar = document.querySelector(".calendar"),
    date = document.querySelector(".date"),
    daysContainer = document.querySelector(".days"),
    prev = document.querySelector(".prev"),
    next = document.querySelector(".next"),
    todayBtn = document.querySelector(".today-btn"),
    gotoBtn = document.querySelector(".goto-btn"),
    dateInput = document.querySelector(".date-input");
    
    

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

//функция добавления дней
function initCalendar(){
    //get prev month days and current month all days and rem next month days
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const prevLastDay = new Date(year, month, 0);
    const prevDays = (firstDay.getDay() + 6) % 7;//изм
    const lastDate = lastDay.getDate();
    const day = (firstDay.getDay() + 6) % 7;//изм
    const nextDays = (7 - lastDay.getDay() - 1 + 7) % 7;//изм
    
    //update date top of calendar
    date.innerHTML = months[month] + " " + year;
    
    //adding days on dom
    let  days = "";
    
    //prev month days
    for (let x = day; x > 0; x--){
        days += `<div class="day prev-date">${prevLastDay.getDate() - x + 1}</div>`;//изм
    }
    
    //current month days
    for (let i = 1; i <= lastDate; i++){
        //if day is today add class today
        if (i === new Date().getDate() && year === new Date().getFullYear() && month === new Date().getMonth()) {
            days += `<div class="day today">${i}</div>`;                                                //active event убрать
        }
        //add remaing as it is
        else {
            days += `<div class="day">${i}</div>`;
        }
    }
    
    //next month days
    for(let j = 1; j <= nextDays+1; j++){//изм
        days += `<div class="day next-date">${j}</div>`;
    }
    
    daysContainer.innerHTML = days;
}

initCalendar();

//prev month
function prevMonth(){
    month--;
    if (month < 0) {
        month = 11;
        year--;
    }
    initCalendar();
}

//next month
function nextMonth(){
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