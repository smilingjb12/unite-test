import isEmpty from "lodash/isEmpty";
import { FormEvent, useEffect, useState } from "react";
import { updateLocation } from "../../../shared/api/locationsApi";
import { useAppDispatch } from "../../../store";
import { actions } from "../locationsSlice";
import { UserInfoUpdateForm } from "../types";
import { useLocations } from "./useLocations";

export function useLocationForm() {
  const [userFormInfo, setUserFormInfo] = useState<UserInfoUpdateForm>({} as UserInfoUpdateForm);
  const data = useLocations();
  const dispatch = useAppDispatch();
  const userInfoModalIsVisible = data.userInfoModalIsVisible;
  const updateUserInfoRequestInProgress = data.updateUserInfoRequestInProgress;

  useEffect(() => {
    setUserFormInfo(data.userInfo);
  }, [userInfoModalIsVisible]);

  const closeModal = () => {
    dispatch(actions.closeLocationUpdateModal());
  };

  const updateTextField = <TProp extends keyof UserInfoUpdateForm>(newValue: string, property: TProp) => {
    setUserFormInfo({ ...userFormInfo, [property]: newValue });
  };

  const valueIsPopulated = (value: string): boolean => {
    return !isEmpty(value);
  }

  const formIsValid = (): boolean => {
    return valueIsPopulated(userFormInfo.fullName) && valueIsPopulated(userFormInfo.coords);
  };

  const submitForm = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formIsValid()) {
      return;
    }

    updateLocation(userFormInfo).then(() => {
      dispatch(actions.submitUserInfoUpdateForm(userFormInfo));
    });
  };

  const getInvalidClass = (value: string): string => {
    return !valueIsPopulated(value) ? 'invalid' : '';
  };

  const setLocation = (coordinates: string, city: string, country: string): void => {
    setUserFormInfo({ ...userFormInfo, coords: coordinates, city, country });
  };

  return {
    updateTextField,
    userFormInfo,
    closeModal,
    setLocation,
    submitForm,
    getInvalidClass,
    userInfoModalIsVisible,
    updateUserInfoRequestInProgress
  };
}