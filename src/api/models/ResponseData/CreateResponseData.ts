class CreateResponseData {

    status: string;
    id: number|string;
  
    constructor(responseData: CreateResponseData) {
      this.status = responseData.status;
      this.id = responseData.id;
    }

  }
  
  export default CreateResponseData;