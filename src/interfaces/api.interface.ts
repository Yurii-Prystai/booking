export interface ITokenResponse {
  token: string;
}

export interface IGetLocationResponse {
  id: number;
  city: string;
  country: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IGetTopLocationResponse {
  city: string;
  country: string;
  bookingCount: string;
}
