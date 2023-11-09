import axios from 'axios';

interface IUser {
    id: number;
    email: string;
    name: string
  }

class UserGateway {
    private baseURL: string;

  constructor() {

    this.baseURL = 'https://nest-dmic-postgres.onrender.com/users';
  }

  async getAll(): Promise<IUser[]> {
    try {
      const response = await axios.get<IUser[]>(this.baseURL);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async delete(id: number): Promise<void> {
    try {
      await axios.delete(`${this.baseURL}/${id}`);
    } catch (error) {
      throw error;
    }
  }
}

export default UserGateway;
