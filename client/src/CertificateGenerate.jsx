import React, { useState, useRef } from 'react';
import axios from 'axios';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { nanoid } from 'nanoid';
import certificate from './assets/certificate.png';
import styles from './CertificateGenerate.module.css';

function CertificateGenerate() {
  const [userName, setUserName] = useState('');
  const [courseName, setCourseName] = useState('');
  const [email,setEmail] = useState('')
  const [date, setDate] = useState('');
  const [message, setMessage] = useState('');
  const BackendUrl = import.meta.env.VITE_REACT_APP_BACKEND_URL;
  const certificateTemplateRef = useRef(null);
  const [certificateId, setCertificateId] = useState('');
  const [link, setLink] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newCertificateId = generateCertificateId(userName, courseName);
      setCertificateId(newCertificateId);
      generateAndDownloadCertificate(newCertificateId);
    } catch (error) {
      console.error(error);
      setMessage('Error: Unable to generate certificate');
    }
  };

  const generateCertificateId = (userName, courseName) => {
    const userNamePrefix = userName.slice(0, 4).toUpperCase();
    const courseNamePrefix = courseName.slice(0, 2).toUpperCase();
    const randomNumber = Math.floor(1000 + Math.random() * 9000); // Generate random number between 1000 and 9999
    return `TD-${userNamePrefix}-${courseNamePrefix}-${randomNumber}`;
  };

  const generateAndDownloadCertificate = async (certificateId) => {
    const certificateTemplate = certificateTemplateRef.current;
    certificateTemplate.querySelector('#user-name').textContent = userName;
    certificateTemplate.querySelector('#course-name').textContent = courseName;
    certificateTemplate.querySelector('#certificate-date').textContent = formatDate(date);
    certificateTemplate.querySelector('#certificate-id').textContent = `${certificateId}`;

    html2canvas(certificateTemplate).then(async (canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      pdf.addImage(imgData, 'PNG', 0, 0, 210, 297);
      const pdfBlob = pdf.output('blob');
      const pdfUrl = URL.createObjectURL(pdfBlob); // Generate download link for PDF
      setLink(pdfUrl); // Set the download link in the state

      // Store the download link in the database
      try {
        const response = await axios.post(`${BackendUrl}/certificate/create`, {
          userName,
          email,
          courseName,
          date,
          certificateId: certificateId,
          link: pdfUrl
        });
        setMessage(response.data.message);
      } catch (error) {
        console.error(error);
        setMessage('Error: Unable to store certificate');
      }

      pdf.save(`${userName}_certificate.pdf`);
    });
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0'); // Get day and pad with leading zero if necessary
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Get month (zero-based) and pad with leading zero if necessary
    const year = date.getFullYear(); // Get full year
    return `${day}/${month}/${year}`; // Return formatted date string
  };

  return (
    <div className={styles.main_container}>
      <div className={styles.form_container}>
      <h1>Certificate Generator</h1>
      <form onSubmit={handleSubmit}>
        <div className={styles.form_group}>
        <label>
          Name:
          <input type="text" value={userName} onChange={(e) => setUserName(e.target.value)} required/>
        </label>
        </div>
        <br />
        <div className={styles.form_group}>
        <label>
          Email:
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required/>
        </label>
        </div>
        <br />
        <div className={styles.form_group}>
        <label>
          Course Name:
          <input type="text" value={courseName} onChange={(e) => setCourseName(e.target.value)} required/>
        </label>
        </div>
        <br />
        <div className={styles.form_group}>
        <label>
          Date:
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required/>
        </label>
        </div>
        <br />
        <button type="submit">Create Certificate</button>
      </form>
      {message && <p>{message}</p>}
      </div>

      {/* Certificate Template */}
      <div style={{ position: 'relative', width: '800px', height: '600px' }} ref={certificateTemplateRef}>
        <img src={certificate} alt="Certificate Image" style={{ width: '100%', height: '100%' }} />
        <p className={styles.name}><span id="user-name">{userName}</span></p>
        <p className={styles.course}>For successfully completing the <span id="course-name">{courseName}</span></p>
        <p className={styles.date}>course on <span id="certificate-date">{date}.</span></p>
        <p className={styles.id}><span id="certificate-id">{certificateId}</span></p>
      </div>
    </div>
  );
}

export default CertificateGenerate;
