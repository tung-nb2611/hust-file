export type Metadata = {
  total: number;
  page: number;
  limit: number;
};

export interface BaseFilter extends GridState {
  query?: string;
  created_on_min?: string;
  created_on_max?: string;
  status?: string;
  statuses?: string;
  ids?: string;
  location_ids?: string;
  export_type?: string;
  account_ids?: string;
}
export interface GridState {
  limit?: number;
  page?: number;
  sort_by?: string;
  sort_direction?: string;
  time?: number | null;
}
export interface IOMessage {
  message?: string;
  email?: string;
}
export type FileImportRequest = {
  bytes?: number[] | null;
  file_name?: string;
  file_size?: number;
  file_url?: string;
  base64?: string;
  tenant_id?: number;
  location_id?: number;
  destination_location_id?: number;
  delivery_service_provider_id?: number;
};

export type Pageable = {
  size: number;
  page: number;
};

export type FileResponse = {
  id?: number;
  description?: string;
  fileName?: string;
  fileDownloadUri?: string;
  fileType?: string;
  size?: number;
  status?: number;
  createOn?: Date;
  modifiedOn?: Date;
  path?: string;
}
export type ListFileResponse = {
  data: FileResponse[];
  metadata: Metadata;
}
export type FileFilterRequest = {
  query?: string;
  statuses?: string;
  page?: number;
  limit?: number;
  folderId?: number;
}
export type FileRequest = {
  description?: string;
}

export type FolderRequest = {
  name?: string;
  folderId?: number;
}