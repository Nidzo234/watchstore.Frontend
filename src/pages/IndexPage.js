import { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import myImage from '../Images/Pozadina1.jpg'
import logo from '../logo.svg'
import './IndexPage.css'
export default function IndexPage (){
       

    return(
        <>
        <Carousel className='w-100' style={{"position":"relative"}}>
        
            <Carousel.Item>
                <img className='startImages'  src={myImage} text="First slide" />
                <Carousel.Caption>
                <h3>First slide label</h3>
                <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img className='startImages' src='https://img.freepik.com/free-photo/luxury-wristwatch-with-accurate-minute-hand-detail-generated-by-ai_188544-27738.jpg' text="First slide" />
                <Carousel.Caption>
                <h3>Second slide label</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img className='startImages' src='https://img.freepik.com/free-photo/luxury-wristwatch-with-accurate-minute-hand-detail-generated-by-ai_188544-27738.jpg' text="First slide" />
                <Carousel.Caption>
                <h3>Third slide label</h3>
                <p>
                    Praesent commodo cursus magna, vel scelerisque nisl consectetur.
                </p>
                </Carousel.Caption>
            </Carousel.Item>
        </Carousel>

        <div style={{"height": "500px", "background-color": "red"}}>

        </div>
        </>
    )
}