export interface Profile {
  email: string;
  family_name: string;
  given_name: string;
  id: number;
  name: string;
  picture: string;
  verified_email: boolean;
}

export interface DashbordProps {
  profile: Profile;
  logOut: React.MouseEventHandler<HTMLButtonElement>;
}
