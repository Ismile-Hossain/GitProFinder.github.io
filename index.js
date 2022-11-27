
// fetch(`https://api.github.com/users/andrew`)
// .then((res)=>res.json()
// ).then((profile)=>console.log(profile));

const CLIENT_ID = 'fd0d0efabf17707f6435';
const CLIENT_SECRET = '7dd14b1a9097db8446fcd3bfd15d601965a8a11e';
async function getUser(name){
  const res = await fetch(`https://api.github.com/users/${name}?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}`);
  const profile = await res.json();
  return profile;
}

document.querySelector('#search').addEventListener('submit',async(e)=>{
   e.preventDefault();
   const userName = document.querySelector('#findByUsername').value;
   console.log(userName);
   const profile = await getUser(userName);
   console.log(profile);
});