import './styles/globals.scss';
import styles from './styles/Home.module.css';

export default function Home() {
    return (
        <div>
            <div className={styles.container}>
                <h1 className={styles.heading}>SPEED</h1>
                <h2 className={styles.subheading}>ABOUT</h2>
                <br />
                <p className={styles.text}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
                sed do eiusmod t empor incididunt ut labore et dolore magna aliqua. 
                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut 
                aliquip ex ea commodo consequat. Duis aute irure dolor in.
                </p>

                <button>Search Here</button>
            </div>
        </div>
    );
}