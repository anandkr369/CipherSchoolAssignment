import  {createStore} from "redux";
const initialData={
    token:"",
    name:"",
    email:"",
    score:"",
    videoStream:null
}
function Reducer(state=initialData,action){
    switch(action.type){
        case "data": return {...state,
                            token:action.payload.token,
                            name: action.payload.name,
                            email:action.payload.email}
                            break;
        case "videoStream": return {   ...state,
                            videoStream:action.payload.stream
                            }
                            break;
        case "score": return {...state,score:action.payload.score}
                            break;
        case "token": return {...state,token:action.payload.token} 
                            break;

        default : return state;
    }
}

const store=createStore(Reducer);

export default store;