import React from 'react';
import { UncontrolledCarousel } from 'reactstrap';
const image1 = require('../../assets/img/1.png');
const image2 = require('../../assets/img/3.jpg');

const caption1 =<> <h1>SYMPTOMS</h1><br/><h5>Gives you accurate evaluation of your health</h5></>;
const caption2 =<> <h1>CHECK-UP</h1><br/><h5>Intelligent technology that you can trust</h5></>;
const header1=<small></small>;

const items = [
  {
    src: [image1],
    altText: 'INFEMEDICA',
    caption: [caption1],
    header: [header1],
    key: '1'
  },
  {
    src: [image2],
    altText: 'INFEMEDICA',
    caption: [caption2],
    header: [header1],
    key: '2'
  }  
];

const Slide = () => <UncontrolledCarousel items={items} />;

export default Slide;