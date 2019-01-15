const removePassedStartTime = () => dispatch => {
    dispatch({
        type: 'REMOVE_PASSED_JOURNEY',
        payload: 'remove_passed_journey'
    });
};

const fetchDataSuccess = data => dispatch => {
    dispatch({
        type: 'FETCH_DATA_SUCCESS',
        payload: data
    });
};
export { removePassedStartTime, fetchDataSuccess };
