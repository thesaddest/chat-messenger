import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

import FileService from "../api/file.service";
import { STATE_STATUSES } from "../../../shared/const";
import { FILE_API } from "../api/api.constants";

import { IFile, IPendingAttachedFile, IUploadFilePayload } from "./interfaces";

interface FileState {
    pendingFiles: IPendingAttachedFile[];
    uploadedFiles: IFile[];
    status: STATE_STATUSES;
}

const initialState: FileState = {
    pendingFiles: [],
    uploadedFiles: [],
    status: STATE_STATUSES.START,
};

export const isSendMessageNeedDisable = (
    friendIdActiveKey: string,
    pendingAttachedFiles: IPendingAttachedFile[],
): boolean => {
    return pendingAttachedFiles.some(
        (pendingAttachedFile) => pendingAttachedFile.friendIdActiveKey === friendIdActiveKey,
    );
};

export const isUploadedFilesBelongToChat = (chatIdActiveKey: string, uploadedFiles: IFile[]) => {
    return uploadedFiles.every((uploadedFile) => uploadedFile.sentTo === chatIdActiveKey);
};

export const uploadSingleFile = createAsyncThunk<IFile, IUploadFilePayload, { rejectValue: string }>(
    `${FILE_API.ENTITY}/${FILE_API.UPLOAD_SINGLE_FILE}`,
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
    name: `${FILE_API.ENTITY}`,
    initialState,
    reducers: {
        clearFileStateAfterUpload: (state, action: PayloadAction<IFile[]>) => {
            state.uploadedFiles = state.uploadedFiles.filter(
                (fileInState) => !action.payload.some((fileInPayload) => fileInPayload.fileId === fileInState.fileId),
            );
        },
        addPendingFile: (state, action: PayloadAction<IPendingAttachedFile>) => {
            state.pendingFiles.push(action.payload);
            state.status = STATE_STATUSES.PENDING;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(uploadSingleFile.fulfilled, (state, action) => {
                state.uploadedFiles.push(action.payload);
                state.pendingFiles = state.pendingFiles.filter(
                    (pendingFile) => pendingFile.name !== action.payload.originalName,
                );
                state.status = STATE_STATUSES.SUCCEEDED;
            })
            .addCase(uploadSingleFile.pending, (state) => {
                state.status = STATE_STATUSES.PENDING;
            })
            .addCase(uploadSingleFile.rejected, (state) => {
                state.status = STATE_STATUSES.FAILED;
            });
    },
});

export const { clearFileStateAfterUpload, addPendingFile } = fileModel.actions;

export const reducer = fileModel.reducer;
