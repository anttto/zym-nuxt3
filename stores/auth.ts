import { getUser } from '~/composables/auth/userData';
import type { UserWithoutPassword } from '~/types/user';

export const useAuthStore = defineStore(
  'auth',
  () => {
    // const authUser = ref<Maybe<UserWithoutPassword>>();
    const authUser = ref<UserWithoutPassword | null>();

    // Sign In
    const signIn = (email: string, password: string) => {
      const fonndUser = getUser(email, password); // 유저 DB 에서 일치하는 User 조회
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
    const signOut = () => setUser(null);

    return {
      user: authUser,
      isAuthenticated: computed(() => !!authUser.value),
      isAdmin: computed(() =>
        !authUser.value ? false : authUser.value.roles.includes('ADMIN'),
      ),
      signIn,
      signOut,
    };
  },
  {
    persist: true,
  },
);
