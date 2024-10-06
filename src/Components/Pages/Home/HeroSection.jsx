import React from 'react'
import 'style.css'
function HeroSection() {
    const heroData = [
        {
            title: 'Hero title goes here',
            desc: 'Hero desc goes here',
            image: 'hatgpt.com/?model=gpt-4o'
        },
        {
            title: 'Hero title goes here',
            desc: 'Hero desc goes here',
            image: 'hatgpt.com/?model=gpt-4o'
        },
        {
            title: 'Hero title goes here',
            desc: 'Hero desc goes here',
            image: 'hatgpt.com/?model=gpt-4o'
        },
        {
            title: 'Hero title goes here',
            desc: 'Hero desc goes here',
            image: 'hatgpt.com/?model=gpt-4o'
        }
    ]
  return (
    <>
      <div className='container'>
        {
            heroData.map((hero)=> 
                <div id="carouselExampleSlidesOnly" className="carousel slide" data-bs-ride="carousel">
                    <div className="carousel-inner">
                        <div className="carousel-item active">
                            <img src={hero.image} className="d-block w-100" alt="imgHeader" />
                            <div className="carousel-caption d-none d-md-block ">

                                <h1 style="font-size: 100px;">{hero.title}</h1>
                                <p style="font-family: gloss And bloom ;">{hero.desc}</p>
                            </div>
                        </div>

                    </div>
                </div>
            )
        }
      </div>
    </>
  )
}

export default HeroSection
