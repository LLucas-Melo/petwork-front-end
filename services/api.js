let API_BASE_URL = "http://127.0.0.1:5000";

export async function registerUser(userData){
  try{
 const response =  await fetch(`${API_BASE_URL}/users`,{
  method:'POST',
  headers:{"Content-Type":"application/json"},
  body:JSON.stringify(userData),
 });
 return await response.json();
} catch(error){
  console.error("Erro ao cadastrar usuario", error)
  return null
}

}

export async function loginUser(credentials) {
  try{
  const response =  await fetch(`${API_BASE_URL}/login`,{
    method:'POST',
    headers:{"Content-Type":"application/json"},
    body:JSON.stringify(credentials),
   });
    return await response.json();
  }catch{
      console.error("Erro ao fazer o login", error);
      return null
  }
  
}
export async function getUser(userId) {
  try{
  const response =  await fetch(`${API_BASE_URL}/user/${userId}`);
  return  await response.json();
  }catch{
      console.error("Erro ao fazer o login", error)
      return null;
  }
  
}

