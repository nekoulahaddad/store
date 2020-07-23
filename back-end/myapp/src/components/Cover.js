import React , {Component} from 'react';
import Pic from '../cover/pic.jpg';
import Pic1 from '../cover/pic1.jpg';
import Pic2 from '../cover/pic2.jpg';
import {Container,UncontrolledCarousel} from 'reactstrap';


const items = [
  {
    src: Pic,
    //altText: 'Slide 1',
    //caption: 'Slide 1',
    //header: 'Slide 1 Header',
    key: '1'
  },
  {
    src: Pic1,
    /*altText: 'Slide 2',
    caption: 'Slide 2',
    header: 'Slide 2 Header',*/
    key: '2'
  },
  {
    src: Pic2,
    /*altText: 'Slide 3',
    caption: 'Slide 3',
    header: 'Slide 3 Header',*/
    key: '3'
  }
];

const Cover = () => <UncontrolledCarousel items={items} />;

export default Cover;

