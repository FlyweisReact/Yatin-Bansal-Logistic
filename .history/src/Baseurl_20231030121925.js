import { Store } from 'react-notifications-component';



export const Baseurl = 'https://wefast-logistic-backend-app.vercel.app/'

export const Auth = { 
    header : {
        Authorization : `Bearer ${localStorage.getItem("token")}`
    }
}


export const showMsg = Store.addNotification({
    title: "Wonderful!",
    message: "teodosii@react-notifications-component",
    type: "success",
    insert: "top",
    container: "top-right",
    animationIn: ["animate__animated", "animate__fadeIn"],
    animationOut: ["animate__animated", "animate__fadeOut"],
    dismiss: {
      duration: 5000,
      onScreen: true
    }
  });