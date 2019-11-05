class GitHub{
constructor() {
  this.client_id = '1e515440d0d96fabc341';
  this.client_secret = '93e1179c75cf729f8d94c411ce90e30aa22d194e';
  this.repos_count = 5;
  this.repos_sort = 'created: asc';
}

async getUser(user) {
  const profileResponse = await fetch(`https://api.github.com/users/${user}?client_id=${this.client_id}&client_secret=${this.client_secret}`);

  const repoResponse = await fetch(`https://api.github.com/users/${user}/repos?per_page=${this.repos_count}&sort=${this.repos_sort}&client_id=${this.client_id}&client_secret=${this.client_secret}`);

  const profileData = await profileResponse.json();

  const repoData = await repoResponse.json();
  console.log(repoData);


  return {
    profile: profileData,
    repos: repoData
  }
}
}