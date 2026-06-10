export type ApiSuccess<T> = {
  data: T;
  success: true;
};

export type ApiFailure = {
  error: string;
  success: false;
};

export type ApiResponse<T> = ApiSuccess<T> | ApiFailure;
