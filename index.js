
// fetch(`https://api.github.com/users/andrew`)
// .then((res)=>res.json()
// ).then((profile)=>console.log(profile));

const CLIENT_ID = 'fd0d0efabf17707f6435';
const CLIENT_SECRET = '7dd14b1a9097db8446fcd3bfd15d601965a8a11e';
async function getUser(name){
  const res = await fetch(`https://api.github.com/users/${name}?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}`);
  const profile = await res.json();
  //console.log();
  return profile;
}

async function getRepo(profile){
  const res = await fetch(`${profile.repos_url}?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&per_page=5`);
  const repos = await res.json();
  console.log(repos);
  return repos;
}

document.querySelector('#search').addEventListener('submit',async(e)=>{
   e.preventDefault();
   const userName = document.querySelector('#findByUsername').value;
  if(userName){
    //console.log(userName);
    document.querySelector('.loader').style.display = 'block';
    document.querySelector('.user-details').style.display = 'none';
    document.querySelector('.notFound').style.display = 'none';
    const profile = await getUser(userName);
    document.querySelector('.loader').style.display = 'none';

    if(profile.message === "Not Found"){
      document.querySelector('.notFound').style.display = 'block';
    }else{
      const repos = await getRepo(profile);
      //console.log(repos);
      //console.log(profile);
      document.querySelector('.user-details').style.display = 'flex';
      showProfile(profile);
      showRepos(repos);
    }
    document.querySelector('#findByUsername').value = "";
  }
});

/* <div class="profile"></div> */

/*Profile show based on search strt*/
function showProfile(profile){
  document.querySelector('.profile').innerHTML = ` 
  <img
    src="${profile.avatar_url}"
    alt="${profile.name}"
  />
  <p class="name">${profile.name}</p>
  <p class="username login">${profile.login}</p>
  <p class="bio">
  ${profile.bio}
  </p>

  <div class="followers-stars">
    <p>
      <ion-icon name="people-outline"></ion-icon>
      <span class="followers"> ${profile.followers} </span> followers
    </p>
    <span class="dot">·</span>
    <p><span class="following"> ${profile.following} </span> following</p>
  </div>

  <p class="company">
    <ion-icon name="business-outline"></ion-icon>
    ${profile.company}
  </p>
  <p class="location">
    <ion-icon name="location-outline"></ion-icon>${profile.location}
  </p>
  `;
}
/*Profile show based on search  end*/
/*Show repositories strt*/
function showRepos(repos){
let newHtml = "";
 for(let repo of repos){
  console.log(repo);
  newHtml+=`<div class="repo">
  <div class="repo_name">
  <a href="${repo.html_url}"> ${repo.name}</a>
  </div>
  <p>
  <span class="circle"></span> ${repo.language}
  <ion-icon name="star-outline"></ion-icon> ${repo.watchers}
  <ion-icon name="git-branch-outline"></ion-icon> ${repo.forks_count}
  </p>
  </div>`;
 }
 document.querySelector('.repositories').style.display = 'block';
 document.querySelector('.repos').innerHTML = newHtml;
 
}
/*Show repositories end*/