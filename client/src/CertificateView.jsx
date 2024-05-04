import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './CertificateView.module.css'
function CertificateView() {
  const [certificates, setCertificates] = useState([]);
  const BackendUrl = import.meta.env.VITE_REACT_APP_BACKEND_URL;

  useEffect(() => {
    // Fetch certificates from the backend when the component mounts
    const fetchCertificates = async () => {
      try {
        const response = await axios.get(`${BackendUrl}/certificate/all`);
        setCertificates(response.data.Certificates);
      } catch (error) {
        console.error('Error fetching certificates:', error);
      }
    };

    fetchCertificates();
  }, []);
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US');
  };


  return (
    <div className={styles.certificate_list_container}>
      <h2>Certificates List</h2>
      <table className={styles.certificate_table}>
        <thead>
          <tr>
            <th>Certificate Id</th>
            <th>User Name</th>
            <th>Email</th>
            <th>Course Name</th>
            <th>Date</th>
            <th>Download</th>
          </tr>
        </thead>
        <tbody>
          {certificates.map((certificate) => (
            <tr key={certificate._id}>
              <td>{certificate.certificateId}</td>
              <td>{certificate.userName}</td>
              <td>{certificate.email}</td>
              <td>{certificate.courseName}</td>
              <td>{new Date(certificate.date).toLocaleDateString()}</td>
              <td>
                <a href={certificate.link} target="_blank" rel="noopener noreferrer">
                  Download Certificate
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CertificateView;
