import type { UserProfile } from "@/modules/user";

type UserState = {
  profile: UserProfile | null;
};

export const userStore: UserState = {
  profile: null,
};
