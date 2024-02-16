import { useState } from 'react';
import Header from '../Header';
import Footer from '../Footer';
import copy from '../../assets/copy.png';
// import { useNavigate } from 'react-router-dom';

function Applicants() {
    const initialApplicants = [
        ["كريم فايد", "1111111111111"],
        ["كريم فايد", "1111111111111"],
        ["كريم فايد", "1111111111111"],
        ["كريم فايد", "1111111111111"],
        ["كريم فايد", "1111111111111"],
        ["كريم فايد", "1111111111111"],
        ["كريم فايد", "1111111111111"],
        ["كريم فايد", "1111111111111"],
        ["كريم فايد", "1111111111111"],
        ["كريم فايد", "1111111111111"],
        ["أحمد", "1111111111111"],
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

    // const navigate = useNavigate();

    // const toInfo = () => {
    //     navigate("/employee/applicant/info");
    // }

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

