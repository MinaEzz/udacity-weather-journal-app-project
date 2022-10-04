/* Global Variables */
const zipInput = document.getElementById("zip");
const feelInput = document.getElementById("feelings");
const generateBtn = document.getElementById("generate");
const date = document.getElementById("date");
const name = document.getElementById("name");
const temp = document.getElementById("temp");
const content = document.getElementById("content");

//https://api.openweathermap.org/data/2.5/weather?zip={zip code},&appid={API key}&units=imperial

// api and apiKey for openweathermap :
const api = "https://api.openweathermap.org/data/2.5/weather?zip=";
const apiKey = "&appid=677ce07ab39d19109ff8e41beee14797&units=imperial";
// imperial means that the temperature unit will be in fahrenheit

// Create a new date instance dynamically with JS
let d = new Date();
// let newDate = d.getMonth() + "." + d.getDate() + "." + d.getFullYear();
let newDate = d.toLocaleString("en-US", {
  month: "long",
  day: "numeric",
  year: "numeric",
});

// add click event on the generate button :
generateBtn.addEventListener("click", generateFunction);

// generateFunction :
function generateFunction(event) {
  event.preventDefault();
  const zipValue = zipInput.value;
  const feelValue = feelInput.value;
  const uri = `${api}${zipValue}${apiKey}`;
  //   console.log(newDate);

  getWeather(uri)
    .then(function (data) {
      if (data) {
        postData("http://localhost:4000/add", {
          date: newDate,
          name: data.name,
          temperature: data.main.temp,
          state: data.weather[0].description,
          userFeel: feelValue,
        });
      }
    })
    .then(function (data) {
      updateUI();
    });
}

// function to GET weather data using async and await :
const getWeather = async function (uri) {
  try {
    const result = await fetch(uri);
    const data = await result.json();
    if (data.cod == 200) {
      console.log(data);
      return data;
    } else {
      //   console.log(`${data.cod}  ${data.message}`);
      alert(`${data.cod}  ${data.message}`);
    }
  } catch (error) {
    console.log(error);
  }
};

// Function to POST data :
const postData = async (url = "", data = {}) => {
  const req = await fetch(url, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  try {
    const data = await req.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

// function to update UI :
const updateUI = async () => {
  const req = await fetch("http://localhost:4000/all");
  try {
    const data = await req.json();
    // i will display DATE , NAME , TEMPERATURE AND STATE, FEELINGS :
    date.innerHTML = `Date : ${data.date}`;
    name.innerHTML = `City Name : ${data.name}`;
    temp.innerHTML = `Temperature In Fahrenheit: ${data.temperature} and Weather State is : ${data.state} `;
    content.innerHTML = `User Feelings : ${data.userFeel}`;
  } catch (error) {
    console.log("error", error);
  }
};
