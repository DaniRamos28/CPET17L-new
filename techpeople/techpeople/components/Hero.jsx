import styles from "./Hero.module.css";

const Hero = () => {
  return (
    <div className={styles.Outer}>
        <div className={styles.innerleft}>
            <div className={styles.container}>
                <p className={styles.tech}>Tech</p>
                <p className={styles.people}>People</p>
            </div>
            <div className={styles.quote}>
                <p>" The problem is yours, the solution is ours "</p>
                <button>SIGN UP</button>
            </div>
        </div>
        <div className={styles.innerright}>
            <img src= "/image/wow.png" />
        </div>
    </div>
  );
};

export default Hero;