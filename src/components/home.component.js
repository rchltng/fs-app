import React, { Component } from "react";
import Carousel from 'react-bootstrap/Carousel'


export default class Home extends Component {
  render() {
    return (
      <div className = "home"> 
      <p className = "welcome">  Figure Skating </p>
      <p className = "intro">
      Figure skating is the first winter sport that was included in the Olympic Games, with its first appearance in the 1908 London Olympics. Although there are other disciplines within figure skating, the four main disciplines which are recognized by the International Olympic Committee and governed by the International Skating Union are: men’s singles, ladies’ singles, pairs, and ice dance. 
      </p>
      <Carousel>
        <Carousel.Item>
          <img
            className="d-block"
            src="/carousel/1.jpg"
            alt="1"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block" src="/carousel/2.jpeg" alt="2" />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block" src="/carousel/3.jpeg" alt="3" />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block" src="/carousel/4.jpeg" alt="4" />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block" src="/carousel/5.jpeg" alt="5" />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block" src="/carousel/6.jpeg" alt="6" />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block" src="/carousel/7.jpeg" alt="7" />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block" src="/carousel/8.jpeg" alt="8" />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block" src="/carousel/9.jpeg" alt="9" />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block" src="/carousel/10.jpeg" alt="10" />
        </Carousel.Item>
      </Carousel>
      <div className = "bottom"></div>
      </div>
    );
  }
}