export type MockUserProfile = {
  fullName: string
  email: string
  initials: string
  avatarUrl: string
  isPremium: boolean
  renewDate: string
  memberSince: string
  passwordLastUpdated: string
}

export type PasswordFormValues = {
  currentPassword: string
  newPassword: string
  confirmPassword: string
}
