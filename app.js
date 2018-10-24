// Create Class and Constructor 

class Github {
 
  constructor() {
    this.client_id = 'bc79a71d92029fa69223';
    this.client_secret = '4e63f1f5495f78dbf39607c22fd1eb9b965866ff';
  }
   
  async getUser(){
    const profileResponse = await fetch('https://api.github.com/users/iamdeshaun?client_id=${this.client_id}&client_secret=${this.client_secret}');

    const profile = await profileResponse.json();

    return {
      profile
    }
  }
};

// Create Class and Constructor 
class UI {

  constructor() {
    this.profile = document.getElementById('profile');
  } 

  showProfile(user){
    this.profile.innerHTML = `
    <div class="container">
    <div class="card card-body mb-3">
      <div class="row">
        <div class="col-md-3">
          <img class="img-fluid mb-2" src="${user.avatar_url}">
          <a href="${user.html_url}" target="_blank" class="btn btn-primary btn-block mb-4">View Profile</a>
        </div>
        <div class="col-md-9">
          <span class="badge badge-primary">Public Repos: ${user.public_repos}</span>
          <span class="badge badge-secondary">Public Gists: ${user.public_gists}</span>
          <span class="badge badge-success">Followers: ${user.followers}</span>
          <span class="badge badge-info">Following: ${user.following}</span>
          <br><br>
          <ul class="list-group">
          <li class="list-group-item">About Me: ${user.bio}</li>
            <li class="list-group-item">Company: ${user.company}</li>
            <li class="list-group-item">Website/Blog: <a href="${user.blog}" target="_blank">${user.blog}</a></li>
            <li class="list-group-item">Location: ${user.location}</li>
            <li class="list-group-item">Member Since: ${user.created_at}</li>
          </ul>
        </div>
      </div>
    </div>
    <h3 class="page-heading mb-3">Latest Repos</h3>
    <div id="repos"></div>
    </div>
  `;
  }
};

// Init Github
const git = new Github;

// Init UI
const ui = new UI;

// Make http call
git.getUser() 
.then(data => {
  console.log(data);
  ui.showProfile(data.profile);
});


