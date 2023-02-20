export const INITIAL_VIEW_STATE = {
  latitude: 50.7751,
  longitude: 12.4193,
  zoom: 3,
  bearing: 0,
  pitch: 0,
};

export const MOBILE_BREAKPOINT = 768;

export const MOCK_USER_DATA = {
  userAccount: {
    reviews: [
      {
        id: 6,
        email: "kevinmitch14@gmail.com",
        place_id: "ChIJ-7S4cNcmGJYR5Unb2U_q6XU",
        rating: 4,
      },
    ],
    bookmarks: [
      {
        place_id: "ChIJ-7S4cNcmGJYR5Unb2U_q6XU",
        latitude: -41.31782359999999,
        longitude: -72.9820656,
        name: "Cassis Cafe",
        updatedAt: new Date(),
      },
      {
        place_id: "ChIJ98Er0TGRW0gReN0fnKQRzv0",
        latitude: 53.2906203,
        longitude: -8.986531400000001,
        name: "Grind Briarhill",
        updatedAt: new Date(),
      },
    ],
  },
} as const
