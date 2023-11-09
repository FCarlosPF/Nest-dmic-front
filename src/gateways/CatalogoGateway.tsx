import axios from 'axios';

interface CatalogoItem {
  iqms: number;
  familia: string;
  molde: string;
  foto: string;
}

class CatalogoGateway {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  // Obtener todos los elementos
  async getAll(): Promise<CatalogoItem[]> {
    try {
      const response = await axios.get<CatalogoItem[]>(this.baseUrl);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  // Obtener un elemento por su ID
  async getById(iqms: number): Promise<CatalogoItem> {
    try {
      const response = await axios.get<CatalogoItem>(`${this.baseUrl}/${iqms}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  // Agregar un nuevo elemento
  async create(data: CatalogoItem): Promise<CatalogoItem> {
    try {
      const response = await axios.post<CatalogoItem>(this.baseUrl, data);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  // Actualizar un elemento por su ID
  async update(iqms: number, data: CatalogoItem): Promise<CatalogoItem> {
    try {
      const response = await axios.put<CatalogoItem>(`${this.baseUrl}/${iqms}`, data);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  // Eliminar un elemento por su ID
  async delete(iqms: number): Promise<void> {
    try {
      await axios.delete(`${this.baseUrl}/${iqms}`);
    } catch (error) {
      throw error;
    }
  }
}

export default CatalogoGateway;