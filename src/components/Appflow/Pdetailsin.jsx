/* eslint-disable react/prop-types */
import { useNavigate } from 'react-router-dom';

function Pdetailsin(props) {

    const navigate = useNavigate();

    const toApp = () => {
        navigate("/application");
    }

    const toData = () => {
        navigate("/appinfo")
    }

    return (
        <div className="Pdetails__in">
            <h2>دبلومة ادارة الاعمال</h2>
            <div className="Pdetails__in__about">
                <h4>عن الدبلومة</h4>
                <p>دبلومة إدارة الأعمال الدولية هي بوابتك نحو فهم عميق للعمليات التجارية العالمية وتطلعات السوق الدولية المتنوعة. يهدف هذا البرنامج إلى تزويدك بالمعرفة والمهارات الأساسية التي تؤهلك للنجاح في بيئة الأعمال العالمية المتغيرة. ستستفيد من منهجية تعليمية حديثة ومندمجة تجمع بين النظريات الأكاديمية والتطبيق العملي.</p>
            </div>
            <div className="Pdetails__in__req">
                <h4>متطلبات القبول</h4>
                <ul>
                    <li>حاصل على شهادة البكالوريوس في أي تخصص ذي صلة.</li>
                    <li>سجل أكاديمي جيد.</li>
                    <li>إجادة اللغة الإنجليزية مثبتة من خلال اختبارات معترف بها (TOEFL أو IELTS).</li>
                    <li>رسالة توصية من أستاذ سابق أو مشرف أكاديمي.</li>
                    <li>مقابلة شخصية لتقييم المهارات والمؤهلات.</li>
                </ul>
            </div>
            <div className="Pdetails__in__pay">
                <h4>رسوم البرنامج</h4>
                <ul>
                    <li>رسوم التقديم: 500 جنيه مصري (غير قابلة للاسترداد).</li>
                    <li>رسوم الدراسة: 15,000 جنيه مصري لكل فصل دراسي.</li>
                    <li>رسوم الكتب والمواد: تتفاوت حسب المقررات والمتطلبات.</li>
                </ul>
            </div>
            <div className="Pdetails__in__time">
                <h4>مدة البرنامج</h4>
                <ul>
                    <li>عامين دراسيين </li>
                    <li>أربعة فصول دراسية.</li>
                </ul>
            </div>
            { props.Signed ? (
                <button className="btnbtn" onClick={toApp}>سجل الأن</button>
            ) : (
                <button className="btnbtn" onClick={toData}>معلومات طلبك</button>
            )}
        </div>
    )
}

export default Pdetailsin