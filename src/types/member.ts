export interface Member {
  id: string
  displayName: string
  avatar: string
  largeImage?: string
  role?: string
  bio?: string
  tags?: string[]
  joinDate?: string
  location?: string
  sources?: string[]
}

export interface SiteConfig {
  siteTitle: string
  baseUrl: string
  contactWebhook: string
  defaultAvatar: string
}

export interface MemberDataResponse {
  members: Member[]
  loading: boolean
  error?: string
}
