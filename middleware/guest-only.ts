export default defineNuxtRouteMiddleware(() => {
  const authStore = useAuthStore();
  const { isAuthenticated } = storeToRefs(authStore);

  if (isAuthenticated.value) {
    if (process.server) return navigateTo('/');
    return abortNavigation();
  }
});
