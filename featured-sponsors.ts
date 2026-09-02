import type { Sponsorship } from 'sponsorkit'

export interface FeaturedSponsor {
  enabled: boolean
  monthlyDollars: number
  sponsor: Sponsorship['sponsor']
}

// Flip `enabled` to include an entry in the generated image. Disabled
// entries are not unshifted, so they do not appear in sponsors.svg.
export const featuredSponsors: FeaturedSponsor[] = [
  {
    enabled: false,
    monthlyDollars: 2000,
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

export function getEnabledFeaturedSponsors(): Sponsorship[] {
  return featuredSponsors
    .filter(entry => entry.enabled)
    .map(entry => ({
      monthlyDollars: entry.monthlyDollars,
      privacyLevel: 'PUBLIC',
      sponsor: entry.sponsor,
    }))
}
