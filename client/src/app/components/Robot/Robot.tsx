import * as React from 'react';
import * as styles from './style.css';

export class RobotFace extends React.Component {
    render() {
        return (
            <div className={styles.wrap}>
                <div className={styles.cat}>
                    <div className={styles.eyes}>
                        <div className={styles.eye}></div>
                        <div className={`${styles.eye} ${styles.two}`}></div>
                    </div>
                    <div className={styles.mouth}>
                        <div className={styles.lezu}></div>
                    </div>
                    <h1 className={styles.status}>
                        Arrived!
                    </h1>
                </div>
            </div>
        );
    }
}

export default RobotFace;
