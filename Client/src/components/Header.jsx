import logo from '../assets/logo.png'

function Header() {
    return (
        <div className="Header">
            <div className="Header__right">
                <div className="Header__right__logo">
                    <img src={logo} alt="logo" />
                </div>
                <div className="Header__right__text">
                    <h3>التقديم علي الدبلومات</h3>
                    <p>جامعة كفر الشيخ</p>
                </div>
            </div>
            <div className="Header__left">
                <button className='btnbtn'>الدخول</button>
            </div>
        </div>
    )
}

export default Header