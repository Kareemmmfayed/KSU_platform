import Header from '../Header'
import Footer from '../Footer'
import Lock from '../Lock'

function Appinfo() {
    return (
        <>
            <Header name="< العودة" link="/"/>
            <div className="Appinfo">
                <div className="Appinfo__in">
                    <h2>معلومات طلب التقديم على الدبلومة</h2>
                    <Lock name="kareem" id="11" bio="kareem" draft="kareem" draftfile="kareem" idcard="kareem" pay="kareem" cert="kareem" status="kareem" why="kareem" isEmp={false}/>
                </div>
                <Footer />
            </div>
        </>
    )
}

export default Appinfo