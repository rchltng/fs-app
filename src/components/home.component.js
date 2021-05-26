import React, { Component } from "react";

export default class Home extends Component {
  render() {
    return (
      <div className="home">

        <div className="vid">
          <div className="video-overlay"></div>
          <iframe title="home-background" frameBorder="0" height="100%" width="100%"
            src="https://www.youtube-nocookie.com/embed/7hgI1F2pLy4?playlist=7hgI1F2pLy4&loop=1;&end=203&showinfo=0&autohide=1&autoplay=1&mute=1&controls=0&rel=0">
          </iframe>
          <div className="homePage">
            <p className="welcome">  Figure Skating </p>
            <p className="intro">
              Figure skating is the first winter sport that was included in the Olympic Games, with its first appearance in the 1908 London Olympics. Although there are other disciplines within figure skating, the four main disciplines which are recognized by the International Olympic Committee and governed by the International Skating Union are: men’s singles, ladies’ singles, pairs, and ice dance.
      </p>
          </div>

        </div>
      </div>
    );
  }
}