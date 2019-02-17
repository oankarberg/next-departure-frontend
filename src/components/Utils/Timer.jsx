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
        str += time.h >= 1 || time.m >= 10 ? '' : `${time.s} sec`;
        return str;
    }

    constructor(props) {
        super(props);
        this.state = {
            timeLeft: ''
        };
    }

    componentDidMount() {
        const { startTime } = this.props;
        this.updateTimeLeft(startTime);
        this.startCountDown(startTime);
    }

    componentWillUnmount() {
        clearInterval(this.timer);
    }

    updateTimeLeft(startTime) {
        const diffInSec = (new Date(startTime) - Date.now()) / 1000;
        if (diffInSec < 1) {
            this.removeFromParentList();
        }
        this.setState({
            startTime,
            timeLeft: Timer.secondsToTime(diffInSec)
        });
    }

    startCountDown() {
        this.timer = setInterval(() => {
            const { startTime } = this.state;
            this.updateTimeLeft(startTime);
        }, 1000);
    }

    removeFromParentList() {
        const { onEnded } = this.props;
        onEnded();
    }

    render() {
        const { timeLeft } = this.state;
        return <div>{timeLeft}</div>;
    }
}
Timer.defaultProps = {
    onEnded: () => {}
};
Timer.propTypes = {
    onEnded: PropTypes.func
};
export default Timer;
