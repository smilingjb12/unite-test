import isEmpty from "lodash/isEmpty";
import { FormEvent, useEffect, useState } from "react";
import { LocationInfoForm } from "../types";
import { useLocationsApi } from "./useLocationsApi";
import { useLocationsMap } from "./useLocationsMap";

export function useLocationForm(formModalIsVisible: boolean, handleClose: () => void) {
  const [userInfo, setUserInfo] = useState<LocationInfoForm>({} as LocationInfoForm);
  const { updateLocation } = useLocationsApi();
  const { getCurrentUserInfo } = useLocationsMap();

  useEffect(() => {
    setUserInfo(getCurrentUserInfo());
  }, [formModalIsVisible]);

  const updateTextField = <TProp extends keyof LocationInfoForm>(newValue: string, property: TProp) => {
    setUserInfo({ ...userInfo, [property]: newValue });
  };

  const valueIsPopulated = (value: string): boolean => {
    return !isEmpty(value);
  }

  const formIsValid = (): boolean => {
    return valueIsPopulated(userInfo.fullName) && valueIsPopulated(userInfo.coords);
  };

  const submitForm = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formIsValid()) {
      return;
    }

    updateLocation(userInfo).then(() => {
      handleClose();
    });
  };

  const getInvalidClass = (value: string): string => {
    return !valueIsPopulated(value) ? 'invalid' : '';
  };

  const setLocation = (coordinates: string, city: string, country: string): void => {
    setUserInfo({ ...userInfo, coords: coordinates, city, country });
  };

  return {
    updateTextField,
    userInfo,
    setLocation,
    submitForm,
    getInvalidClass
  };
}