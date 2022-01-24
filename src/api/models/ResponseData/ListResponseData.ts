class ListResponseData<T> {

    items: T[];
    totalItems: number;
    pageCount: number
  
    constructor(responseData: ListResponseData<T>) {
      this.items = responseData.items;
      this.totalItems = responseData.totalItems
      this.pageCount = responseData.pageCount;
    }

  }
  
  export default ListResponseData;