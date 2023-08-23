export function AddToCard(item) {
  return new Promise(async (resolve) => {
  const response = await fetch('http://localhost:8080/cart',{
    method:'POST',
    body:JSON.stringify(item),
    headers: { 'content-type': 'application/json' },
  })
  const data  = await response.json()
  resolve({data}) 
}
  );
}

export function FetchItemByUsesrID(userID) {
  return new Promise(async (resolve) => {
  const response = await fetch('http://localhost:8080/cart?user='+userID)
  const data  = await response.json()
  resolve({data}) 
}
  );
}
export function UpdateCart(update) {
  console.log(update)
  return new Promise(async (resolve) => {
  const response = await fetch('http://localhost:8080/cart/' + update.id,{
    method:'PATCH',
    body:JSON.stringify(update),
    headers: { 'content-type': 'application/json' },

  })
  
  const data  = await response.json()
  resolve({data}) 
}
  );
}

export function DeleteItemFromCart(itemId) {
  
  return new Promise(async (resolve) => {
  const response = await fetch('http://localhost:8080/cart/' + itemId,{
    method:'DELETE',
    headers: { 'content-type': 'application/json' },

  });
  
  const data  = await response.json();
  resolve({data:{id:itemId}}); 
});
}
 export async function CartItemRest(userID){
  return new Promise(async (resolve) => {
    const response = FetchItemByUsesrID(userID)
  const items = response.data;
  for(let item of items){
    console.log(item)
    await DeleteItemFromCart(item.id)
  }
  resolve({status:"success"})
  })
 
  
  
 
}