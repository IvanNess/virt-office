import { updateUser } from "./updateUser"
import { updateUsers } from "./updateUsers"
import { updateOrder } from "./updateOrder"
import { updateDialogs } from "./updateDialogs"
import { updateDialogArr } from "./updateDialogArr"
import { updateReviews } from "./updateReviews"
import { updateOrders } from "./updateOrders"
import { updateOffers } from "./updateOffers"
import { updateAdresses } from "./updateAdresses"
import { updateCategories } from "./updateCategories"
import { updateSubCategories } from "./updateSubCategories"
import { updateSelectedServiceId } from "./updateSelectedServiceId"
import { updateSelectedPeriodId } from "./updateSelectedPeriodId"
import { updateSelectedHours } from "./updateSelectedHours"
import { updateSelectedDate } from "./updateSelectedDate"
import { updateCurrentUser } from "./updateCurrentUser"
import { updateReservedHours } from "./updateReservedHours"
import { updateReservedSessions } from "./updateReservedSessions"
import { updateSelectedDates } from "./updateSelectedDates"
import { updateUserReservations } from "./updateUserReservations"
import { updateLoginForm } from "./updateLoginForm"
import { updateSignupForm } from "./updateSignupForm"
import { updateHiringChoices } from "./updateHiringChoices"
import { updateHiringChoiceNumber } from "./updateHiringChoiceNumber"
import { updateShowAuth } from "./updateShowAuth"
import { updateWynajecieForm } from "./updateWynajecieForm"
import { updateCurrentPackage } from "./updateCurrentPackage"
import { updateCalendarRedirect } from "./updateCalendarRedirect"
import { updateShowMenu } from "./updateShowMenu"
import { updateFormSubmitted } from "./updateFormSubmitted"

const reducer = (state, action)=>{
    return{
        user: updateUser(state, action),
        users: updateUsers(state, action),
        //order: updateOrder(state, action),
        dialogs: updateDialogs(state, action),
        dialogArr: updateDialogArr(state, action),
        reviews: updateReviews(state, action),
        orders: updateOrders(state, action),
        offers: updateOffers(state, action),
        adresses: updateAdresses(state, action),
        categories: updateCategories(state, action),
        subCategories: updateSubCategories(state, action),

        selectedServiceId: updateSelectedServiceId(state, action), 
        selectedPeriodId: updateSelectedPeriodId(state, action),
        selectedDate: updateSelectedDate(state, action),
        selectedDates: updateSelectedDates(state, action),
        selectedHours: updateSelectedHours(state, action),
        currentUser: updateCurrentUser(state, action),
        reservedHours: updateReservedHours(state, action),
        reservedSessions: updateReservedSessions(state, action),
        userReservations: updateUserReservations(state, action),

        loginForm: updateLoginForm(state, action),
        signupForm: updateSignupForm(state, action),
        
        hiringChoices: updateHiringChoices(state, action),
        hiringChoiceNumber: updateHiringChoiceNumber(state, action),
        wynajecieForm: updateWynajecieForm(state, action),
        currentPackage: updateCurrentPackage(state, action),

        showAuth: updateShowAuth(state, action),
        calendarRedirect: updateCalendarRedirect(state, action),
        showMenu: updateShowMenu(state, action),

        formSubmitted: updateFormSubmitted(state, action)
    }
}

export default reducer