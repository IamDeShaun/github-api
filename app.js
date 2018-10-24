// Create Class and Constructor 

class Github {
 
  constructor() {
    this.client_id = 'bc79a71d92029fa69223';
    this.client_secret = '4e63f1f5495f78dbf39607c22fd1eb9b965866ff';
    this.repos_count = 8;
    this.repos_sort = 'created: asc'
  }
   
  async getUser(){
    const profileResponse = await fetch(`https://api.github.com/users/agrant12?client_id=${this.client_id}&client_secret=${this.client_secret}`);

    const repoResponse = await fetch(`https://api.github.com/users/agrant12/repos?per_page=${this.repos_count}&sort=${this.repos_sort}&client_id=${this.client_id}&client_secret=${this.client_secret}`);

    const profile = await profileResponse.json();
    const repos = await repoResponse.json();

    return {
      profile,
      repos
    }
  }
};

// Create Class and Constructor 
class UI {

  constructor() {
    this.profile = document.getElementById('profile');
    this.skill = 'PHP, Laravel, SCSS, HTML5, CSS3, JavaScript, Angular, Python, jQuery, GIT, WordPress, Drupal, Adobe Creative Cloud';
  } 
  // Show User Profile 

  showProfile(user){
    this.profile.innerHTML = `
    <div class="container">
    <div class="card card-body mb-3">
      <div class="row">
        <div class="col-md-3">
          <img class="img-fluid rounded-circle mb-2" src="${user.avatar_url}">
          <a href="${user.html_url}" target="_blank" class="btn btn-primary btn-block mb-4">View Github Profile</a>
        </div>
        <div class="col-md-9">
          <ul class="list-group">
          <li class="list-group-item"><strong>About Me: </strong>${user.bio}</li>
          <li class="list-group-item"><strong>Skills:</strong> ${this.skill}</li>
            <li class="list-group-item"><strong>Location:</strong> Resting In Paradise</li>
            <li class="list-group-item"><strong>Member Since:</strong> ${user.created_at}</li>
          </ul>
        </div>
      </div>
    </div>
    <br>
    <h3 class="page-heading mb-3 mt-2">Latest Repos</h3>
    <div id="repos"></div>
    </div>
  `;
  }

    // Show user repos
    showRepos(repos) {
      let output = '';
  
      repos.forEach(function(repo) {
        output += `
            <div class="card card-body mb-2">
            <div class="row">
              <div class="col-md-3">
                <a href="${repo.html_url}" target="_blank">${repo.name}</a>
              </div>
              <div class="col-md-9">
              <span>${repo.description}</span><br><br>
              <span class="badge badge-primary">Stars: ${repo.stargazers_count}</span>
              <span class="badge badge-secondary">Watchers: ${repo.watchers_count}</span>
              <span class="badge badge-success">Forks: ${repo.forms_count}</span>
              </div>
            </div>
          </div>
        `;
      });
  
      // Output repos
      document.getElementById('repos').innerHTML = output;
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
  ui.showRepos(data.repos);
});


