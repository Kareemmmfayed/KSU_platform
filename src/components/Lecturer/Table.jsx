import { useState } from 'react';
import Header from '../Header';
import Footer from '../Footer';

function Table() {
    const initialApplicants = [
        ["كريم حسام الدين فايد", "13456789333331"],
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
        ["name6", "99"],
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
        ["name6", "99"],
    ];

    const [searchTerm, setSearchTerm] = useState('');
    const [filteredApplicants, setFilteredApplicants] = useState(initialApplicants);

    const handleSearch = (e) => {
        const term = e.target.value;
        setSearchTerm(term);

        const filtered = initialApplicants.filter(
            (applicant) =>
                applicant[0].includes(term) || applicant[1].includes(term)
        );

        setFilteredApplicants(filtered);
    };

    const handlePrint = () => {
        const printWindow = window.open('', '_blank');
        printWindow.document.write(`
            <html>
                <head>
                    <title>Print Table</title>
                    <style>
                        table {
                            border-collapse: collapse;
                            width: 100%;
                            font-size: 10px; /* Adjust the font size as needed */
                        }
                        th, td {
                            border: 1px solid black;
                            padding: 6px; /* Adjust the padding as needed */
                            text-align: left;
                        }
                    </style>
                </head>
                <body>
                    <table border="1">
                        <thead>
                            <tr>
                                <th>رقم الطالب</th>
                                <th>إسم الطالب</th>
                                <th>الرقم القومي</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${filteredApplicants.map((applicant, index) => `
                                <tr>
                                    <td>${index + 1}</td>
                                    <td>${applicant[0]}</td>
                                    <td>${applicant[1]}</td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </body>
            </html>
        `);
        printWindow.document.close();
        printWindow.print();
    };

    
    return (
        <>
            <Header name="< العودة" link="/" />
            <div className="Table">
                <div className="Table__in">
                    <div className='Applicants__in__top'>
                        <h2>الطلبة المتقدمين</h2>
                        <input
                            type='text'
                            placeholder='بحث'
                            value={searchTerm}
                            onChange={handleSearch}
                        />
                    </div>
                    <div className="Table__in__bot">
                        <table border="1">
                            <thead>
                                <tr>
                                    <th>رقم الطالب</th>
                                    <th>إسم الطالب</th>
                                    <th>الرقم القومي</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredApplicants.map((applicant, index) => (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{applicant[0]}</td>
                                        <td>{applicant[1]}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className='but'>
                        <button onClick={handlePrint}>الطباعة</button>
                    </div>
                </div>
                <Footer />
            </div>
        </>
    );
}

export default Table;
