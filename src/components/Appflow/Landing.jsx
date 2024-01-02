import Header from "../Header"
import { useAuth } from '../../services/AuthContext';
import { useNavigate } from 'react-router-dom';


function Landing() {

    const { isAuthenticated } = useAuth();
    const navigate = useNavigate();


    const handleClick = () => {
        if (isAuthenticated) {
            navigate("/programs")
        } else {
            navigate("/login")
        }
    }

    return (
        <div className="Landing">
            <Header name="الدخول" link="/login"/>
            <div className="Landing__hero">
                <div className="Landing__hero__text">
                    <p>منصة التقديم الإلكتروني على  <span>الدبلومات </span>
                        للخريجين في جامعة كفر الشيخ.</p>
                    <p>مرحبًا بك في منصة التقديم الإلكتروني للدبلومات. نحن هنا لنسهِّل عليك الخطوات المطلوبة للحصول على فرصة دراسية في مجالات متنوعة .</p>
                    <button className="btnbtn" onClick={handleClick}>إختر مسارك</button>
                </div>
            </div>
        </div>
    )
}

export default Landing
