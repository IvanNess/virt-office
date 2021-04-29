export const updateSelectedServiceId = (id)=> async (dispatch)=>dispatch({type: 'UPDATE_SELECTED_SERVICE_ID', id})

export const updateSelectedPeriodId = (id)=> async (dispatch)=>dispatch({type: 'UPDATE_SELECTED_PERIOD_ID', id})

export const addSelectedHour = (id)=> async (dispatch)=>dispatch({type: 'ADD_SELECTED_HOUR', id})

export const removeSelectedHour = (idx)=> async (dispatch)=>dispatch({type: 'REMOVE_SELECTED_HOUR', idx})

export const setSelectedDate = (date, reinitHours)=> async (dispatch)=>dispatch({type: 'SET_SELECTED_DATE', date, reinitHours})

export const editSelectedDate = (reinitHours)=> async (dispatch)=>dispatch({type: 'EDIT_SELECTED_DATE', reinitHours})

export const setCurrentUser = (user)=> async (dispatch)=>dispatch({type: 'SET_CURRENT_USER', user})

export const editCurrentUser = (values)=> async (dispatch)=>dispatch({type: 'EDIT_CURRENT_USER', values})

export const addReservedHour = (hour)=> async (dispatch)=>dispatch({type: 'ADD_RESERVED_HOUR', hour})

export const setReservedSessions = (sessions)=> async (dispatch) => dispatch({type: "SET_RESERVED_SESSIONS", sessions})

export const addReservedSession = (sessions)=> async (dispatch) => dispatch({type: "ADD_RESERVED_SESSIONS", sessions})

export const updateReservedSessions = (sessions)=> async (dispatch) => dispatch({type: "UPDATE_RESERVED_SESSIONS", sessions})

export const addSelectedDate = (date)=> async (dispatch)=>dispatch({type: 'ADD_SELECTED_DATE', date})

export const getCashedReservedSessions = ()=> async (dispatch)=>dispatch({type: 'GET_CASHED_RESERVED_SESIONS'})

export const setUserReservations = (reservations)=> async (dispatch) => dispatch({type: "SET_USER_RESERVATIONS", reservations})

export const addReservation = (reservation)=> async (dispatch) => dispatch({type: "ADD_RESERVATION", reservation})

export const setLoginFormProp = (prop, value)=> async (dispatch) => dispatch({type: "SET_LOGIN_FORM_PROP", prop, value})

export const setSignupFormProp = (prop, value)=> async (dispatch) => dispatch({type: "SET_SIGNUP_FORM_PROP", prop, value})

export const setHiringChoiceNumber = (number)=> async (dispatch) => dispatch({type: "SET_HIRING_CHOICE_NUMBER", number})

export const updateHiringChoice = ({prop, value, number})=> async (dispatch) => dispatch({type: "UPDATE_HIRING_CHOICE", value, number, prop})

export const setShowAuth = (value)=> async (dispatch) => dispatch({type: "SET_SHOW_AUTH", value})

export const setWynajecieFormProp = (prop, value)=> async (dispatch) => dispatch({type: "SET_WYNAJECIE_FORM_PROP", prop, value})

export const setWynajecieForm = (value)=> async (dispatch) => dispatch({type: "SET_WYNAJECIE_FORM", value})

export const setCurrentPackage = (pack)=> async (dispatch)=>dispatch({type: 'SET_CURRENT_PACKAGE', pack})

export const setCalendarRedirect = (redirect)=> async (dispatch)=>dispatch({type: 'SET_CALENDAR_REDIRECT', redirect})

export const setShowMenu = (value)=> async (dispatch) => dispatch({type: "SET_SHOW_MENU", value})

export const formSubmitted = () => async (dispatch) => dispatch({type: "FORM_SUBMITTED"})

export const setPayAfterRegister = (value) => async (dispatch) => dispatch({type: "SET_PAY_AFTER_REGISTER", value})

export const setPackages = (value) => async (dispatch) => dispatch({type: "SET_PACKAGES", value})

export const setLogo = (value) => async (dispatch) => dispatch({type: "SET_LOGO", value})

export const logout = () => async (dispatch) => dispatch({type: "LOGOUT"})

export const setReservedHoursUtilitiesProp = (prop, value)=> async (dispatch) => dispatch({type: "SET_RESERVED_HOURS_UTILITIES_PROP", prop, value})

export const registerAndReserve = (registerAndReserve) => async (dispatch) => dispatch({type: "REGISTER_AND_RESERVE", registerAndReserve})

// import { Auth } from "aws-amplify"
// import { getUserByUsername, getUserByEmail, getOrders, getAdressByUsername } from "../utils/graphql-utils"


// export const fetchUser = () => async (dispatch)=>{
//     dispatch({type: 'FETCH_USER_START'})
//     try {
//         const res = await Auth.currentAuthenticatedUser()
//         console.log('fetch user res', res)
//         const user = await getUserByUsername(res.username)
//         dispatch({type: 'FETCH_USER_SUCCESS', user})
//     } catch (error) {
//         dispatch({type: 'FETCH_USER_FAILURE', error})        
//     }
// }

// export const fetchUserAndAdress = () => async (dispatch)=>{
//     dispatch({type: 'FETCH_USER_START'})
//     try {
//         const res = await Auth.currentAuthenticatedUser()
//         console.log('fetch user res', res)
//         const user = await getUserByUsername(res.username)
//         dispatch({type: 'FETCH_USER_SUCCESS', user})
//         const adress = await getAdressByUsername(user.username)
//         dispatch({type: 'ADD_ADRESS', adress})
//     } catch (error) {
//         dispatch({type: 'FETCH_USER_FAILURE', error})        
//     }
// }

// export const logout = () => async (dispatch)=>{
//     dispatch({type: 'LOGOUT_START'})
//     try {
//         await Auth.signOut()
//         dispatch({type: 'LOGOUT_SUCCESS'})
//     } catch (error) {
//         dispatch({type: 'LOGOUT_FAILURE', error})        
//     }
// }

// export const login = (email, password) => async (dispatch)=>{
//     dispatch({type: 'LOGIN_START'})
//     try {
//         console.log(email, password)
//         const user = await getUserByEmail(email)
//         await Auth.signIn(user.username, password)
//         dispatch({type: 'LOGIN_SUCCESS', user})
//     } catch (error) {
//         dispatch({type: 'LOGIN_FAILURE', error})        
//     }
// }

// export const startLoading = ()=>async (dispatch)=>dispatch({type: 'LOADING_START'})

// export const finishLoading = ()=>async (dispatch)=>dispatch({type: 'LOADING_FINISH'})

// export const signUpStart = ()=>async (dispatch)=>dispatch({type: 'SIGNUP_START'})

// export const signUpSuccess = (user)=>async (dispatch)=>dispatch({type: 'SIGNUP_SUCCESS', user})

// export const signUpFailure = (error)=>async (dispatch)=>dispatch({type: 'SIGNUP_FAILURE', error})

// export const fetchOrders = () => async (dispatch)=>{
//     dispatch({type: 'FETCH_ORDERS_START'})
//     try {
//         const res = await getOrders()
//         console.log('fetch order res', res)
//         dispatch({type: 'FETCH_ORDERS_SUCCESS', orders})
//     } catch (error) {
//         dispatch({type: 'FETCH_ORDERS_FAILURE', error})        
//     }
// }

// export const orderRecieved = (order)=> async (dispatch)=>dispatch({type: 'FETCH_ORDER_SUCCESS', order})

// export const setDialogs = ({dialogs})=> async (dispatch)=>dispatch({type: 'SET_DIALOGS', dialogs})

// export const setDialogArr = ({dialogs})=> async (dispatch)=>dispatch({type: 'SET_DIALOG_ARR', dialogs})

// export const addDialog = ({dialog, dialogName})=> async (dispatch)=>dispatch({type: 'ADD_DIALOG', dialog, dialogName})

// export const updateDialog = ({dialogName, update})=> async (dispatch)=>dispatch({type: 'ADD_DIALOG', dialogName, update})

// export const addReview = (review)=> async (dispatch)=>dispatch({type: 'ADD_REVIEW', review})

// export const updateReview = (review)=> async (dispatch)=>dispatch({type: 'UPDATE_REVIEW', review})

// export const setOrders = (orders)=> async (dispatch)=>dispatch({type: 'SET_ORDERS', orders})

// export const addOrder = (order)=> async (dispatch)=>dispatch({type: 'ADD_ORDER', order})

// export const setOffers = (offers)=> async (dispatch)=>dispatch({type: 'SET_OFFERS', offers})

// export const addOffer = (offer)=> async (dispatch)=>dispatch({type: 'ADD_OFFER', offer})

// export const addUser = (user)=> async (dispatch)=>dispatch({type: 'ADD_USER', user})

// export const addAdress = (adress)=> async (dispatch)=>dispatch({type: 'ADD_ADRESS', adress})

// export const addCategories = (categories)=> async (dispatch)=>dispatch({type: 'ADD_CATEGORIES', categories})

// export const addSubCategories = (subCategories)=> async (dispatch)=>dispatch({type: 'ADD_SUBCATEGORIES', subCategories})




