export type ApiResponse<T> = ApiSuccess<T> | ApiFailure;

export type ApiPaginatedResponse<T> = ApiPaginatedSuccess<T> | ApiFailure;

export interface ApiSuccess<T> {
  data: T;
}

export interface PaginationMeta {
  total: number;
  count: number;
  page: number;
  next: number | null;
  prev: number | null;
}

export interface ApiPaginatedSuccess<T> {
  data: T[];
  pagination: PaginationMeta;
}

export interface ApiFailure {
  message: string;
}
