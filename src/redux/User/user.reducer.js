import { resetPassword } from './user.actions';
import userTypes from './user.types';


const INITIAL_STATE = {
    currentUser: null,
    signInSucess: false,
    signUnSucess: false,
    signUpError: [],
    resetPassword: false,
    resetPAsswordError: [],

};

const userReducer = (state=INITIAL_STATE, action) => {
    switch(action.type) {
        case userTypes.SET_CURRENT_USER:
            return {
                ...state,
                currentUser: action.payload
            }
        case (userTypes).SIGN_IN_SUCCESS:
            return {
                ...state,
                signInSucess: action.payload
            }
        case (userTypes).SIGN_IN_SUCCESS:
            return {
                ...state,
                signInSucess: action.payload
            }
        case (userTypes).SIGN_UP_ERROR:
            return {
                ...state,
                signUpError: action.payload
            }
        case (userTypes).RESET_PASSWORD_SUCCESS:
            return {
                ...state,
                resetPasswordSuccess: action.payload
            }
        case (userTypes).RESET_PASSWORD_ERROR:
            return {
                ...state,
                resetPasswordError: action.payload
            }
        case (userTypes).RESET_AUTH_FORMS:
            return {
                ...state,
                signInSucess: false,
                signUnSucess: false,
                signUpError: [],
                resetPassword: false,
                resetPAsswordError: [],
            }
            default:
                return state;
    }
}
export default userReducer;