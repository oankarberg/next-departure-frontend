import { combineReducers } from 'redux';
import reduxData from './GraphQLDataReducer';
import filterJourneysReducer from './FilterJourneysReducer';

export default combineReducers({
    data: reduxData,
    filterJourneysReducer
});
