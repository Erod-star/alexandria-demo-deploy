// ? Store
import { useAppDispatch, useAppSelector } from '@/store/store-hooks';
import {
  setCurrentStep as setCurrentStepSlice,
  resetInventoryWizard as resetInventoryWizardSlice,
  setInventoryWizardAddress as setInventoryWizardAddressSlice,
  setInventoryWizardDetails as setInventoryWizardDetailsSlice,
  setInventoryWizardPayments as setInventoryWizardPaymentsSlice,
} from '@/store/inventory/inventorySlice';

// ? Types
import type {
  InventoryAddress,
  InventoryDetails,
  InventoryPayments,
} from '../types';

export const useInventoryStore = () => {
  const { currentStep, wizardAddress, wizardDetails, wizardPayments } =
    useAppSelector((state) => state.inventory);
  const dispatch = useAppDispatch();

  const resetInventoryWizard = () => {
    dispatch(resetInventoryWizardSlice());
  };

  const setNextStep = () => {
    dispatch(setCurrentStepSlice(currentStep + 1));
  };

  const setPreviousStep = () => {
    dispatch(setCurrentStepSlice(currentStep - 1));
  };

  const setCustomStep = (step: number) => {
    dispatch(setCurrentStepSlice(step));
  };

  const setCurrentStep = (step: number) => {
    dispatch(setCurrentStepSlice(step));
  };

  const setInventoryWizardAddress = (address: InventoryAddress) => {
    dispatch(setInventoryWizardAddressSlice(address));
  };

  const setInventoryWizardDetails = (details: InventoryDetails) => {
    dispatch(setInventoryWizardDetailsSlice(details));
  };

  const setInventoryWizardPayments = (payments: InventoryPayments) => {
    dispatch(setInventoryWizardPaymentsSlice(payments));
  };

  return {
    // ? Properties
    currentStep,
    wizardAddress,
    wizardDetails,
    wizardPayments,

    // ? Methods
    resetInventoryWizard,
    setCurrentStep,
    setCustomStep,
    setInventoryWizardAddress,
    setInventoryWizardDetails,
    setInventoryWizardPayments,
    setNextStep,
    setPreviousStep,
  };
};
