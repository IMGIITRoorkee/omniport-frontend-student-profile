export function handleVisibilitybutton(data){
    for(let item in data){
        if(data[item].visibility == true){
            return false
        }
    }
    return true
}
