import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


type User = {
  _id: string;
  name: string;
  email: string;
  photo: string;
};


interface AuthState {
  token: string | null;
  user: User | null;
  isLoading: boolean;
  error: string | null;
}


const initialState: AuthState = {
  token:
    typeof window !== "undefined"
      ? localStorage.getItem("token")
      : null,

  user: null,

  isLoading: false,

  error: null,
};



// Get Logged User Data
export const getLoggedUser = createAsyncThunk(
  "auth/getLoggedUser",
  async (_, { rejectWithValue }) => {

    try {

      const token = localStorage.getItem("token");

console.log("TOKEN SENT:", token);


      const response = await fetch("/api/users/me", {
        method: "GET",
        headers: {
          token: token || "",
        },
      });


      const data = await response.json();


      if (!response.ok) {
        return rejectWithValue(data.message);
      }


      return data.user;


    } catch (error) {

      return rejectWithValue("Failed to get user data");

    }

  }
);

export const uploadProfilePhoto = createAsyncThunk(
  "auth/uploadProfilePhoto",

  async (
    file: File,
    { rejectWithValue }
  ) => {

    try {

      const token = localStorage.getItem("token");


console.log("TOKEN SENT:", token);

      const formData = new FormData();

      formData.append("photo", file);


      const response = await fetch(
        "/api/users/upload-photo",
        {
          method: "PUT",

          headers: {
      "token": token as string,
    },

          body: formData,
        }
      );


      if (!response.ok) {

        const data = await response.json();

        return rejectWithValue(data.message);

      }


      return URL.createObjectURL(file);


    } catch (error) {

      return rejectWithValue(
        "Failed to upload photo"
      );

    }

  }
);


export const changePassword = createAsyncThunk(
  "auth/changePassword",

  async (
    values:{
      password:string;
      newPassword:string;
    },
    {rejectWithValue}
  )=>{


    try {

      const token = localStorage.getItem("token");


      const response = await fetch(
        "/api/users/change-password",
        {
          method:"PATCH",

          headers:{
            "Content-Type":"application/json",
            token: token || ""
          },

          body: JSON.stringify(values)
        }
      );



      if(!response.ok){

        const data = await response.json();

        return rejectWithValue(data.message);

      }


      return "Password changed successfully";


    } catch(error){

      return rejectWithValue(
        "Something went wrong"
      );

    }


  }
);



const authSlice = createSlice({

  name: "auth",

  initialState,


  reducers: {


    setLoading: (state) => {
      state.isLoading = true;
    },


    setToken: (state, action) => {

      state.token = action.payload.token;
      state.user = action.payload.user;

      state.isLoading = false;

    },

    setError: (state, action) => {
    state.error = action.payload;
    state.isLoading = false;
  },



    setRemoveToken: (state) => {

      state.token = null;
      state.user = null;

      localStorage.removeItem("token");
      localStorage.removeItem("userId");

    },


  },


  extraReducers: (builder) => {


    builder.addCase(
      getLoggedUser.pending,
      (state) => {

        state.isLoading = true;

      }
    );


    builder.addCase(
      getLoggedUser.fulfilled,
      (state, action) => {

        state.user = action.payload;

        state.isLoading = false;

      }
    );


    builder.addCase(
      getLoggedUser.rejected,
      (state, action) => {

        state.error = action.payload as string;

        state.isLoading = false;

      }
    );

    builder.addCase(
  uploadProfilePhoto.fulfilled,

  (state, action) => {

    if(state.user){

      state.user.photo = action.payload;

    }

    state.isLoading = false;

  }
);

builder.addCase(
 changePassword.pending,
 (state)=>{
   state.isLoading=true;
 }
);


builder.addCase(
 changePassword.fulfilled,
 (state)=>{
   state.isLoading=false;
 }
);


builder.addCase(
 changePassword.rejected,
 (state,action)=>{
   state.error=action.payload as string;
   state.isLoading=false;
 }
);


  }


});


export const {
  setLoading,
  setToken,
  setError,
  setRemoveToken,

} = authSlice.actions;


export const authReducer = authSlice.reducer;