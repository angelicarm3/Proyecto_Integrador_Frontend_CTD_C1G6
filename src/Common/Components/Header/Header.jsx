import Navbar from './Navbar/Navbar'
import React from 'react';

function Header() {
    return (
      <header style={styles.header}>
        <img src="../../../assets/logoSSMal.png" alt="logo" style={styles.logo} />
        <Navbar />
        <div style={styles.authButtons}>
          <button style={styles.button}>Login</button>
          <button style={styles.button}>Signup</button>
        </div>
      </header>
    );
  }
  
  const styles = {
    header: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '10px 20px',
      backgroundColor: 'rgb(15 23 42)',
    },
    logo: {
      height: '50px',
      marginRight: '20px',
    },
    authButtons: {
      display: 'flex',
      gap: '10px',
    },
    button: {
      padding: '10px 20px',
      backgroundColor: '#F3C02F',
      color: 'rgb(15 23 42)',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
      fontSize: '16px',
    }
  };
  
  export default Header;