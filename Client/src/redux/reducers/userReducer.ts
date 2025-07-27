export type User = {
    username: string
    email: string
    userId: number | null
}

//שלב ראשון ליצירת מחלקה , היא ליצר אובייקט מאותחל בהתחלה
const userInitial: User = { username: '',  userId: null, email: '' }

//שלב שני, יצירת פונקציה שמנהלת את המחלקה
//אחראית לקבל את האובייקט
const userReducer = (state: User = userInitial,action:any) => {
    switch (action.type) {
        case 'SET_USER':
            state=action.data;
            state={...state}
            break;
    
        default:
            break;
    }
    return state;
}

export default userReducer