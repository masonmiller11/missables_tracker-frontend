class TokenData {

    encodedToken: string;
    duration: number;

    constructor(encodedToken: string, duration: number) {
      this.encodedToken = encodedToken;
      this.duration = duration;
    }
    
  }
  
  export default TokenData;