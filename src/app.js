


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
    

   
}


function search (city){
let apiKey ="eb35dd952a431a4636oae87ff0c619et"
let unitsC = "metric"
let apiUrl =`https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=${unitsC}`
axios.get(apiUrl).then(displayTemperature);
axios.get(apiUrl).then(displayTime);


}




function handleSubmit (event){
 event.preventDefault();
 let city = document.querySelector("#city-input");
 search (city.value);

}

function displayFahrenheit (event){
    event.preventDefault()
let temperature = document.querySelector("#temperature");
    FarenheitTemperature= (CelsiusTemperature*9)/5+32;
 temperature.innerHTML= Math.round(FarenheitTemperature);
CButton.classList.remove("active");
FButton.classList.add("active");
}

function displayCelsius (event){
    event.preventDefault()
let temperature = document.querySelector("#temperature");
 temperature.innerHTML= Math.round(CelsiusTemperature);
CButton.classList.add("active");
FButton.classList.remove("active");
}





let CelsiusTemperature = null

let form = document.querySelector("#search-form");
form.addEventListener("submit",handleSubmit);



let FButton = document.querySelector("#f-button");
FButton.addEventListener("click",displayFahrenheit);

let CButton = document.querySelector("#c-button");
CButton.addEventListener("click",displayCelsius);

search ("paris");