import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { authService } from "./authService";

const user = JSON.parse(localStorage.getItem("user"));

const initialState = {
    user: user ? user : null,
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: "",
    appErr: undefined,
    serverErr: undefined
}

export const registerEmployee = createAsyncThunk('/auth/registerEmployee', async (userData, thunkAPI) => {

    try {
        const response = await authService.registerEmployee(userData);
        return response;
    }
    catch (error) {

        if (!error.response)
        {
            throw error;
        }

        return thunkAPI.rejectWithValue(error.response.data);
    }
})

export const registerManager = createAsyncThunk('/auth/registerManager', async (userData, thunkAPI) => {

    try {
        const response = await authService.registerManager(userData);
        return response;
    }
    catch (error) {

        if (!error.response)
        {
            throw error;
        }

        return thunkAPI.rejectWithValue(error.response.data);
    }
})

export const verifyEmailEmployee = createAsyncThunk('/auth/verifyEmailEmployee', async (userData, thunkAPI) => {

    try {
        const response = await authService.verifyEmailEmployee(userData);
        return response;
    }

    catch (error) {

        if (!error.response)
        {
            throw error;
        }

        return thunkAPI.rejectWithValue(error.response.data);
    }
})

export const verifyEmailManager = createAsyncThunk('/auth/verifyEmailManager', async (userData, thunkAPI) => {

    try {
        const response = await authService.verifyEmailManager(userData);
        return response;
    }

    catch (error) {

        if (!error.response)
        {
            throw error;
        }

        return thunkAPI.rejectWithValue(error.response.data);
    }
})

export const editEmployeeProfile = createAsyncThunk('/auth/editEmployeeProfile', async (userData, thunkAPI) => {

    try {
        const token = thunkAPI.getState().auth.user.token;
        const response = await authService.editEmployeeProfile(userData, token);
        return response;
    }
    catch (error) {

        if (!error.response)
        {
            throw error;
        }

        return thunkAPI.rejectWithValue(error.response.data);
    }
})

export const editManagerProfile = createAsyncThunk('/auth/editManagerProfile', async (userData, thunkAPI) => {

    try {
        const token = thunkAPI.getState().auth.user.token;
        const response = await authService.editManagerProfile(userData, token);
        return response;
    }

    catch (error) {

        if (!error.response)
        {
            throw error;
        }

        return thunkAPI.rejectWithValue(error.response.data);
    }
})

export const loginEmployee = createAsyncThunk('/auth/loginEmployee', async (userData, thunkAPI) => {

    try {
        const response = await authService.loginEmployee(userData);
        return response;
    }
    catch (error) {
        
        if (!error.response)
        {
            throw error;
        }

        return thunkAPI.rejectWithValue(error.response.data);
    }
})

export const loginManager = createAsyncThunk('/auth/loginManager', async (userData, thunkAPI) => {

    try {
        const response = await authService.loginManager(userData);
        return response;
    }
    catch (error) {
        
        if (!error.response)
        {
            throw error;
        }

        return thunkAPI.rejectWithValue(error.response.data);
    }
})

export const forgotPasswordEmployee = createAsyncThunk('/auth/forgotPasswordEmployee', async (userData, thunkAPI) => {

    try {
        const response = await authService.forgotPasswordEmployee(userData);
        return response;
    }
    catch (error) {

        if (!error.response)
        {
            throw error;
        }

        return thunkAPI.rejectWithValue(error.response.data);
    }
})

export const forgotPasswordManager = createAsyncThunk('/auth/forgotPasswordManager', async (userData, thunkAPI) => {

    try {
        const response = await authService.forgotPasswordManager(userData);
        return response;
    }

    catch (error) {

        if (!error.response)
        {
            throw error;
        }

        return thunkAPI.rejectWithValue(error.response.data);
    }
})

export const resetPasswordEmployee = createAsyncThunk('/auth/resetPasswordEmployee', async (userData, thunkAPI) => {

    try {
        const response = await authService.resetPasswordEmployee(userData);
        return response;
    }

    catch (error) {

        if (!error.response)
        {
            throw error;
        }

        return thunkAPI.rejectWithValue(error.response.data);
    }
})

export const resetPasswordManager = createAsyncThunk('/auth/resetPasswordManager', async (userData, thunkAPI) => {

    try {
        const response = await authService.resetPasswordManager(userData);
        return response;
    }

    catch (error) {

        if (!error.response)
        {
            throw error;
        }

        return thunkAPI.rejectWithValue(error.response.data);
    }
})

export const getManagerProfile = createAsyncThunk('/auth/getManagerProfile', async (_, thunkAPI) => {

    const token = thunkAPI.getState().auth.user.token;
    const response = await authService.getManagerProfile(token);
    return response;

});


export const getEmployeeProfile = createAsyncThunk('/auth/getEmployeeProfile', async (_, thunkAPI) => {

    const token = thunkAPI.getState().auth.user.token;
    const response = await authService.getEmployeeProfile(token);
    return response;

});


export const logout = createAsyncThunk('/auth/logout', async () => {
   await authService.logout()
})


const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        reset: (state) => {
            state.isError = false;
            state.isLoading = false;
            state.isSuccess = false;
            state.message = "";
            state.appErr = "";
            state.serverErr = "";
        }
    },
    extraReducers: (builder) => {

        builder
            
            .addCase(registerEmployee.pending, (state) => {
                state.isLoading = true;
            })

            .addCase(registerManager.pending, (state) => {
                state.isLoading = true;
            })

            .addCase(registerEmployee.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.message = action.payload?.message;
            })

            .addCase(registerManager.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.message = action.payload?.message;
            })

            .addCase(registerEmployee.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.appErr = action.payload?.message;
                state.serverErr = action.error?.message;
            })

            .addCase(registerManager.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.appErr = action.payload?.message;
                state.serverErr = action.error?.message;
            })

            .addCase(verifyEmailEmployee.pending, (state) => {
                state.isLoading = true;
            })

            .addCase(verifyEmailManager.pending, (state) => {
                state.isLoading = true;
            })

            .addCase(verifyEmailEmployee.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.message = action.payload?.message;
            })

            .addCase(verifyEmailManager.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.message = action.payload?.message;
            })

            .addCase(verifyEmailEmployee.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.appErr = action.payload?.message
                state.serverErr = action.error?.message;
            })

            .addCase(verifyEmailManager.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.appErr = action.payload?.message
                state.serverErr = action.error?.message;
            })

            .addCase(editEmployeeProfile.pending, (state) => {
                state.isLoading = true;
            })

            .addCase(editEmployeeProfile.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.user = action.payload;
                state.message = action.payload?.message;
            })

            .addCase(editEmployeeProfile.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.appErr = action.payload?.message;
                state.serverErr = action.error?.message;
            })

            .addCase(editManagerProfile.pending, (state) => {
                state.isLoading = true;
            })

            .addCase(editManagerProfile.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.user = action.payload;
                state.message = action.payload?.message;
            })

            .addCase(editManagerProfile.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.appErr = action.payload?.message;
                state.serverErr = action.error?.message;
            })

            .addCase(loginEmployee.pending, (state) => {
                state.isLoading = true;
            })

            .addCase(loginManager.pending, (state) => {
                state.isLoading = true;
            })

            .addCase(loginEmployee.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.user = action.payload;
                state.message = action.payload?.message;
            })

            .addCase(loginManager.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.user = action.payload;
                state.message = action.payload?.message;
            })

            .addCase(loginEmployee.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.appErr = action.payload?.message;
                state.serverErr = action.error?.message;
            })

            .addCase(loginManager.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.appErr = action.payload?.message;
                state.serverErr = action.error?.message;
            })

            .addCase(forgotPasswordEmployee.pending, (state) => {
                state.isLoading = true;
            })

            .addCase(forgotPasswordEmployee.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
            })

            .addCase(forgotPasswordEmployee.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.appErr = action.payload?.message;
                state.serverErr = action.error?.message;
            })

            .addCase(forgotPasswordManager.pending, (state) => {
                state.isLoading = true;
            })

            .addCase(forgotPasswordManager.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
            })

            .addCase(forgotPasswordManager.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.appErr = action.payload?.message
                state.serverErr = action.error?.message;
            })

            .addCase(resetPasswordEmployee.pending, (state) => {
                state.isLoading = true;
            })

            .addCase(resetPasswordEmployee.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
            })

            .addCase(resetPasswordEmployee.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.appErr = action.payload?.message
                state.serverErr = action.error?.message;
            })

            .addCase(resetPasswordManager.pending, (state) => {
                state.isLoading = true;
            })

            .addCase(resetPasswordManager.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
            })

            .addCase(resetPasswordManager.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.appErr = action.payload?.message
                state.serverErr = action.error?.message;
            })

            .addCase(logout.fulfilled, (state) => {
                state.user = null;
                state.message = "User Logged Out Successfully";
            })

            .addCase(getManagerProfile.pending, (state) => {
                state.isLoading = true;
            })

            .addCase(getManagerProfile.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.profile = action.payload.manager;
            })

            .addCase(getManagerProfile.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.appErr = action.payload?.message;
                state.serverErr = action.error?.message;
            })

            .addCase(getEmployeeProfile.pending, (state) => {
                state.isLoading = true;
            })

            .addCase(getEmployeeProfile.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.profile = action.payload.employee;
            })

            .addCase(getEmployeeProfile.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.appErr = action.payload?.message;
                state.serverErr = action.error?.message;
            })

    }
})


export const { reset } = authSlice.actions;
export default authSlice.reducer;