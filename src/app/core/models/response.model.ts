export interface ResponseModel<T> {
  succeeded: boolean;
  errors: string[];
  data: T;
  message: string;
}

export class PaginationResponse {
  pageNumber!: number;
  pageSize!: number;
  totalItems!: number| null;
  totalPages!: number|null;
}

export interface SearchDTO {
  search: string;
  pageNumber: number;
  pageSize: number;
  lCApplicationDate?: string;
  statusId?: number;
}

export const InitialPageResponse = {
  pageNumber: 1,
  pageSize: 2,
  totalItems: null,
  totalPages: null,
};
export const InitialSearchDTO = {
  search: '',
  pageNumber: 1,
  pageSize: 8,
  statusId: 1,
};

export interface ApplicationResponseDTO {
  lcApplicationId: number;
  applicantName: string;
  beneficiaryName: string;
  valueInFigure: string;
  dateSubmitted: string;
  expiryDate: string;
}

export const pageSizeOptionsDTO = [5, 10, 25, 100];
