import Header from '../Header';
import Footer from '../Footer';
import plus from '../../assets/plus.png'
import { useNavigate } from 'react-router-dom';

function Eprogram() {

    const navigate = useNavigate();

    const toApplicants = () => {
        navigate("/applicants");
    }

    return (
        <>  
            <Header name="< العودة" link="/"/>
            <div className="Eprogram">
                <div className="Eprogram__in">
                    <h2>دبلومة ادارة الاعمال</h2>
                    <div className="Eprogram__in__about">
                        <h4>عن الدبلومة</h4>
                        <p>دبلومة إدارة الأعمال الدولية هي بوابتك نحو فهم عميق للعمليات التجارية العالمية وتطلعات السوق الدولية المتنوعة. يهدف هذا البرنامج إلى تزويدك بالمعرفة والمهارات الأساسية التي تؤهلك للنجاح في بيئة الأعمال العالمية المتغيرة. ستستفيد من منهجية تعليمية حديثة ومندمجة تجمع بين النظريات الأكاديمية والتطبيق العملي.</p>
                    </div>
                    <div className='Eprogram__in__add'>
                        <button>
                            <img src={plus} alt="plus" />
                            <p>العام الدراسي الاول</p>
                        </button>
                        <button>
                            <img src={plus} alt="plus" />
                            <p>العام الدراسي الثاني</p>
                        </button>
                    </div>
                    <button className='btnbtn' onClick={toApplicants}>الطلبة المتقدمون</button>
                </div>
                <Footer/>
            </div>
        </>
    )
}

export default Eprogram