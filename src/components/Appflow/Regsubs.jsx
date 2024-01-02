import { useState } from 'react';
import Header from '../Header';
import Footer from '../Footer';

function Regsubs() {
    const initialSubs = [
        "one",
        "two",
        "three",
        "four",
    ];

    const [subs, setSubs] = useState(initialSubs);
    const [selected, setSelected] = useState([]);

    let co = true;

    const handleAddToSelected = (index) => {
        const selectedItem = subs[index];
        setSubs((prevSubs) => prevSubs.filter((_, i) => i !== index));
        setSelected((prevSelected) => [...prevSelected, selectedItem]);
    };

    const handleRemoveFromSelected = (index) => {
        const removedItem = selected[index];
        setSelected((prevSelected) => prevSelected.filter((_, i) => i !== index));
        setSubs((prevSubs) => [...prevSubs, removedItem]);
    };

    return (
        <>
            <Header name="إسم المستخدم" link="/" />
            <div className="Regsubs">
                <div className="Regsubs__in">
                    <h2>تسجيل المقررات</h2>
                    <div className="Regsubs__in__two">
                        <div className='Regsubs__in__two__right'>
                            <p>اختر المقررات التي تريد تسجيلها هذا الفصل الدراسي</p>
                            <ul>
                                {subs.map((sub, index) => (
                                    <li key={index} className={co ? "one" : "two"}>
                                    {sub}
                                    {co = !co}
                                    <button onClick={() => handleAddToSelected(index)}>+</button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    <div className='Regsubs__in__two__left'>
                        <p>المقررات التي تم تسجيلها</p>
                        <ul>
                            {selected.map((sub, index) => (
                                <li key={index} className={co ? "one" : "two"}>
                                {sub}
                                {co = !co}
                                <button onClick={() => handleRemoveFromSelected(index)}>-</button>
                                </li>
                            ))}
                        </ul>
                    </div>
                    </div>
                    <div className='butts'>
                        <div className='space'></div>
                        <div className='two'>
                            <button className='btnbtn'>طباعة ورقة التسجيل</button>
                            <button className='save'>حفظ</button>
                        </div>
                    </div>
                </div>
            <Footer />
            </div>
        </>
    );
}

export default Regsubs;
