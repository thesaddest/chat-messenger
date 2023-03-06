import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

import FileService from "../api/file.service";

import { IFile, IUploadFilePayload } from "./interfaces";

interface FileState {
    files: IFile[];
    status: "pending" | "succeeded" | "failed";
}

const initialState: FileState = {
    files: [],
    status: "pending",
};

export const uploadSingleFile = createAsyncThunk<IFile, IUploadFilePayload, { rejectValue: string }>(
    "files/uploadSingleFile",
    async function ({ file, username }, { rejectWithValue }) {
        const formData = new FormData();
        formData.append("file", file);
        const { data } = await FileService.uploadFile(formData, username);

        if (!data) {
            return rejectWithValue("Error while sending message with attached files");
        }

        return data;
    },
);

export const fileModel = createSlice({
    name: "files",
    initialState,
    reducers: {
        clearFileStateAfterUpload: (state, action: PayloadAction<IFile[]>) => {
            state.files = state.files.filter(
                (fileInState) => !action.payload.some((fileInPayload) => fileInPayload.fileId === fileInState.fileId),
            );
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(uploadSingleFile.fulfilled, (state, action) => {
                state.files.push(action.payload);
                state.status = "succeeded";
            })
            .addCase(uploadSingleFile.pending, (state) => {
                state.status = "pending";
            })
            .addCase(uploadSingleFile.rejected, (state) => {
                state.status = "failed";
            });
    },
});

export const { clearFileStateAfterUpload } = fileModel.actions;

export const reducer = fileModel.reducer;
