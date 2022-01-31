class User {

    email: string;
    username: string;
  
    constructor(user: User) {
      this.email = user.email;
      this.username = user.username;
    }

  }
  
  export default User;