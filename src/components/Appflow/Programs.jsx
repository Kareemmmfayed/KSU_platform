import { useState } from 'react';
import Header from '../Header';
import Footer from '../Footer';
import { useNavigate } from 'react-router-dom';

function Programs() {
    const allPrograms = ["دبلومة إدارة ", "دبلومة المحاسبة", "دبلومة إدارة الموارد البشرية"]
    const [searchTerm, setSearchTerm] = useState('');
    
    const filteredPrograms = allPrograms.filter(program =>
        program.includes(searchTerm)
    );

    const navigate = useNavigate();

    const toDetails = () => {
        navigate("/programs/details");
    }

    return (
    <>
        <Header name="< العودة" link="/"/>
        <div className='Programs'>
            <div className='Programs__in'>
                <div className='Programs__in__top'>
                    <h2>برامج الدبلومات المتاحة حاليا</h2>
                    <input
                        type='text'
                        placeholder='بحث'
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

            <ol>
                {filteredPrograms.map((program, index) => (
                <li key={index}>
                    <button onClick={toDetails}>{program}</button>
                </li>
                ))}
            </ol>
        </div>
        <Footer />
        </div>
    </>
    );
}

export default Programs;