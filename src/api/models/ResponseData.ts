class ResponseData<T> {

    items: T[];
    totalItems: number;
    pageCount: number
  
    constructor(responseData: ResponseData<T>) {
      this.items = responseData.items;
      this.totalItems = responseData.totalItems
      this.pageCount = responseData.pageCount;
    }

  }
  
  export default ResponseData;