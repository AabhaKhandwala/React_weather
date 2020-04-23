import React, { Component } from "react";
import moment from "moment";

class App extends Component {
  state = {};
  getTime = () => {
    let time = moment().format("llll");
    console.log(time);

    this.setState({
      time: time,
    });
  };

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
          this.getTime();
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
          <p>{this.state.time}</p>
        </div>
      </>
    );
  }
}

export default App;
