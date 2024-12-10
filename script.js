function clock(){
    let date=new Date();
    console.log(date);
    let dd=date.getDate();
    let mo=date.getMonth();
    let yy=date.getFullYear();
    let hh=date.getHours();
    let mm=date.getMinutes();
    let ss=date.getSeconds();
    let dy=date.getDay();
    let fulMon=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
    let fulDays=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    mo=fulMon[mo];
    dy=fulDays[dy];
    console.log(mo);
    console.log(dy);
    let am_pm="Am";
    if(hh>=12){
        am_pm="Pm";
        if(hh>12){
            hh-=12;
        }
    }
    if(hh==0){
        hh=12;
    }
    if(hh<10){
        hh=`0${hh}`;
    }
    if(mm<10){
        mm=`0${mm}`;
    }
    if(ss<10){
        ss=`0${ss}`;
    }
    console.log(dd,mo,yy);
    console.log(hh,mm,ss);
    console.log(dy);
    document.getElementById("time").innerHTML=`${hh}:${mm}:${ss} ${am_pm}`
    document.getElementById("date").innerHTML=`${dd}-${mo}-${yy}`
    document.getElementById("day").innerHTML=`${dy}`
    
}
setInterval(clock,1000);

function toggleTheme() {
    const body = document.body;
    const sunIcon = document.getElementById('sun-icon');
    const moonIcon = document.getElementById('moon-icon');

    if (body.classList.contains('day-theme')) {
        body.classList.remove('day-theme');
        body.classList.add('night-theme');
        sunIcon.style.display = 'none';
        moonIcon.style.display = 'inline-block';
    } else {
        body.classList.remove('night-theme');
        body.classList.add('day-theme');
        sunIcon.style.display = 'inline-block';
        moonIcon.style.display = 'none';
    }
}

async function weather(){
   
//  const apiKey = add your api key
const city=document.getElementById("city").value
const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&APPID=${apiKey}`;

try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.cod === 200) {
        const temperature = data.main.temp;
            const weatherDescription = data.weather[0].description;
            const humidity = data.main.humidity;
            const windSpeed = data.wind.speed;
            const sunriseUnix = data.sys.sunrise;  
            const sunsetUnix = data.sys.sunset;  

            const sunrise = new Date(sunriseUnix * 1000);  
            const sunset = new Date(sunsetUnix * 1000);    

            const formatTime = (hour, minute) => {
                const period = hour >= 12 ? 'PM' : 'AM';
                const formattedHour = hour > 12 ? hour - 12 : hour; 
                const formattedMinute = minute < 10 ? `0${minute}` : minute;  
                return `${formattedHour}:${formattedMinute} ${period}`;
            };

            const formattedSunrise = formatTime(sunrise.getHours(), sunrise.getMinutes());
            const formattedSunset = formatTime(sunset.getHours(), sunset.getMinutes());

            document.getElementById('temperature').innerHTML = `${temperature}°C`;
            document.getElementById('weather-description').innerHTML = `${weatherDescription}`;
            document.getElementById('humidity').textContent = `${humidity}%`;
            document.getElementById('wind-speed').textContent = `${windSpeed} m/s`;
            document.getElementById('sunrise').innerHTML = `${formattedSunrise}`;
            document.getElementById('sunset').innerHTML = `${formattedSunset}`;
           
  }else {
    
    document.getElementById("weather").innerHTML = `<p>${data.message}</p>`;
   }
}catch(error) {
    document.getElementById("weather").innerHTML = `<p>Error fetching weather data. Please try again later.</p>`;
  }
}

