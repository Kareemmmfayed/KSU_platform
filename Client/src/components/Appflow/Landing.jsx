import Header from "../Header"

function Landing() {

    return (
        <div className="Landing">
            <Header/>
            <div className="Landing__hero">
                <div className="Landing__hero__text">
                    <p>منصة التقديم الإلكتروني على  <span>الدبلومات </span>
                        للخريجين في جامعة كفر الشيخ.</p>
                    <p>مرحبًا بك في منصة التقديم الإلكتروني للدبلومات. نحن هنا لنسهِّل عليك الخطوات المطلوبة للحصول على فرصة دراسية في مجالات متنوعة .</p>
                    <button className="btnbtn">إختر مسارك</button>
                </div>
            </div>
        </div>
    )
}

export default Landing
