import React from 'react'
import { Link } from "react-router-dom";
import { FaFileAlt, FaList } from 'react-icons/fa';
import styles from './Home.module.css'
function Home() {
  return (
    <div>
        <div className={styles.home_container}>
      <h1>Certificate Manager</h1>
      <div className={styles.icon_container}>
        <Link to="/create" className={styles.icon_link}>
          <div className={styles.icon_wrapper}>
            <FaFileAlt className={styles.icon} />
            <span>Generate Certificate</span>
          </div>
        </Link>
        <Link to="/view" className={styles.icon_link}>
          <div className={styles.icon_wrapper}>
            <FaList className={styles.icon} />
            <span>View Certificates</span>
          </div>
        </Link>
      </div>
    </div>
    </div>
  )
}

export default Home