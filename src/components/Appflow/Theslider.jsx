import Cards from './Cards'
import pro from '../../assets/landing.png'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { useState, useEffect } from 'react'
import linked from '../../assets/in.png';
import github from '../../assets/github.png';
import be from '../../assets/be.png';
import chain from '../../assets/chain.png';

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
                        <Cards name="كريم فايد" title="Front-end Developer" info="Front-End developer with react js." img={pro} flogo={linked} flink="https://www.linkedin.com/in/kareem-fayed2002fe/" llogo={github} llink="https://github.com/Kareemmmfayed"/>
                        <Cards name="أحمد الصعيدي" title="Back-end Developer" info="طالب في الفرقة الثانية كلية الحاسبات والمعلومات مطور مواقع الويب باستخدام ExpressJS, NestJS." img={pro} flogo={linked} flink="" llogo={github} llink=""/>
                        <Cards name="سلمي دراز" title="UI/UX Designer" info="طالبة في الفرقة الرابعة كلية الحاسبات والمعلومات قسم نظم المعلومات. تعمل ك UI UX Designer في Websitable LLP ، ومستشارًا للإبداع في المعهد التقني بشيكاجو IIT." img={pro} flogo={linked} flink="" llogo={be} llink=""/>
                        <Cards name="محمد ياسر" title="Back-End Developer / DevOps" info="خريج كلية الحاسبات والمعلومات قسم نظم المعلومات." img={pro} flogo={chain} llogo={github} />
                        <Cards name="تسنيم بهاء" title="UI/UX Designer" info="طالبة في الفرقة الرابعة كلية الحاسبات والمعلومات قسم نظم المعلومات." img={pro} flogo={be} />
                        <Cards name="هبة" title="UI/UX Designer" info="خريجة كلية الحاسبات والمعلومات قسم علوم الحاسب." img={pro} flogo={be}/>
                    </Slider>
                </div>
            </div>
        </div>

    )
}

export default Theslider