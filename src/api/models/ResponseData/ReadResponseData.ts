class ReadResponseData<T> {

    items: T[];
    totalItems: number;
    pageCount: number
  
    constructor(responseData: ReadResponseData<T>) {
      this.items = responseData.items;
      this.totalItems = responseData.totalItems
      this.pageCount = responseData.pageCount;
    }

  }
  
  export default ReadResponseData;