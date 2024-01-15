import React from 'react'
import '../css/About.css'
import aboutimg from '../images/about.jpg'

function About() {
    return (
        <div className='about-box'>
            <h2 className="about-title">About the Library</h2>
            <div className="about-data">
                <div className="about-img">
                    <img src={aboutimg} alt="img" />
                </div>
                <div>
                    <p className="about-text">
                    Discover a world of knowledge and imagination at our library. Dive into a vast collection of books that span various genres, from classic literature to contemporary fiction, non-fiction, and everything in between. Our library is a haven for book lovers, providing a curated selection of literary treasures for readers of all ages.<br/>
                        <br/>
                        Whether you're seeking adventure, romance, mystery, or knowledge, our library has something for everyone. Immerse yourself in captivating stories, learn from insightful non-fiction works, and explore the wonders of different worlds through our carefully curated bookshelves.<br/>
                        <br/>
                        Our library is not just a collection of books; it's a hub for lifelong learning. Discover educational resources, explore diverse perspectives, and embark on a journey of continuous intellectual growth. Attend book clubs, author events, and participate in enriching activities that foster a vibrant reading community.<br/>
                        <br/>
                        Your suggestions for improvement are always welcome!
                    </p>
                </div>
            </div>
        </div>
    )
}

export default About
