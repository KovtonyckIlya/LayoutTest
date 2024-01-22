
const initialState = {
  refreshToken: "",
  accessToken: "",
  driverId: "",
  role: "",
  expires: "",
  claims: "",
  driverStatus: false,
  carId: "",
  appVisible: false

};

export const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};