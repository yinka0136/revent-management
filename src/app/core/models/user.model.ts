export interface ICurrentUser {
  email: string;
  id: string;
  isVerified: true;
  jwToken: string;
  refreshToken: string;
  refreshTokenExpiration: string;
  role: string;
  tokenExpires: string;
  userId: string;
  userName: string;
  currentSubscription: currentPlan;
}

export class currentPlan {
  constructor(
    public accessCode: string,
    public amount: number,
    public apiCallCountUsed: number,
    public durationInMonth: number,
    public endDate: string,
    public isActive: boolean,
    public paymentStatusId: number,
    public plan: string,
    public planId: string,
    public referenceNo: string,
    public startDate: string
  ) {}
}
