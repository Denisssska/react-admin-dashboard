import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { userApi } from '../../api/userApi';

const initialState = {
  currentUser: null,
  loading: false,
  error: false,
  errorText:''
};

export const loginTC = createAsyncThunk(
  '/auth/loginTC',
  async ({ email, password }: SignInPayload, thunkAPI) => {
    try {
      thunkAPI.dispatch(userActions.signInStart());
      const response = await userApi.signIn({ email, password });
      console.log(response);
            if (!response.ok) {
        const errorText =  response.statusText;
        console.log(errorText);

        thunkAPI.dispatch(userActions.signInFailure(errorText));
        throw new Error(errorText || 'something was wrong');
      }
      const data = await response.json();
      thunkAPI.dispatch(userActions.signInSuccess(data));
    } catch (e: any) {
      console.log(e);
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);
const userSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
    signInStart: state => {
      state.loading = true;
    },
    signInSuccess: (state, action) => {
      state.loading = false;
      state.error = false;
      state.currentUser = action.payload;
    },
    signInFailure: (state, action) => {
      state.loading = false;
      state.error = true;
      state.errorText = action.payload;
    },
  },
  // extraReducers: builder => {
  //   builder.addCase(loginTC.fulfilled, (state, action) => {
  //     // console.log(action.payload);
  //   });
  //   builder.addCase(loginTC.rejected, (state, action) => {
  //     console.log(action.payload);
  //   });
  // },
});
export const { reducer: userReducer, actions: userActions } = userSlice;
