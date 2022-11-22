import styles from "./Option.module.css";

const fourth = () => {
    return (
        <div className= {styles.base}>
            <div className= {styles.container}>
                <div className= {styles.detail}>
                    <img src= "/image/one.png" />
                    <h1>Developer</h1>
                    <a href="">Learn More</a>
                </div>
                <div className= {styles.detail}>
                    <img src= "/image/two.png" />
                    <h1>Locations</h1>
                    <a href="">Learn More</a>
                </div>
                <div className= {styles.detail}>
                    <img src= "/image/three.png" />
                    <h1>Partnership</h1>
                    <a href="">Learn More</a>
                </div>

            </div>
        </div>

    );

};

export default fourth;