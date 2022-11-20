import styles from "./Navbar.module.css";

const Navbar = () => {
    return (
        <div className={styles.container}>
            <div className={styles.container1}>
                <div className={styles.logo}>
                    <img src="/image/logo.png" />
                </div>
                <div className={styles.name}>
                    <div className={styles.tech}>
                        <h2>Tech</h2>
                    </div>
                    <div className={styles.people}>
                        <h2>People</h2>
                    </div>
                </div>
                <div className={styles.buttons}>
                    <a href= "">COURSE</a>
                    <a href= "">HOME</a>
                </div>
            </div>
            <div className={styles.login}>
                <button>LOGIN</button>
            </div>
        </div>
    );
};

export default Navbar;