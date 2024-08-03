const cityname=document.querySelector(".weather-city");
const dtt=document.querySelector(".weather-date--time");
const w_forecast=document.querySelector(".weather-forecast");
const w_icon=document.querySelector(".weather-icon");
const w_temp=document.querySelector(".weather-temperature");
const w_min=document.querySelector(".weather-min");
const w_max=document.querySelector(".weather-max");
const f_temp=document.querySelector(".feel-like--temp");
const humid=document.querySelector(".feel-like--humid");
const Wind=document.querySelector(".feel-like--wind");
const Pressure=document.querySelector(".feel-like--pressure");
const w_Search=document.querySelector(".weather-search");
 const countryCode=(code)=>
{
    return new Intl.DisplayNames([code], { type: "region" }).of(code);
}
const getDateTime = (dt) => {
    const curDate = new Date(dt * 1000); // Convert seconds to milliseconds
    console.log(curDate);
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    };
  
    const formatter = new Intl.DateTimeFormat("en-US", options);
    console.log(formatter);
    return formatter.format(curDate);
  };
  let city='london';
  w_Search.addEventListener("submit",(e)=>
{
    e.preventDefault();
    let cityName=document.querySelector(".city-name");
    city=cityName.value;
    getWeatherData();
    cityName.value="";
});
  

const getWeatherData=async()=>
    {
        const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=`;
        
        try{
            const res= await fetch(weatherUrl);
            const data= await res.json();
            const {main,name,weather,wind,sys,coord}=data;
            cityname.innerHTML=`${name} , ${countryCode(sys.country)}`;
            const timeUrl=`https://api.timezonedb.com/v2.1/get-time-zone?key=&format=json&by=position&lat=${coord.lat}&lng=${coord.lon}`;
            const res1= await fetch(timeUrl);
            const data1= await res1.json();
            try{
            dtt.innerHTML=getDateTime(data1.timestamp-19800); //getting current time of city....
            }
            catch(e){
               console.log(e);
            }
            w_forecast.innerText=weather[0].main;
            w_icon
            w_temp.innerHTML=`${Math.round(main.temp-273)}&#176C`;
            w_min.innerHTML=`Min: ${main.temp_min.toFixed()-273}&#176C`;
            w_max.innerHTML=`Max: ${main.temp_max.toFixed()-273}&#176C`;
            f_temp.innerHTML=`${main.feels_like.toFixed()-273}&#176C`;
            humid.innerText=main.humidity+'%';
            Wind.innerText=wind.speed+' m/s';
            Pressure.innerText=main.pressure+' hPa';
            w_icon.innerHTML = `<img src="http://openweathermap.org/img/wn/${weather[0].icon}@4x.png" />`;
        }
        catch(error)
        {
            console.log(error);
        }
    }

    document.body.addEventListener("load", getWeatherData());

