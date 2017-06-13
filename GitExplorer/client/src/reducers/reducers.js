/**
 * Created by fish on 6/10/17.
 */
//reducers
import {combineReducers} from 'redux';
import GetFooReducer from './GetFooReducer';
import SmallNumbersReducer from './SmallNumbersReducer';
//subordinate combiner(s)
import Git from './Git/GitReducerCombiner';

export default combineReducers({SmallNumbersReducer, GetFooReducer, Git});
