export interface IAuth {
  isLoadingAuth: boolean;
  data: { auth_token: string } | null;
  errorAuth: unknown;
  isLoadingRegister: boolean;
  register: unknown;
  errorRegister: unknown;
}
