import Header from '../Header'
import Footer from '../Footer'
import Lock from '../Lock'

function Appinfoemp() {
    return (
        <>
            <Header name="< العودة" link="/"/>
            <div className="Appemp">
                <div className="Appemp__in">
                    <h2>بيانات الطالب</h2>
                    <Lock name="kareem" id="11" bio="kareem" draft="kareem" draftfile="kareem" idcard="kareem" pay="kareem" cert="kareem" status="kareem" isEmp={true}/>
                </div>
                <Footer />
            </div>
        </>
    )
}

export default Appinfoemp