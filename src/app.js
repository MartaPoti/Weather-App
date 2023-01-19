


function displayTime (response) {
   



let date = new Date (response);

let hours = date.getHours();
if (hours<10) {
    hours = `0${hours}`
};

let minutes = date.getMinutes();
if (minutes<10) {
    minutes = `0${minutes}`
};

let days = ["Sunday" , "Monday" , "Tuesday" , "Wednesday" , "Thursday" , "Friday" , "Saturday"];

let weekDay = days[date.getDay()];

return `${weekDay}, ${hours}:${minutes}`
};


function displayTemperature (response){

    let h1 = document.querySelector(".cityName");
    h1.innerHTML= `${response.data.city}`;

    let temperature = document.querySelector("#temperature");
    temperature.innerHTML= Math.round(response.data.temperature.current);

    let description = document.querySelector("#description");
    description.innerHTML= `${response.data.condition.description}`;

    let humidity =document.querySelector("#humidity");
    humidity.innerHTML=`${response.data.temperature.humidity}`;

    let wind =document.querySelector("#wind");
    wind.innerHTML=`${response.data.wind.speed}`;

    let feels_like =document.querySelector("#feels_like");
    feels_like.innerHTML=Math.round(response.data.temperature.feels_like);

    let date =document.querySelector("#date");
    date.innerHTML=displayTime (response.data.time*1000);


    let icon =document.querySelector("#icon");
    icon.setAttribute("src",response.data.condition.icon_url);
    icon.setAttribute("alt",response.data.condition.description);
}


function search (event){
    event.preventDefault()
let city = document.querySelector("#city-input");
let cityOutput = document.querySelector(".cityName");


cityOutput.innerHTML=city.value;
let apiKey ="eb35dd952a431a4636oae87ff0c619et"
let units = "metric"
let apiUrl =`https://api.shecodes.io/weather/v1/current?query=${city.value}&key=${apiKey}&units=${units}`
axios.get(apiUrl).then(displayTemperature);
axios.get(apiUrl).then(displayTime);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit",search);






