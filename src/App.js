import React, { Component } from "react";
import moment from "moment";
import "moment-timezone";
//import tz from "zipcode-to-timezone";
import "./App.css";

class App extends Component {
  state = {};
  getTime = () => {
    //const zone = tz.lookup(this.state.zip);
    //const zone = timezone.lookup(this.state.zip);
    //const zone = this.state.timezone / 60;
    //console.log(zone);
    let time = moment()
      .utcOffset(this.state.timezone / 60)
      .format("YYYY-MM-DD hh:mm a ");

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
        `,US&units=imperial&appid=` +
        process.env.REACT_APP_WEATHER_API_KEY
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
            zip: data.zipInput,
            temperature: Math.round(data.main.temp) + "°F",
            city: data.name,
            timezone: data.timezone,
            description: data.weather[0].description,
            icon: data.weather[0].icon,
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
        <div class="container">
          <h2>WEATHER APP</h2>

          <div id="header">
            <input
              type="text"
              placeholder="Enter ZipCode Here"
              id="zipcode"
            ></input>
            <button id="btn" onClick={this.getWeather}>
              Go!
            </button>
          </div>

          <div id="main">
            <section class="location">
              <div id="city">{this.state.city}</div>
              <div class="time">{this.state.time}</div>
            </section>
            <div class="current">
              <div id="temp">
                {this.state.temperature}
                <span></span>
              </div>
              <div id="desc">{this.state.description}</div>
              <img
                src={`http://openweathermap.org/img/w/${this.state.icon}.png`}
                alt=""
              ></img>
            </div>
          </div>
        </div>
      </>
      //   <div  class="container">
      //   <h2>WEATHER APP</h2>
      //  <!-- container for Moment.js output -->
      //     <!----- <div id="displayMoment"></div>-->
      //  <header>
      //      <input id="zipinpt" type="text" placeholder="Enter ZipCode"></INput>
      //      <button id="btn" >Go!</button>
      //  </header>
      //  <main>
      //      <section class="location">
      //          <div id="city"></div>
      //          <div class="time"></div>
      //      </section>
      //      <div class=current>
      //          <div id="temp"><span></span></div>
      //          <div id="desc"></div>
      //          <div id="hi-low"></div>
      //          <div id="icon">

      //          </div>

      //      </div>
      //  </main>
      //</div>
    );
  }
}

export default App;
