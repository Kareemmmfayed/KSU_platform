import Header from '../Header'
import Footer from '../Footer'

function AccountInfo() {
    return (
        <>
            <Header name="< العودة" link="/"/>
            <div className="Account">
                <div className='Account__inner'>
                        <div className='Account__inner__form col-lg-5 col-md-6 col-12'>
                            <h2>معلومات الحساب</h2>
                            <form>
                                <input type="text" placeholder='الإسم بالكامل'/>
                                <input type="number" placeholder= 'الرقم القومي' value={11111111} disabled/>
                                <select id="colleges" name="colleges">
                                    <option disabled>الكلية</option>
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
                                        <label>ذكر</label>
                                        <input type="radio" id="male" name="gender" value="male" checked disabled/>
                                    </div>
                                    <div className='female'>
                                        <label>أنثي</label>
                                        <input type="radio" id="female" name="gender" value="female" disabled/>
                                    </div>
                                </div>
                                <input type="email" placeholder='البريد الإلكتروني' value={111}/>
                                <input type="password" placeholder='كلمة السر' value={111}/>
                                <input type="password" placeholder='تأكيد كلمة المرور' disabled/>
                                <div className='sub'>
                                    <button type='submit' className='btnbtn'> حفظ</button>
                                    <button className='delete'>حذف الحساب</button>
                                </div>
                            </form>
                        </div>
                    </div>
                <Footer/>
            </div>
        </>

    )
}

export default AccountInfo