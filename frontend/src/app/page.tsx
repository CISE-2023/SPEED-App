"use client";

import './styles/globals.scss';
import styles from './styles/Home.module.css';
import { useRouter } from "next/navigation";

export default function Home() {
    const router = useRouter();
    
    return (
        <div>
            <div className={styles.container}>
                <h1 className={styles.heading}>SPEED</h1>
                <p className={styles.text}>
                Welcome to SPEED: Your Gateway to Evidence-Based Engineering. We&apos;re here to
                make reliable research in software engineering easy to access. Think of us as
                your friendly research library, where you can explore studies on various practices.
                Whether you&apos;re a student, a researcher, or a practitioner, SPEED has you covered.
                Curious about Test-Driven Development? Sarch and discover what the studies say.
                Join us in making informed decisions, based on solid evidence. Right here at SPEED!
                </p>
                    <button className={styles.button} onClick={() => {router.push("/search");}}>Search Here</button>
            </div>
        </div>
    );
}