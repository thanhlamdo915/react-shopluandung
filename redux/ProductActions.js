// actions/ProductActions.js
export const updateProduct = (product) => async (dispatch) => {
  try {
    const response = await axios.put(
      `https://backend-shopluandung.onrender.com/products/${productId}`,
      product
    );
    dispatch({
      type: 'UPDATE_PRODUCT',
      payload: response.data,
    });
  } catch (error) {
    console.error('Error updating product:', error);
  }
};

// reducers/ProductReducer.js
const initialState = {
  products: [],
};

const ProductReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'UPDATE_PRODUCT':
      return {
        ...state,
        products: state.products.map((prod) =>
          prod.id === action.payload.id ? {...prod, ...action.payload} : prod
        ),
      };
    default:
      return state;
  }
};

export default ProductReducer;
