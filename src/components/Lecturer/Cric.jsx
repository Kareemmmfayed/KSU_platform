import { useState } from 'react';
import Header from '../Header';
import Footer from '../Footer';

function Cric() {

    const allPrograms = ["دبلومة إدارة الأعمال", "دبلومة المحاسبة", "دبلومة إدارة الموارد البشرية"]
    const [searchTerm, setSearchTerm] = useState('');
    
    const filteredPrograms = allPrograms.filter(program =>
        program.includes(searchTerm)
    );

    return (
            <>
        <Header />
        <div className='Cric'>
            <div className='Cric__in'>
                <div className='Cric__in__top'>
                    <h2>المقررات الدراسية</h2>
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

    )
}

export default Cric