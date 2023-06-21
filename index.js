// fetching 
const userTab = document.querySelector("[data-userWeather]");
const searchTab = document.querySelector("[data-searchWeather]");
const userContainer = document.querySelector(".weather-container");
const grantAccessContainer = document.querySelector(".grant-location-container");
const searchForm = document.querySelector("[data-searchForm]");
const loadingScreen = document.querySelector(".loading-container");
const userInfoContainer = document.querySelector(".user-info-container");

// initially variable need
let currentTab = userTab;
const API_KEY = "827c4115c12b1906177c904a35982c2e";
currentTab.classList.add("current-tab");

//initally when we load app it may happen latitude and logitude may be already present so make function call of getfromSession Storage 
//if it is present in it,it will show otherwise it will fetch current location
getFromSessionStorage();


//logic of switch tab
function switchTab(clickedTab){
    //if we click on current tab which is same as cicked tab then do nothing
    //if cicked tab and current tab are different then do below

    if(clickedTab != currentTab){  //this case is when we want to do switching
        //shifting background color from current tab to clicked tab
        currentTab.classList.remove("current-tab");
        currentTab = clickedTab;
        currentTab.classList.add("current-tab"); //applying back current-tab properties to clicked-tab

        //checking whether i m on your weather tab or search tab
        if(!searchForm.classList.contains("active")) {  //if in searchForm we do not have active then we need to make it active as i want to go to search form container
        //  remove grant access UI, remove userWeather and add active class to search form

            userInfoContainer.classList.remove("active");  //marking search form invisible 
            grantAccessContainer.classList.remove("active");
            searchForm.classList.add("active"); //marking search form visible
        }
        else{
            //your weather visible
            //main pehle serach wale tab pr tha , ab your weather tab visible karna hai
            searchForm.classList.remove("active");
            userInfoContainer.classList.remove("active");
            //now we are in Your Weather tab, so we need to display weather, so lets check Local Storage first for coordinates if we have saved them there.
            getFromSessionStorage();
        }
    }
}

userTab.addEventListener("click", () => {
    //pass clicked tab as input parameter
    switchTab(userTab);
})

searchTab.addEventListener("click", () => {
    //pass clicked tab as input parameter
    switchTab(searchTab);
})

//check if coordinates are already present in session storage
function getFromSessionStorage() {
    const localCoordinates = sessionStorage.getItem("user-coordinates");
    if(!localCoordinates){
        //if local coordinates are not present already means coordinates are not saved so make grantAccess location
        grantAccessContainer.classList.add("active");
    }
    else {
        //coordinates present already
        const coordinates = JSON.parse(localCoordinates);
        fetchUserWeatherInfo(coordinates);
    }
}

async function fetchUserWeatherInfo(coordinates){
    //fetch latitude and longitude from coordinates
    const {lat,lon} = coordinates;
    //make grantContainer invisible
    grantAccessContainer.classList.remove("active");
    //make loader visible
    loadingScreen.classList.add("active");

    //api call
    try{
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
        );
        const data = await response.json();
        //remove loader
        loadingScreen.classList.remove("active");
        userInfoContainer.classList.add("active");

        //data mai se value(response) nikalega and will render in UI
        renderWeatherInfo(data);
    }
    catch(err){
        loadingScreen.classList.remove("active");
        //HW
    }
}

function renderWeatherInfo(weatherInfo) {
    //firstly we have to fetch the elements
    const cityName = document.querySelector("[data-cityName]");
    const countryIcon = document.querySelector("[data-countryIcon]");
    const desc = document.querySelector("[data-weatherDesc]");
    const weatherIcon = document.querySelector("[data-weatherIcon]");
    const temp = document.querySelector("[data-temp]");
    const windspeed = document.querySelector("[data-windspeed]");
    const humidity = document.querySelector("[data-humidity]");
    const cloudiness = document.querySelector("[data-cloudiness]");

    //fetch values from weather Info object and put it in UI elements
    cityName.innerText = weatherInfo?.name; //cityName mai Weather info daal dia
    countryIcon.src = `https://flagcdn.com/144x108/${weatherInfo?.sys?.country.toLowerCase()}.png`;
    desc.innerText = weatherInfo?.weather?.[0]?.description;
    weatherIcon.src = `http://openweathermap.org/img/w/${weatherInfo?.weather?.[0]?.icon}.png`;
    temp.innerText = `${weatherInfo?.main?.temp} °C`;
    windspeed.innerText = `${weatherInfo?.wind?.speed} m/s`
    humidity.innerText = `${weatherInfo?.main?.humidity}%`; //optional chaining opearator
    cloudiness.innerText = `${weatherInfo?.clouds?.all}%`;

}
//Finding coordinates latitude and longitude
function showPosition(position) {

    const userCoordinates = {
        lat: position.coords.latitude,
        lon: position.coords.longitude
    }
    // In session storage store these coordinates with user-coordinates
    sessionStorage.setItem("user-coordinates", JSON.stringify(userCoordinates)); //session storage mai save kara diya current coordinates ko
    fetchUserWeatherInfo(userCoordinates); //for displaying on UI

}

//when coordinates are not stored we find coordinates using geolocation API
function getLocation() {
    if(navigator.geolocation) {
        //using geolocation API we find out current coordinates
        navigator.geolocation.getCurrentPosition(showPosition);
    }
    else{
        //show alert for no geolocation support available
    }
}


const grantAccessButton = document.querySelector("[data-grantAccess]");
grantAccessButton.addEventListener("click", getLocation);  //if clicked my current location will be fetched


// Search Weather
//input value ke lie API call ho jaegi

//first finding input value 
const searchInput = document.querySelector("[data-searchInput]");

searchForm.addEventListener("submit", (e)=> {
    e.preventDefault();
    let cityName = searchInput.value;

    if(cityName ==""){
        return ;
    }
    else {
        fetchSearchWeatherInfo(cityName);
    }
})

//this function on basis of city name will call function
async function fetchSearchWeatherInfo(city) {
    //before making API call ,active the loader
    loadingScreen.classList.add("active");
    //remove old weather
    userInfoContainer.classList.remove("active");
    grantAccessContainer.classList.remove("active");

    try{
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
        const data = await response.json();
        loadingScreen.classList.remove("active");
        userInfoContainer.classList.add("active");
        renderWeatherInfo(data);
    }
    catch(err) {
        //HW
    }
}