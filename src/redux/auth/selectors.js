export const selectIsLoggedIn = state => state.auth.isLoggedIn;

export const selectUser = state => state.auth.user;

export const selectUserLoading = state => state.auth.isLoadingIn;

export const selectUserError = state => state.auth.error;

export const selectIsRefreshing = state => state.auth.isRefreshing;
