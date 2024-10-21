import { createSlice } from '@reduxjs/toolkit';

// ? Types
import type { PayloadAction } from '@reduxjs/toolkit';
import type {
  InventoryAddress,
  InventoryDetails,
  InventoryPayments,
} from '@/modules/inventory/types';

export interface InventoryStoreState {
  currentStep: number;
  wizardAddress?: InventoryAddress;
  wizardDetails?: InventoryDetails;
  wizardPayments?: InventoryPayments;
}

const initialState: InventoryStoreState = {
  currentStep: 0,
};

export const inventorySlice = createSlice({
  name: 'inventory',
  initialState,
  reducers: {
    setCurrentStep: (state, action: PayloadAction<number>) => {
      if (action.payload > 5 || action.payload < 0) return;
      state.currentStep = action.payload;
    },

    resetInventoryWizard: (state) => {
      state.currentStep = 0;
      state.wizardAddress = undefined;
      state.wizardDetails = undefined;
      state.wizardPayments = undefined;
    },

    setInventoryWizardAddress: (
      state,
      action: PayloadAction<InventoryAddress>
    ) => {
      state.wizardAddress = action.payload;
    },

    setInventoryWizardDetails: (
      state,
      action: PayloadAction<InventoryDetails>
    ) => {
      state.wizardDetails = action.payload;
    },

    setInventoryWizardPayments: (
      state,
      action: PayloadAction<InventoryPayments>
    ) => {
      state.wizardPayments = action.payload;
    },
  },
});

export const {
  setCurrentStep,
  resetInventoryWizard,
  setInventoryWizardAddress,
  setInventoryWizardDetails,
  setInventoryWizardPayments,
} = inventorySlice.actions;

export default inventorySlice;
