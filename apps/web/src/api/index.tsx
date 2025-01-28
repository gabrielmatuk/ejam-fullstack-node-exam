import { API_URL } from '@/const';
import { Superhero } from '@/types';
import axios, { AxiosInstance } from 'axios';

export class ApiService {
  private axiosInstance: AxiosInstance;
  private apiToken: string;

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: API_URL,
    })
    this.apiToken = 'secret';
    this.axiosInstance.interceptors.request.use((config) => {
      config.headers['Authorization'] = `Bearer ${this.apiToken}`;
      return config;
    });
  }

  async getSuperheroes() {
    const response = await this.axiosInstance.get('/superheroes');
    return response.data;
  }

  async createSuperhero(superhero: Superhero) {
    const response = await this.axiosInstance.post('/superheroes', superhero);
    return response.data;
  }
}