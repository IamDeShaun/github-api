class Github {

  constructor() {
    this.client_id = 'bc79a71d92029fa69223';
    this.client_secret = '4e63f1f5495f78dbf39607c22fd1eb9b965866ff';
  }

  async getUser(profileResponse){
    const profileResponse = await fetch('https://api.github.com/users/iamdeshaun?client_id=${this.client_id}&client_secret=${this.client_secret}');

    const profile = await profileResponse.json;

    return {
      profile
    }
  }
}