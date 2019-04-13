const appDetailsReducer = (state={editMode=false,loading:true},action)=>{
    switch(action.type){
        case "SET_DETAILS":
            return {editMode:action.editMode,handleParam:action.handleParam,loading:false}
    }
}