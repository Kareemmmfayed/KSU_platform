import { useState } from 'react';
import Header from '../Header';
import Footer from '../Footer';
import copy from '../../assets/copy.png';

function Applicants() {
    const initialApplicants = [
        ["كريم فايد", "11"],
        ["name2", "22"],
        ["name3", "123"],
        ["name4", "77"],
        ["name5", "88"],
        ["name6", "99"],
        ["كريم فايد", "11"],
        ["name2", "22"],
        ["name3", "123"],
        ["name4", "77"],
        ["name5", "88"],
        ["name6", "99"]
    ];

    const [searchValue, setSearchValue] = useState('');
    const [filteredApplicants, setFilteredApplicants] = useState(initialApplicants);

    const handleSearch = (e) => {
        const searchTerm = e.target.value;
        setSearchValue(searchTerm);

        const filtered = initialApplicants.filter(
            (applicant) =>
                applicant[0].includes(searchTerm) ||
                applicant[1].includes(searchTerm)
        );

        setFilteredApplicants(filtered);
    };

    const copyToClipboard = (name, number) => {
        const textToCopy = `${name} - ${number}`;
        const textArea = document.createElement('textarea');
        textArea.value = textToCopy;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
    };

    return (
        <>
            <Header name="< العودة" link="/"/>
            <div className="Applicants">
                <div className='Applicants__in'>
                    <div className='Applicants__in__top'>
                        <h2>الطلبة المتقدمين</h2>
                        <input
                            type='text'
                            placeholder='بحث'
                            value={searchValue}
                            onChange={handleSearch}
                        />
                    </div>
                    <ol>
                        {filteredApplicants.map((applicant, index) => (
                            <div className='Applicants__in__bot' key={index}>
                                <div className='Applicants__in__bot__right'>
                                    <div>
                                        <li>{applicant[0]}</li>
                                    </div>
                                    <p>الرقم القومي : {applicant[1]}</p>
                                </div>
                                <button onClick={() => copyToClipboard(applicant[0], applicant[1])}>
                                    <div>
                                        <img src={copy} alt="copy" />
                                    </div>
                                </button>
                            </div>
                        ))}
                    </ol>
                </div>
                <Footer />
            </div>
        </>
    );
}

export default Applicants;

