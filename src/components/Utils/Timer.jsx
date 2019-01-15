import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Timer extends Component {
    static secondsToTime(secs) {
        const hours = Math.floor(secs / (60 * 60));

        const divisorForMinutes = secs % (60 * 60);
        const minutes = Math.floor(divisorForMinutes / 60);

        const divisorForSeconds = divisorForMinutes % 60;
        const seconds = Math.ceil(divisorForSeconds);

        const time = {
            h: hours,
            m: minutes,
            s: seconds
        };
        return Timer.timeToString(time);
    }

    static timeToString(time) {
        let str = '';
        str += time.h < 1 ? '' : `${time.h} h `;
        str += time.m < 1 ? '' : `${time.m} min `;
        str += `${time.s} sec`;
        return str;
    }

    constructor(props) {
        super(props);
        this.state = {
            countDown: ''
        };
    }

    componentDidMount() {
        const { startTime } = this.props;
        this.startCountDown(startTime);
    }

    componentWillUnmount() {
        clearInterval(this.timer);
    }

    startCountDown(sTime) {
        this.setState({
            startTime: sTime,
            countDown: sTime - Date.now()
        });
        this.timer = setInterval(() => {
            const { startTime } = this.state;
            const diffInSec = (new Date(startTime) - Date.now()) / 1000;
            if (diffInSec < 1) {
                this.removeFromParentList();
            }
            this.setState({
                startTime,
                countDown: Timer.secondsToTime(diffInSec)
            });
        }, 1000);
    }

    removeFromParentList() {
        const { onEnded } = this.props;
        onEnded();
    }

    // calculateTimeLeft(departures) {
    //     return departures.reduce((arr, dep, key) => {
    //         const timeDiffInMinutes =
    //             (new Date(dep.startTime) - new Date()) / (1000 * 60);
    //         if (timeDiffInMinutes < 0) {
    //             return arr;
    //         }
    //         const minutesLeft = Math.floor(timeDiffInMinutes);
    //         let seconds = Math.round(timeDiffInMinutes * 60);
    //         if (minutesLeft >= 1) {
    //             seconds = Math.round((timeDiffInMinutes % minutesLeft) * 60);
    //         }
    //         const timeLeftStr = `${minutesLeft} min ${seconds} sek`;
    //         arr.push({ ...dep, timeLeft: timeLeftStr });
    //         return arr;
    //     }, []);
    // }

    render() {
        const { countDown } = this.state;
        return <div>{countDown}</div>;
    }
}
Timer.defaultProps = {
    onEnded: () => {}
};
Timer.propTypes = {
    onEnded: PropTypes.func
};
export default Timer;
