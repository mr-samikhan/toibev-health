export interface CreateAdminDto {
  email: string;
  username: string;
  password: string;
  permissionLevel: string;
}

export interface UpdateAdminDto {
  id: string;
  email: string;
  username: string;
  permissionLevel: string;
}
