export function fetchProudctlist() {
  return new Promise(async (resolve) => {
  const response = await fetch('http://localhost:8080/products')
  const data  = await response.json()
  
  resolve({data}) 
  

}
  );
}

export function fetchBrand() {
  console.log("hello word")
  return new Promise(async (resolve) => {
  const response = await fetch('http://localhost:8080/brands')
 
  const data  = await response.json()
  resolve({data}) 
 
}

  );
}
export function fetchProductbyID(id) {
   
  return new Promise(async (resolve) => {

  const response = await fetch('http://localhost:8080/products/'+id)
 
  const data  = await response.json()
  resolve({data}) 
 
}
  
  );

}

export function fetchCatgeory() {
  return new Promise(async (resolve) => {
  const response = await fetch('http://localhost:8080/catgeory')
  const data  = await response.json()
  resolve({data}) 
  
 
}
  );
}

export function fetchProudctlistFilter(filter,sort,pagination) {
 //product filter
  let queryString  = '';
  for(let key in filter){
    const categoryvalue = filter[key];
    if(categoryvalue.lenght){
      const lastcategoryValue = categoryvalue[categoryvalue.lenght-1]
      queryString += `${key}=${filter[lastcategoryValue]}&`
    }
    
  }
  //sorting product 
  for(let key in sort){
   
    queryString += `${key}=${sort[key]}&`
  }
//pagination 
  for(let key in pagination){
  
    queryString += `${key}=${pagination[key]}&`
    
  }

  return new Promise(async (resolve) => {
  const response = await fetch('http://localhost:8080/products?'+queryString)
   const data  = await response.json()
   //it json server feature to give totalitem number
  const totalItems =  await response.headers.get('X-Total-Count')
  resolve({data:{products:data,TotalItems:totalItems}}) 

}
  );
}