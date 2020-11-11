export type shoeType = {
  shoeId: string;
  imageUri: string;
  type?: string;
  createdAt?: any;
  updatedAt?: any;
};

export type slipperType = {
  slipperId: string;
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

export type slipperReducerType = {
  slippersList: slipperType[];
  fetchSlippersLoading: boolean;
  fetchSlippersError: string;
  loadMoreSlippersLoading: boolean;
  loadMoreSlippersError: string;
  addSlipperLoading: boolean;
  addSlipperError: string;
  updateSlipperLoading: boolean;
  updateSlipperError: string;
  deleteSlipperLoading: boolean;
  deleteSlipperError: string;
  lastSlipper: any;
};

export type rootReducerType = {
  shoes: shoeReducerType;
  slippers: slipperReducerType;
};
