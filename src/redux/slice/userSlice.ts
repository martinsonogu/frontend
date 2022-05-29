// this is a redux state slice

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RoleEnum } from "enums/role";
import { AvatarModel } from "models/avatar";
import { BackgroundModel } from "models/background";
import { BioModel } from "models/bio";
import { ExpertiseModel } from "models/expertise";
import { OriginModel } from "models/origin";
import { UserModel } from "models/user";

export interface UserState {
  user: UserModel;
  origin: OriginModel;
  expertise: ExpertiseModel;
  background: BackgroundModel;
  avatar: string;
  bio: BioModel;
}

const initialState: UserState = {
  user: undefined,
  origin: undefined,
  expertise: undefined,
  background: undefined,
  avatar: undefined,
  bio: undefined,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    authUpdateUser: (state, action: PayloadAction<UserModel>) => {
      state.user = action.payload;
    },
    onboardingUpdateRole: (state, action: PayloadAction<RoleEnum>) => {
      state.user = { ...state.user, role: action.payload };
    },
    onboardingUpdateOrigin: (state, action: PayloadAction<OriginModel>) => {
      state.origin = action.payload;
    },
    onboardingUpdateExpertise: (
      state,
      action: PayloadAction<ExpertiseModel>
    ) => {
      state.expertise = action.payload;
    },
    onboardingUpdateBackground: (
      state,
      action: PayloadAction<BackgroundModel>
    ) => {
      state.background = action.payload;
    },
    onboardingUpdateAvatar: (state, action: PayloadAction<AvatarModel>) => {
      state.avatar = action.payload.data;
    },
    onboardingUpdateBio: (state, action: PayloadAction<BioModel>) => {
      state.bio = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  authUpdateUser,
  onboardingUpdateRole,
  onboardingUpdateOrigin,
  onboardingUpdateExpertise,
  onboardingUpdateBackground,
  onboardingUpdateAvatar,
  onboardingUpdateBio,
} = userSlice.actions;

const userReducer = userSlice.reducer;

export default userReducer;
