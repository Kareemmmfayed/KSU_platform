import Header from '../Header'
import Footer from '../Footer'
import Diploma from '../Diploma'

function Mydiplomas() {
    const diplomas = [["دبلومة كذا", "كلية التجارة", "1/9/2023 - 30/9/2023", "مقبول"],
        ["دبلومة كذا", "كلية التجارة", "1/9/2023 - 30/9/2023", "مقبول"],
        ["دبلومة كذا", "كلية التجارة", "1/9/2023 - 30/9/2023", "مقبول"],
    ]
    return (
        <>
            <Header name="< العودة" link="/"/>
            <div className="Mydiplomas">
                <Diploma diplomas={diplomas} show={true}/>
                <Footer/>
            </div>
        </>


    )
}

export default Mydiplomas