import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import baseUrl from "../../../utils/baseURL";

//Create Category Action
export const createCategoryAction = createAsyncThunk(
    "category/create",
    async (category, { rejectWithValue, getState, dispatch }) => {
    // Get User Token
    const user=getState()?.users
    const {userAuth} = user
    const config={
        headers:{
            Authorization: `Bearer ${userAuth?.token}`
        },
    }

    //http call
        try {
        const { data } = await axios.post(`${baseUrl}/api/category`, {
            title: category?.title,
        }, 
            config
        );
        return data
        } catch (error) {
        if (!error?.response) {
            throw error;
        }
        return rejectWithValue(error?.response?.data);
        }
    }
);

// Fetch categories Action
export const fetchCategoriesAction = createAsyncThunk(
  "category/fetch",
  async (category, { rejectWithValue, getState, dispatch }) => {
  // Get User Token
  const user=getState()?.users
  const {userAuth} = user
  const config={
      headers:{
          Authorization: `Bearer ${userAuth?.token}`
      },
  }

  //http call
      try {
      const { data } = await axios.get(`${baseUrl}/api/category`, 
          config
      );
      return data
      } catch (error) {
      if (!error?.response) {
          throw error;
      }
      return rejectWithValue(error?.response?.data);
      }
  }
);

//Update Category Action
export const updateCategoryAction = createAsyncThunk(
  "category/update",
  async (category, { rejectWithValue, getState, dispatch }) => {
    //get user token
    const user = getState()?.users;
    const { userAuth } = user;
    const config = {
      headers: {
        Authorization: `Bearer ${userAuth?.token}`,
      },
    };
    //http call
    try {
      const { data } = await axios.put(
        `${baseUrl}/api/category/${category?.id}`,
        { title: category?.title }, config);
      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

//Delete Category Action
export const deleteCategoryAction = createAsyncThunk(
  "category/delete",
  async (id, { rejectWithValue, getState, dispatch }) => {
    //get user token
    const user = getState()?.users;
    const { userAuth } = user;
    const config = {
      headers: {
        Authorization: `Bearer ${userAuth?.token}`,
      },
    };
    //http call
    try {
      const { data } = await axios.delete(
        `${baseUrl}/api/category/${id}`,
        config
      );
      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

//Fetch Category details
export const fetchCategoryAction = createAsyncThunk(
  "category/details",
  async (id, { rejectWithValue, getState, dispatch }) => {
    //get user token
    const user = getState()?.users;
    const { userAuth } = user;
    const config = {
      headers: {
        Authorization: `Bearer ${userAuth?.token}`,
      },
    };
    //http call
    try {
      const { data } = await axios.get(`${baseUrl}/api/category/${id}`, config);
      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

// Slices
const categorySlices = createSlice({
  name: "category",
  initialState: {},
  extraReducers: (builder) => {
    // Create category Reducers
    builder.addCase(createCategoryAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(createCategoryAction.fulfilled, (state, action) => {
      state.category = action?.payload;
      state.loading = false;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(createCategoryAction.rejected, (state, action) => {
      state.loading = false;
      state.appErr = action?.payload?.message;
      state.serverErr = action?.error?.message;
    });

    // Fetch category Reducers
    builder.addCase(fetchCategoriesAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchCategoriesAction.fulfilled, (state, action) => {
      state.categoryList = action?.payload;
      state.loading = false;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(fetchCategoriesAction.rejected, (state, action) => {
      state.loading = false;
      state.appErr = action?.payload?.message;
      state.serverErr = action?.error?.message;
    })

    // Update
    builder.addCase(updateCategoryAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(updateCategoryAction.fulfilled, (state, action) => {
      state.updateCategory = action?.payload;
      state.loading = false;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(updateCategoryAction.rejected, (state, action) => {
      state.loading = false;
      state.appErr = action?.payload?.message;
      state.serverErr = action?.error?.message;
    })

    // Delete
    builder.addCase(deleteCategoryAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(deleteCategoryAction.fulfilled, (state, action) => {
      state.deletedCategory = action?.payload;
      state.loading = false;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(deleteCategoryAction.rejected, (state, action) => {
      state.loading = false;
      state.appErr = action?.payload?.message;
      state.serverErr = action?.error?.message;
    })

    //fetch details
    builder.addCase(fetchCategoryAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchCategoryAction.fulfilled, (state, action) => {
      state.category = action?.payload;
      state.loading = false;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(fetchCategoryAction.rejected, (state, action) => {
      state.loading = false;
      state.appErr = action?.payload?.message;
      state.serverErr = action?.error?.message;
    });
  },  
});

export default categorySlices.reducer;
