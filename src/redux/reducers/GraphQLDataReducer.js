export default (state = null, action) => {
    switch (action.type) {
        case 'SIMPLE_ACTION':
            return {
                result: action.payload
            };
        case 'FETCH_DATA_SUCCESS':
            console.log('action.payload', action.payload);
            return {
                ...state,
                loading: false,
                ...action.payload
            };
        case 'REMOVE_PASSED_JOURNEY':
            const { journeyFromTo } = state;
            return {
                ...state,
                journeyFromTo: {
                    ...state.journeyFromTo,
                    departures: journeyFromTo.departures.filter(
                        ({ startTime }) => new Date(startTime) > new Date()
                    )
                }
            };
        default:
            return state;
    }
};
