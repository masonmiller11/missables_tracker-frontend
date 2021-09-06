class DecodedToken {

    exp: number;
    iat: number;
    roles: string[];
    username: string
  
    constructor(decodedToken: DecodedToken) {
      this.exp = decodedToken.exp;
      this.iat = decodedToken.iat
      this.roles = decodedToken.roles;
      this.username = decodedToken.username;
    }

  }
  
  export default DecodedToken;