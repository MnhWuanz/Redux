import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TBLOG } from '../../types/typeBlog';

const initialState = {
  listBlog: [] as TBLOG[],
  isCreaeSuccess: false,
};
export const fetchListBlog = createAsyncThunk(
  'blogs/fetchListBlog',
  async () => {
    const response = await fetch('http://localhost:8000/blogs');

    const data = await response.json();
    return data as TBLOG[];
  },
);
interface IBlogPayload {
  title: string;
  author: string;
  content: string;
}
export const createNewBlog = createAsyncThunk(
  'blogs/createNewBlog',

  async (payload: IBlogPayload, thunkAPI) => {
    const response = await fetch('http://localhost:8000/blogs', {
      method: 'Post',
      body: JSON.stringify({ ...payload }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();
    if (data && data.id) {
      thunkAPI.dispatch(fetchListBlog());
    }
    return data as TBLOG[];
  },
);
export const updateBlog = createAsyncThunk(
  'blogs/updateBlog',
  async (payload: TBLOG, thunkAPI) => {
    const response = await fetch(`http://localhost:8000/blogs/${payload.id}`, {
      method: 'PUT',
      body: JSON.stringify({
        title: payload.title,
        author: payload.author,
        content: payload.content,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();
    if (data && data.id) {
      thunkAPI.dispatch(fetchListBlog());
    }
    return data as TBLOG[];
  },
);
export const deleteBlog = createAsyncThunk(
  'blogs/deleteBlog',
  async (payload: TBLOG, thunkAPI) => {
    const response = await fetch(`http://localhost:8000/blogs/${payload.id}`, {
      method: 'Delete',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();
    if (data) {
      thunkAPI.dispatch(fetchListBlog());
    }
    return data as TBLOG[];
  },
);

export const blogSlice = createSlice({
  name: 'blog',
  initialState,
  reducers: {
    resetCreate(state) {
      state.isCreaeSuccess = false;
    },
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(fetchListBlog.fulfilled, (state, action) => {
      // Add user to the state array
      state.listBlog = action.payload;
    });
    builder.addCase(createNewBlog.fulfilled, (state) => {
      // Add user to the state array
      state.isCreaeSuccess = true;
    });
  },
});

// Action creators are generated for each case reducer function
export const { resetCreate } = blogSlice.actions;

export default blogSlice.reducer;
