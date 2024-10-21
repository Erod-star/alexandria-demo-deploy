// ? Slices
import calendarSlice from './calendar/calendarSlice';
import inventorySlice from './inventory/inventorySlice';

const reducers = {
  calendar: calendarSlice.reducer,
  inventory: inventorySlice.reducer,
};

export default reducers;
