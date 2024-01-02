import Header from '../Header'
import Footer from '../Footer'
import { Link } from 'react-router-dom'
import { useState } from 'react';
import { SignupApplicant } from '../../services/api';
import { useNavigate } from 'react-router-dom';



function Signup() {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [nationalId, setNationalId] = useState('');
    const [gender, setGender] = useState('');

    const navigate = useNavigate();

    const handleSignUp = async (e) => {
        e.preventDefault();
        
        if (await SignupApplicant(name, email, password, nationalId, gender)) {
            console.log("GOOOd");
            // Further actions if signup failed
            navigate("/");
        } else {
            console.log("BADD");
            // Further actions if signup failed
        }

    };
    
    

    return (
        <>
            <Header name="< العودة" link="/"/>
            <div className="Signup">
                <div className='Signup__inner'>
                        <div className='signup__inner__form col-lg-5 col-md-6 col-12'>
                            <h2>أنشئ حسابك</h2>
                            <form onSubmit={handleSignUp}>
                                <input type="text" placeholder='الإسم بالكامل' value={name} onChange={(e) => setName(e.target.value)}/>
                                <input type="number" placeholder= 'الرقم القومي' value={nationalId} onChange={(e) => setNationalId(e.target.value)}/>
                                <select id="colleges" name="colleges">
                                    <option disabled selected>الكلية</option>
                                    <option value="agriculture">كلية الزراعة</option>
                                    <option value="education">كلية التربية</option>
                                    <option value="veterinary-medicine">كلية الطب البيطري</option>
                                    <option value="commerce">كلية التجارة</option>
                                    <option value="engineering">كلية الهندسة</option>
                                    <option value="special-education">كلية التربية النوعية</option>
                                    <option value="arts">كلية الأداب</option>
                                    <option value="physical-education">كلية التربية الرياضية</option>
                                    <option value="science">كلية العلوم</option>
                                    <option value="pharmacy">كلية الصيدلة والتصنيع الدوائي</option>
                                    <option value="medicine">كلية الطب</option>
                                    <option value="physical-therapy">كلية العلاج الطبيعي</option>
                                    <option value="nursing">كلية التمريض</option>
                                    <option value="fisheries">علوم الثروة السمكية والمصايد</option>
                                    <option value="dentistry">كلية طب الفم والأسنان</option>
                                    <option value="computing">كلية الحاسبات والمعلومات</option>
                                    <option value="languages">كلية الألسن</option>
                                    <option value="nano-technology">معهد علوم وتكنولوجيا النانو</option>
                                    <option value="drug-discovery">معهد اكتشاف وتطوير الدواء</option>
                                    <option value="nursing-institute">المعهد الفني للتمريض</option>
                                    <option value="law">كلية الحقوق</option>
                                    <option value="artificial-intelligence">كلية الذكاء الاصطناعي</option>
                                </select>
                                <div className='gender'>
                                    <label htmlFor='gender'>: النوع</label>
                                    <div className='male'>
                                        <label htmlFor='male'>ذكر</label>
                                        <input type="radio" id="male" name="gender" value="male" checked={gender === 'male'} onChange={(e) => setGender(e.target.value)}/>
                                    </div>
                                    <div className='female'>
                                        <label htmlFor='female'>أنثي</label>
                                        <input type="radio" id="female" name="gender" value="female" checked={gender === 'female'} onChange={(e) => setGender(e.target.value)}/>
                                    </div>
                                </div>
                                <input type="email" placeholder='البريد الإلكتروني' value={email} onChange={(e) => setEmail(e.target.value)}/>
                                <input type="password" placeholder='كلمة السر' value={password} onChange={(e) => setPassword(e.target.value)}/>
                                <input type="password" placeholder='تأكيد كلمة المرور'/>
                                <div className='sub'>
                                <button type='submit' className='btnbtn'> الدخول </button>
                                <div>
                                    لديك حساب بالفعل ؟ <Link to='/login'>سجل دخولك</Link>
                                </div>
                            </div>
                            </form>
                        </div>
                    </div>
                <Footer/>
            </div>
        </>
    )
}

export default Signup