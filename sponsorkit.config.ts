import { defineConfig, tierPresets } from 'sponsorkit'
// @ts-ignore
import fs from 'fs/promises'

export default defineConfig({
  // Providers configs
  github: {
    login: 'hugorcd',
    type: 'user',
  },
  width: 800,
  renderer: 'tiers',
  formats: ['svg', 'png'],
  tiers: [
    // Past sponsors
    {
      title: 'Past Sponsors',
      monthlyDollars: -1,
      preset: tierPresets.xs,
    },
    // $4 tier - Coffee
    {
      title: 'Backers',
      preset: tierPresets.base,
    },
    // $8 tier - Early access
    {
      title: 'Early Adopters',
      monthlyDollars: 8,
      preset: tierPresets.base,
    },
    // $16 tier - Priority support
    {
      title: 'Sponsors',
      monthlyDollars: 16,
      preset: tierPresets.medium,
    },
    // $32 tier - Vote on features
    {
      title: 'Developers',
      monthlyDollars: 32,
      preset: tierPresets.medium,
    },
    // $64 tier - Silver
    {
      title: 'Silver Sponsors',
      monthlyDollars: 64,
      preset: tierPresets.large,
    },
    // $128 tier - Gold
    {
      title: 'Gold Sponsors',
      monthlyDollars: 128,
      preset: tierPresets.large,
    },
    // $256 tier - Platinum
    {
      title: 'Platinum Sponsors',
      monthlyDollars: 256,
      preset: tierPresets.large,
    },
    // $512 tier - Diamond
    {
      title: 'Diamond Sponsors',
      monthlyDollars: 512,
      preset: tierPresets.xl,
    },
    // $1024 tier - Special
    {
      title: 'Special Sponsors',
      monthlyDollars: 1024,
      preset: tierPresets.xl,
    },
  ],
  outputDir: '.',
  async onSponsorsReady(sponsors) {
    await fs.writeFile(
      'sponsors.json',
      JSON.stringify(
        sponsors
          .filter((i) => i.privacyLevel !== 'PRIVATE')
          .map((i) => {
            return {
              name: i.sponsor.name,
              login: i.sponsor.login,
              avatar: i.sponsor.avatarUrl,
              amount: i.monthlyDollars,
              link: i.sponsor.linkUrl || i.sponsor.websiteUrl,
              org: i.sponsor.type === 'Organization'
            }
          })
          .sort((a, b) => b.amount - a.amount),
        null,
        2
      )
    )
  },

  // Additional renders for different formats
  renders: [
    {
      name: 'sponsors',
      width: 800,
    },
    {
      name: 'sponsors.wide',
      width: 1800,
    },
    {
      name: 'sponsors.high-tier',
      width: 800,
      filter: (sponsor) => sponsor.monthlyDollars >= 64
    },
    {
      name: 'sponsors.mid-tier',
      width: 800,
      filter: (sponsor) => sponsor.monthlyDollars >= 16 && sponsor.monthlyDollars < 64
    },
    {
      name: 'sponsors.base-tier',
      width: 800,
      filter: (sponsor) => sponsor.monthlyDollars < 16 && sponsor.monthlyDollars >= 0
    },
    {
      name: 'sponsors.past',
      width: 800,
      filter: (sponsor) => sponsor.monthlyDollars < 0
    },
    {
      name: 'sponsors.circles',
      width: 1000,
      includePastSponsors: true,
      renderer: 'circles',
      circles: {
        radiusPast: 3
      }
    }
  ]
})
