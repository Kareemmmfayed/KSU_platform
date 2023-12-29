import { useState } from 'react';
import Header from '../Header';
import Footer from '../Footer';
// import search from '../../assets/Group.png'

function Programs() {
    const allPrograms = ["دبلومة إدارة الأعمال", "دبلومة المحاسبة", "دبلومة إدارة الموارد البشرية"]
    const [searchTerm, setSearchTerm] = useState('');
    
    const filteredPrograms = allPrograms.filter(program =>
        program.includes(searchTerm)
    );

    return (
    <>
        <Header />
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
                <li key={index}>{program}</li>
                ))}
            </ol>
        </div>
        <Footer />
        </div>
    </>
    );
}

export default Programs;
