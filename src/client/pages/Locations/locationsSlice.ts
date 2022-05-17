import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getSavedUserInfo } from "../../shared/utils";
import { LocationInfo, UserInfoUpdateForm, UserLocationInfo } from "./types";

export interface LocationsState {
  locations: LocationInfo[];
  locationUpdateModalIsVisible: boolean;
  currentUserInfo: UserLocationInfo;
  loaders: Loaders;
}

interface Loaders {
  fetchLocationsRequest: boolean;
  updateUserInfoRequest: boolean;
}

const initialState: LocationsState = {
  locations: [],
  locationUpdateModalIsVisible: false,
  currentUserInfo: getSavedUserInfo(),
  loaders: {
    fetchLocationsRequest: false,
    updateUserInfoRequest: false
  }
};

export const locationsSlice = createSlice({
  name: 'locations',
  initialState,
  reducers: {
    fetchLocations: (state) => {
      state.loaders.fetchLocationsRequest = true;
    },
    fetchLocationsSuccess: (state, action: PayloadAction<LocationInfo[]>) => {
      state.loaders.fetchLocationsRequest = false;
      state.locations = action.payload;
    },
    fetchLocationsFailure: (state) => {
      state.loaders.fetchLocationsRequest = false;
    },
    showLocationUpdateModal: state => {
      state.locationUpdateModalIsVisible = true;
    },
    closeLocationUpdateModal: state => {
      state.locationUpdateModalIsVisible = false;
    },
    submitUserInfoUpdateForm: (state, action: PayloadAction<UserInfoUpdateForm>) => {
      state.loaders.updateUserInfoRequest = true;
    },
    submitUserInfoUpdateFormSuccess: (state, action: PayloadAction<UserInfoUpdateForm>) => {
      state.loaders.updateUserInfoRequest = false;

      const formData = action.payload;
      state.currentUserInfo.fullName = formData.fullName;
      state.currentUserInfo.status = formData.status;
      state.currentUserInfo.coords = formData.coords;
      state.currentUserInfo.country = formData.country;
      state.currentUserInfo.city = formData.city;
      state.currentUserInfo.additionalInfo = formData.additionalInfo;

      state.locationUpdateModalIsVisible = false;
    },
    submitUserInfoUpdateFormFailure: (state, action) => {
      state.loaders.updateUserInfoRequest = false;
    }
  }
});

export const actions = locationsSlice.actions;

export default locationsSlice.reducer;
