import React, { Component } from "react";

class App extends Component {
  state = {};

  getWeather = () => {
    let zipInput = document.getElementById("zipcode").value;
    console.log(zipInput);
    let apiKey = process.env.REACT_APP_WEATHER_API_KEY;
    console.log(apiKey);
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=` +
        zipInput +
        `,US&units=imperial&appid=4890ec8c1a44083580937d9c9371b03a`
      //process.env.REACT_APP_WEATHER_API_KEY
    )
      .then((response) => {
        if (response.status !== 200) {
          console.log(
            "Looks like there was a problem. Status Code: " + response.status
          );
          return;
        }
        response.json().then((data) => {
          console.log(data);
          this.setState({
            temperature: data.main.temp,
            city: data.name,
          });
        });
      })
      .catch((err) => {
        console.log("Fetch Error :-S", err);
      });
  };

  render() {
    return (
      <>
        <div>
          <input
            type="text"
            placeholder="Enter ZipCode Here"
            id="zipcode"
          ></input>
          <button onClick={this.getWeather}>Go!</button>
        </div>
        <div>
          <p>{this.state.temperature}</p>
          <p>{this.state.city}</p>
        </div>
      </>
    );
  }
}

export default App;
