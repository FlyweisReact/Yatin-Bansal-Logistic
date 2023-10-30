import { Store } from 'react-notifications-component';



export const Baseurl = 'https://wefast-logistic-backend-app.vercel.app/'

export const Auth = { 
    header : {
        Authorization : `Bearer ${localStorage.getItem("token")}`
    }
}

