import { createSlice } from '@reduxjs/toolkit'
// Slice
const slice = createSlice({
  name: 'permissions',
  initialState: {
    camera: null,
    microphone: null
  },
  reducers: {
    setCameraPermission: (state, action) => {
      state.camera = action.payload;
    },
    setMicrophonePermission: (state, action) => {
      state.microphone = action.payload
    }
  },
});

// Actions
export const { setCameraPermission, setMicrophonePermission } = slice.actions

export default slice.reducer