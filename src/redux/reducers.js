import {combineReducers} from 'redux';
import {CHANGE_TITLE, CHANGE_DESCRIPTION, CHANGE_URL, ADD_MARK, DELETE_MARK, EDIT_MARK} from './actions';

function titleReducer(state = null, action = {}) {
  switch(action.type){
    case 'CHANGE_TITLE':
      return action.payload.title;
    default:
      return state;
  }
}

function descriptionReducer(state = null, action = {}) {
  switch(action.type){
    case 'CHANGE_DESCRIPTION':
      return action.payload.description;
    default:
      return state;
  }
}

function urlReducer(state = null, action = {}) {
  switch(action.type){
    case 'CHANGE_URL':
      return action.payload.url;
    default:
      return state;
  }
}

function marksReducer(state = null, action = {}) {
  switch(action.type){
    case 'DELETE_MARK':
      let previousMarks = JSON.parse(JSON.stringify(state));
      previousMarks.splice(action.payload.index, 1);
      return previousMarks;

    case 'ADD_MARK':
      let previousMarks2 = JSON.parse(JSON.stringify(state));
      let newState = previousMarks2.concat(action.payload.mark);
      return newState;

    case 'EDIT_MARK':
    console.log(action.payload.mark)
      let previousMarks3 = JSON.parse(JSON.stringify(state));
      previousMarks3[action.payload.index] = action.payload.mark;
      return previousMarks3;

    default:
      return state;
  }
}





const GlobalState = (combineReducers({
  title: titleReducer,
  description: descriptionReducer,
  url: urlReducer,
  marks: marksReducer
}));

export default GlobalState;
