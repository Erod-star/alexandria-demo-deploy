export interface AlexandriaApiSuccessResponse {
  status_code: number;
  timestamp: string;
}

export interface AlexandriaApiErrorResponse {
  code: number;
  path: string;
  timestamp: string;
  message: string;
}
