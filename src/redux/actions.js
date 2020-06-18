export const CHANGE_TITLE = 'CHANGE_TITLE';
export const CHANGE_DESCRIPTION = 'CHANGE_DESCRIPTION';
export const CHANGE_URL = 'CHANGE_URL';
export const ADD_MARK = 'ADD_MARK';
export const DELETE_MARK = 'DELETE_MARK';
export const EDIT_MARK = 'EDIT_MARK';


export function changeTitle (title) {
  return { type: CHANGE_TITLE, payload: {title} };
}

export function changeDescription (description) {
  return { type: CHANGE_DESCRIPTION, payload: {description} };
}

export function changeUrl (url) {
  return { type: CHANGE_URL, payload: {url} };
}

export function addMark (mark) {
  return { type: ADD_MARK, payload: {mark} };
}

export function editMark (mark, index) {
  return { type: EDIT_MARK, payload: {mark, index} };
}

export function deleteMark (index) {
  return { type: DELETE_MARK, payload: {index} };
}
