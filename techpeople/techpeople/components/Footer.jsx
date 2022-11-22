import styles from "./Footer.module.css";

const footer = () => {
    return (
        <div className = {styles.container}>
            <div className = {styles.one}>
                <p>ABOUT US</p>
                <div className = {styles.about}>
                    <img src = "/image/company.png" />
                    <a href="">Company</a>
                </div>
                <div className = {styles.about}>
                    <img src = "/image/offer.png" />
                    <a href="">Offers</a>
                </div>
                <div className = {styles.about}>
                    <img src = "/image/job.png" />
                    <a href="">Job Oppotunities</a>
                </div>
            </div>
            <div className = {styles.two}>
                <div className = {styles.about}>
                    <img src = "/image/terms.png" />
                    <a href="">Terms & Condition</a>
                </div>
                <div className = {styles.about}>
                    <img src = "/image/policy.png" />
                    <a href="">Privacy Policy</a>
                </div>
            </div>
            <div className = {styles.three}>
                <p>CONTACT US</p>
                <div className = {styles.contact}>
                    <img src = "/image/phone.png" />
                    <p>09651234512</p>
                </div>
                <p>FOLLOW US</p>
                <div className = {styles.social}>
                    <img src = "/image/fb.png" />
                    <img src = "/image/ig.png" />
                    <img src = "/image/tweet.png" />
                </div>
            </div>

        </div>
    );


};

export default footer;