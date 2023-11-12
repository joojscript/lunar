export type ScanType = {
  id: string;
  hostId: string;
  port: number;
  protocol: string;
  service: string;
  state: string;
  reason: string;
  createdAt: Date;
  updatedAt: Date;
};

export type UserType = {
  email: string;
  firstName?: string;
  lastName?: string;
  createdAt: Date;
  updatedAt: Date;
};
