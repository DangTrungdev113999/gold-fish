export type shoeType = {
  shoeId: string;
  imageUri: string;
  type?: string;
  createdAt?: any;
  updatedAt?: any;
};

export type shoeReducerType = {
  shoesList: shoeType[];
  fetchShoesLoading: boolean;
  fetchShoesError: string;
  loadMoreShoesLoading: boolean;
  loadMoreShoesError: string;
  addShoeLoading: boolean;
  addShoeError: string;
  updateShoeLoading: boolean;
  updateShoeError: string;
  deleteShoeLoading: boolean;
  deleteShoeError: string;
  lastShoe: any;
};

export type rootReducerType = {
  shoes: shoeReducerType;
};
