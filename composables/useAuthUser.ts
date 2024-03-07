import type { UserWithoutPassword } from '~/types/user';

const authUser = ref<Maybe<UserWithoutPassword>>(null); // 로그인 한 유저를 관리
// 로그인 한 유저 관리 (로그인 상태 유무, 어드민 권한 유무)
export const useAuthUser = () => {
  const isAuthenticated = computed(() => !!authUser.value);
  const isAdmin = computed(() => !!authUser.value?.roles.includes('ADMIN'));

  return {
    authUser,
    isAuthenticated,
    isAdmin,
  };
};
