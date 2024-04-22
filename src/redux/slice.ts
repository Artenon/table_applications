import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IApplication } from "../types";

type State = {
  isOpen: boolean;
  isEditing: boolean;
  editingApplication: IApplication | null;
};

const initialState: State = {
  isOpen: false,
  isEditing: false,
  editingApplication: null,
};

export const modalSlice = createSlice({
  name: "MODAL",
  initialState,
  reducers: {
    changeIsOpen: (state, action: PayloadAction<boolean>) => {
      state.isOpen = action.payload;
    },
    changeIsEditing: (state, action: PayloadAction<boolean>) => {
      state.isEditing = action.payload;
    },
    changeEditingApplication: (state, action: PayloadAction<IApplication | null>) => {
      state.editingApplication = action.payload;
    },
  },
});

export const { changeEditingApplication, changeIsEditing, changeIsOpen } = modalSlice.actions;
