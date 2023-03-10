import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

import FileService from "../api/file.service";

import { IAttachedFileStatus, IFile, IPendingAttachedFile, IUploadFilePayload } from "./interfaces";

interface FileState {
    pendingFiles: IPendingAttachedFile[];
    uploadedFiles: IFile[];
    status: IAttachedFileStatus;
    progress: number | null;
}

const initialState: FileState = {
    pendingFiles: [],
    uploadedFiles: [],
    status: "start",
    progress: null,
};

export const isSendMessageNeedDisable = (
    friendIdActiveKey: string,
    pendingAttachedFiles: IPendingAttachedFile[],
): boolean => {
    return pendingAttachedFiles.some(
        (pendingAttachedFile) => pendingAttachedFile.friendIdActiveKey === friendIdActiveKey,
    );
};

export const isUploadedFilesBelongToFriend = (friendIdActiveKey: string, uploadedFiles: IFile[]) => {
    return uploadedFiles.every((uploadedFile) => uploadedFile.sentTo === friendIdActiveKey);
};

export const uploadSingleFile = createAsyncThunk<IFile, IUploadFilePayload, { rejectValue: string }>(
    "files/uploadSingleFile",
    async function ({ file, username, friendIdActiveKey }, { rejectWithValue }) {
        const formData = new FormData();
        formData.append("file", file);
        const { data } = await FileService.uploadFile(formData, username, friendIdActiveKey);

        if (!data) {
            return rejectWithValue("Error while uploading single file");
        }

        return data;
    },
);

export const fileModel = createSlice({
    name: "files",
    initialState,
    reducers: {
        clearFileStateAfterUpload: (state, action: PayloadAction<IFile[]>) => {
            state.uploadedFiles = state.uploadedFiles.filter(
                (fileInState) => !action.payload.some((fileInPayload) => fileInPayload.fileId === fileInState.fileId),
            );
        },
        addPendingFile: (state, action: PayloadAction<IPendingAttachedFile>) => {
            state.pendingFiles.push(action.payload);
            state.status = "pending";
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(uploadSingleFile.fulfilled, (state, action) => {
                state.uploadedFiles.push(action.payload);
                state.pendingFiles = state.pendingFiles.filter(
                    (pendingFile) => pendingFile.name !== action.payload.originalName,
                );
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

export const { clearFileStateAfterUpload, addPendingFile } = fileModel.actions;

export const reducer = fileModel.reducer;
