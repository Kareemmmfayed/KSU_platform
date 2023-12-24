import Cards from './Cards'
import pro from '../../assets/landing.png'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { useState, useEffect } from 'react'

function Theslider() {

    const [num, setNum] = useState(4);

    const handleResize = () => {
        if (window.innerWidth > 1200) {
        setNum(4);
    } else if (window.innerWidth <= 1200 && window.innerWidth > 1000) {
        setNum(3);
    } else if (window.innerWidth <= 1000 && window.innerWidth > 700) {
        setNum(2);
    } else if (window.innerWidth <= 700) {
        setNum(1);
    }
    }

    useEffect(() => {
        handleResize();

        window.addEventListener('resize', handleResize);

    return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);


    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: num,
        slidesToScroll: 1
    };
    return (
        <div className="Theslider">
            <h2>فريق التطوير</h2>
            <p>نجاح مشروعنا لم يكن مجرد تحقيق أهدافنا، بل كان أيضًا عملية تعلم وتطوير لأعضاء الفريق، حيث تمكنا من تحسين مهاراتنا وتوجيهها نحو الابتكار.</p>
            <div className='m-3/4 m-auto'>
                <div className="mt-20 cara">
                    <Slider {...settings}>
                        <Cards name="كريم" title="front-end" info="Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptatem, fugit. Eaque mollitia impedit, quasi nostrum similique facilis deleniti ipsum dolorum commodi temporibus, totam placeat? Aspernatur maxime commodi neque cumque totam!" img={pro}/>
                        <Cards name="كريم" title="front-end" info="Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptatem, fugit. Eaque mollitia impedit, quasi nostrum similique facilis deleniti ipsum dolorum commodi temporibus, totam placeat? Aspernatur maxime commodi neque cumque totam!" img={pro}/>
                        <Cards name="كريم" title="front-end" info="Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptatem, fugit. Eaque mollitia impedit, quasi nostrum similique facilis deleniti ipsum dolorum commodi temporibus, totam placeat? Aspernatur maxime commodi neque cumque totam!" img={pro}/>
                        <Cards name="كريم" title="front-end" info="Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptatem, fugit. Eaque mollitia impedit, quasi nostrum similique facilis deleniti ipsum dolorum commodi temporibus, totam placeat? Aspernatur maxime commodi neque cumque totam!" img={pro}/>
                        <Cards name="كريم" title="front-end" info="Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptatem, fugit. Eaque mollitia impedit, quasi nostrum similique facilis deleniti ipsum dolorum commodi temporibus, totam placeat? Aspernatur maxime commodi neque cumque totam!" img={pro}/>
                        <Cards name="كريم" title="front-end" info="Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptatem, fugit. Eaque mollitia impedit, quasi nostrum similique facilis deleniti ipsum dolorum commodi temporibus, totam placeat? Aspernatur maxime commodi neque cumque totam!" img={pro}/>
                    </Slider>
                </div>
            </div>
        </div>

    )
}

export default Theslider