import { createSlice } from '@reduxjs/toolkit'
// Slice
const slice = createSlice({
  name: 'permissions',
  initialState: {
    camera: false,
  },
  reducers: {
    setCameraPermission: (state, action) => {
      state.camera = action.payload;
    }
  },
});
export default slice.reducer
// Actions
const { setCameraPermission } = slice.actions
export const cameraPermissions = ({ permission }) => async dispatch => {
  try {
    dispatch(setCameraPermission({permission}));
  } catch (e) {
    return console.error(e.message);
  }
}