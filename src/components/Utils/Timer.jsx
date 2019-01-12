import React, { Component } from 'react';

class Timer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            countDown: undefined
        };
    }

    componentDidMount() {
        const { startTime } = this.props;
        startCountDown(startTime);
    }

    componentWillUnmount() {
        clearInterval(this.timer);
    }
    startCountDown(startTime) {
        this.setState({
            isOn: true,
            startTime: startTime,
            countDown: startTime - Date.now()
        });
        this.timer = setInterval(
            () =>
                this.setState({
                    countDown: secondsToTime(
                        (new Date(this.state.startTime) - Date.now()) / 1000
                    )
                }),
            1000
        );
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

    secondsToTime(secs) {
        let hours = Math.floor(secs / (60 * 60));

        let divisor_for_minutes = secs % (60 * 60);
        let minutes = Math.floor(divisor_for_minutes / 60);

        let divisor_for_seconds = divisor_for_minutes % 60;
        let seconds = Math.ceil(divisor_for_seconds);

        let obj = {
            h: hours,
            m: minutes,
            s: seconds
        };
        return obj;
    }

    render() {
        const { countDown } = this.state;
        return (
            <div>
                <h3>{this}</h3>
            </div>
        );
    }
}
module.exports = Timer;
