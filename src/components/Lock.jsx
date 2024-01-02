/* eslint-disable react/prop-types */
import lock from '../assets/lock.png'

function Lock(props) {
    return (
        <div className="Lock">
            <form>
                <div>
                    <div>
                        <label htmlFor="name"> : الإسم بالكامل</label>
                    </div>
                    <input type="text" id="name" value={props.name} disabled/>
                    <img src={lock} alt="lock" />
                </div>
                <div>
                    <div>
                        <label htmlFor="nationalid"> : الرقم القومي</label>
                    </div>
                    <input type="number" id="nationalid" value={props.id} disabled/>
                    <img src={lock} alt="lock" />
                </div>
                <div>
                    <div>
                        <label htmlFor="bio"> : السيرة الذاتية</label>
                    </div>
                    <input type="input" id="bio" value={props.bio} disabled/>
                    <img src={lock} alt="lock" />
                </div>
                <div>
                    <div>
                        <label htmlFor="draft"> : الموقف من التجنيد</label>
                    </div>
                    <input type="text" id="draft" value={props.draft} disabled/>
                    <img src={lock} alt="lock" />
                </div>
                <div>
                    <div>
                        <label htmlFor="file"> : بيان الموقف من التجنيد</label>
                    </div>
                    <input type="text" id="file" value={props.draftfile} disabled/>
                    <img src={lock} alt="lock" />
                </div>
                <div>
                    <div>
                        <label htmlFor="idcard"> : البطاقة الشخصية</label>
                    </div>
                    <input type="text" id="idcard" value={props.idcard} disabled/>
                    <img src={lock} alt="lock" />
                </div>
                <div>
                    <div>
                        <label htmlFor="rec"> : إيصال الدفع</label>
                    </div>
                    { props.isEmp ? (
                        <input type="text" id="rec" value={props.pay} />
                    ) : (
                        <>
                            <input type="text" id="rec" value={props.pay} disabled/>
                            <img src={lock} alt="lock" />
                        </>
                    )}
                </div>
                <div>
                    <div>
                        <label htmlFor="cert"> : شهادة البكالوريوس</label>
                    </div>
                    <input type="text" id="cert" value={props.cert} disabled/>
                    <img src={lock} alt="lock" />
                </div>
                <div>
                    <div>
                        <label htmlFor="status"> : حالة الطلب</label>
                    </div>
                    {props.isEmp ? (
                        <select name="status" id="status">
                            <option value="">مقبول</option>
                            <option value="">مرفوض</option>
                            <option value="">إنتظار</option>
                        </select>
                    ) : (
                        <>
                            <input type="text" id="status" value={props.status} disabled/>
                            <img src={lock} alt="lock" />
                        </>
                    )}
                </div>
                <div>
                    <div>
                        <label htmlFor="why"> : السبب</label>
                    </div>

                    {props.isEmp ? (
                        <textarea type="text" id="why" />
                    ) : (
                        <textarea type="text" id="why" value={props.why} disabled />
                    )}

                </div>
            </form>
        </div>
    )
}

export default Lock