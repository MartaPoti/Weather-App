


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
    let temperature = document.querySelector("#temperature");
    let description = document.querySelector("#description");
    let humidity =document.querySelector("#humidity");  
    let wind =document.querySelector("#wind");
    let pressure =document.querySelector("#pressure");
    let date =document.querySelector("#date");
    let icon =document.querySelector("#icon");

 
    CelsiusTemperature =response.data.temperature.current;


    h1.innerHTML= `${response.data.city}`;  
    temperature.innerHTML= Math.round(CelsiusTemperature);   
    description.innerHTML= `${response.data.condition.description}`;   
    humidity.innerHTML=`${response.data.temperature.humidity}`;    
    wind.innerHTML=`${response.data.wind.speed}`;   
    pressure.innerHTML=Math.round(response.data.temperature.pressure);  
    date.innerHTML=displayTime (response.data.time*1000);


    
    icon.setAttribute("src",response.data.condition.icon_url);
    icon.setAttribute("alt",response.data.condition.description);   
    

   
};

function formatDate(timestamp) {
let date = new Date(timestamp*1000);
let day = date.getDay();
let days= ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];

return days[day];
}


function getForecast (city) {
let apiKey="eb35dd952a431a4636oae87ff0c619et"
let apiUrl =`https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`
axios.get(apiUrl).then(displayForecast);


}


function search (city){
let apiKey ="eb35dd952a431a4636oae87ff0c619et"
let apiUrl =`https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`
axios.get(apiUrl).then(displayTemperature);
axios.get(apiUrl).then(displayTime);


}




function handleSubmit (event){
 event.preventDefault();
 let city = document.querySelector("#city-input");
 search (city.value);
 getForecast(city.value);

}


function displayForecast (response){
    
    let forecast = response.data.daily;
    let forecastElement = document.querySelector("#forecast")
     let forecastHTML="";
    forecastHTML=forecastHTML + `<div class="row">`
    forecast.forEach(function(forecastDay, index) {
   if (index>0 && index<7) 
   forecastHTML=forecastHTML + `
    
    
              <div class="col-2">
                <div class="forecast-weekday">${formatDate(forecastDay.time)}</div>
                <img
                  src=${forecastDay.condition.icon_url}
                  alt=${forecastDay.condition.icon}
                  id="forecast-icon"
                  width="48"
                />
                <div>
                  <span class="forecast-temp-max">${Math.round(forecastDay.temperature.maximum)} </span>
                  <span class="forecast-temp-min">${Math.round(forecastDay.temperature.minimum)}</span>
                </div>
              </div>
            
            `

   
    });

    
forecastHTML=forecastHTML + `</div>`
forecastElement.innerHTML= forecastHTML

};



let form = document.querySelector("#search-form");
form.addEventListener("submit",handleSubmit);




search ("Hel");
getForecast("Hel")
