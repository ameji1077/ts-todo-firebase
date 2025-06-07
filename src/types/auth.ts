export interface AuthFormInput {
  email: string;
  password: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  userId: string | null;
  email: string | null;
}