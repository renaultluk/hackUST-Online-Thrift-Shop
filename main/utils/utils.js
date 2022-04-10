

const generateOrderId = () =>{
    const length = 10;
    const result           = '';
    const characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * 
 charactersLength));
   }
   return result;
}


export const getDateString = (unixTime) =>{
  if(!unixTime) return null;

  const dateObj = new Date(unixTime*1000)
  return `${dateObj.getDate()}/${dateObj.getMonth()}/${dateObj.getFullYear()}`
}

export default generateOrderId;
