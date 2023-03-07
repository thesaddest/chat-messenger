import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

import { UploadFile } from "antd/es/upload/interface";

import FileService from "../api/file.service";

import { IFile, IUploadFilePayload } from "./interfaces";

interface FileState {
    files: IFile[];
    status: "start" | "pending" | "succeeded" | "failed";
}

const initialState: FileState = {
    files: [],
    status: "start",
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

export const deleteSingleFile = createAsyncThunk<IFile, UploadFile, { rejectValue: string }>(
    "files/deleteSingleFile",
    async function (payloadFile, { rejectWithValue }) {
        const { data } = await FileService.deleteSingleFile(payloadFile);

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
        removeFileFromState: (state, action: PayloadAction<string>) => {
            state.files = state.files.filter((fileInState) => fileInState.originalName !== action.payload);
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

export const { clearFileStateAfterUpload, removeFileFromState } = fileModel.actions;

export const reducer = fileModel.reducer;
