import type { UserWithoutPassword } from '~/types/user';

export const useAuthStore = defineStore(
  'auth',
  () => {
    // const authUser = ref<Maybe<UserWithoutPassword>>();
    const authUser = ref<UserWithoutPassword | null>();

    // Sign In
    const signIn = async (email: string, password: string) => {
      const data = await $fetch<{ user: UserWithoutPassword }>('/auth/login', {
        method: 'POST',
        body: {
          email,
          password,
        },
      });

      const { user: fonndUser } = data; // 유저 DB 에서 일치하는 User 조회

      if (!fonndUser) {
        throw createError({
          statusCode: 401,
          statusMessage: 'Invalid email or password',
        });
      }
      setUser(fonndUser); // User 존재 하면 authUser로 전달
    };

    // User 상태 관리
    const setUser = (user: Maybe<UserWithoutPassword>) =>
      (authUser.value = user);

    // Sign Out
    const signOut = async () => {
      await $fetch('/auth/logout', { method: 'POST' });
      setUser(null);
    };

    const fetchUser = async () => {
      const data = await $fetch<{ user: UserWithoutPassword }>('/auth/user', {
        headers: useRequestHeaders(['cookie']),
      });
      setUser(data.user);
    };

    return {
      user: authUser,
      isAuthenticated: computed(() => !!authUser.value),
      isAdmin: computed(() =>
        !authUser.value ? false : authUser.value.roles.includes('ADMIN'),
      ),
      signIn,
      signOut,
      fetchUser,
    };
  },
  {
    persist: true,
  },
);
