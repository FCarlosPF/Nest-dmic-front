import axios, { AxiosResponse } from 'axios';

interface RegisterAuthDto {
  email: string;
  password: string;
  nombre?: string
}

interface LoginAuthDto {
  email: string;
  password: string;
}



class AuthGateway {
  private baseURL: string;


  constructor() {
    this.baseURL = 'http://localhost:3000/auth';

  }

  public async register(user: RegisterAuthDto): Promise<AxiosResponse> {
    try {
      const response = await axios.post(`${this.baseURL}/register`, user);
      return response;
    } catch (error) {
      throw error;
    }
  }

  public async login(user: LoginAuthDto): Promise<AxiosResponse> {
    try {
      const response = await axios.post(`${this.baseURL}/login`, user);
      return response;
    } catch (error) {
      throw error;
    }

    
  }
  
}

export default AuthGateway;
