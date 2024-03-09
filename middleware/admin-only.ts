export default defineNuxtRouteMiddleware(() => {
  const authStore = useAuthStore();
  const { isAdmin, isAuthenticated } = storeToRefs(authStore);

  if (!isAuthenticated.value) {
    return navigateTo('/login');
  }
  if (!isAdmin.value) {
    return navigateTo('/');
  }
});
