class GitHub{
constructor() {
  this.client_id = '1e515440d0d96fabc341';
  this.client_secret = '93e1179c75cf729f8d94c411ce90e30aa22d194e';
}


async getUser(user) {
  const profileResponse = await fetch(`https://api.github.com/users/${user}?client_id=${this.client_id}&client_secret=${this.client_secret}`);

  const profileData = await profileResponse.json();
  return {
    profile: profileData
  }
}
}