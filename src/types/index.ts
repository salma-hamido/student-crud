export interface LoginFormData {
      userName: string;
      password: string;
}

export interface LoginFormProps {
      onSubmit: (data: LoginFormData) => Promise<void>;
      sending: boolean;
}

export interface AuthContextType {
      isAuthenticated: boolean;
      user: User | null;
      login: (credentials: LoginCredentials) => Promise<void>;
      logout: () => void;
      loading: boolean;
}

export interface User {
      id: string;
      username: string;
}

export interface LoginCredentials {
      userName: string;
      password: string;
}

type RowSelected = {
      id?: string;
      firstName: string;
      lastName: string;
      birthDate: string;
      grade: {
            key: string;
            value: {
                  name: string;
                  cultureCode: number;
            };
      };
      country: string;
      city: string;
      phone: string;
      gender: {
            key: string;
            value: {
                  name: string;
                  cultureCode: number;
            };
      };
      remarks: string;
};
