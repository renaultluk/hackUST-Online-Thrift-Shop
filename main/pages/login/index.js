import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { useAuth } from "../../utils/AuthContext";
import { Container } from 'react-bootstrap';

import { FcGoogle } from 'react-icons/fc'
import styles from "../../styles/login.module.css";


export default function Login() {

    const { loadingUser, currentUser, login } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!loadingUser && currentUser){
            router.push('/')        
        }
      }, [currentUser])

    return (
        <>

        <Container className={styles.outerContainer}>
            <Container className={styles.innerContainer}>
                <Container className={styles.loginFields}>
                    <label className={styles.inputLabels}>Continue with:</label>
                    <button className={styles.googlebutton} onClick={login}>
                        <FcGoogle />
                        <span style={{marginLeft: '0.25rem'}}>Google</span>
                    </button>

                    <label className={styles.inputLabels} style={{textAlign: 'center', margin: '1rem 0 1rem 0'}}>- OR -</label>

                    <label className={styles.inputLabels}>Email Address:</label>
                    <input type="email" className={styles.inputFields}></input>
                    <label className={styles.inputLabels}>Password:</label>
                    <input type="password" className={styles.inputFields}></input>

                    <button className={styles.loginButton}>LOG IN</button>
                </Container>

            </Container>
        </Container>
        </>
    )
}
