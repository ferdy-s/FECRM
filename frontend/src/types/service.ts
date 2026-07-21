export interface Service {
  id: string;
  name: string;
  price: string | number;
}

export interface CreateServiceDto {
  name: string;
  price: number;
}

export interface UpdateServiceDto {
  name?: string;
  price?: number;
}