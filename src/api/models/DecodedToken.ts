class DecodedToken {

    exp: number;
    iat: number;
    roles: string[];
	username: string; //this is actually email, but referred to as username by the api
	userHandle: string
	
  
    constructor(decodedToken: DecodedToken) {
      this.exp = decodedToken.exp;
      this.iat = decodedToken.iat
      this.roles = decodedToken.roles;
	  this.username = decodedToken.username;
	  this.userHandle = decodedToken.userHandle;
    }

  }
  
  export default DecodedToken;