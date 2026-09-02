import type { Sponsorship } from 'sponsorkit'

export interface FeaturedSponsor {
  enabled: boolean
  /** Custom wordmark banner (e.g. Vercel) instead of an avatar in the grid. */
  customBanner?: boolean
  monthlyDollars?: number
  sponsor: Sponsorship['sponsor']
}

// Flip `enabled` to include an entry. Vercel uses a custom banner via
// composeAfter, not an avatar. Other companies without a custom logo are
// unshifted into the avatar grid when enabled.
export const featuredSponsors: FeaturedSponsor[] = [
  {
    enabled: false,
    customBanner: true,
    sponsor: {
      name: 'Vercel',
      login: 'vercel',
      type: 'Organization',
      linkUrl: 'https://vercel.com',
      websiteUrl: 'https://vercel.com',
      avatarUrl: 'https://avatars.githubusercontent.com/u/14985020?s=200&v=4',
    },
  },
]

export function isVercelBannerEnabled(): boolean {
  return featuredSponsors.some(
    entry => entry.enabled && entry.customBanner && entry.sponsor.login === 'vercel',
  )
}

export function getEnabledFeaturedAvatars(): Sponsorship[] {
  return featuredSponsors
    .filter(entry => entry.enabled && !entry.customBanner)
    .map(entry => ({
      monthlyDollars: entry.monthlyDollars ?? 2000,
      privacyLevel: 'PUBLIC',
      sponsor: entry.sponsor,
    }))
}
