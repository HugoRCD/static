Host for static files

## CDN Usage

```
https://cdn.jsdelivr.net/gh/hugorcd/static/sponsors.svg
```

## Sponsors

<p align="center">
  <a href="https://cdn.jsdelivr.net/gh/hugorcd/static/sponsors.svg">
    <img src='https://cdn.jsdelivr.net/gh/hugorcd/static/sponsors.svg' alt="HugoRCD sponsors" />
  </a>
</p>

## Regenerating the sponsors image

The `Scheduler` workflow runs SponsorKit daily at 00:00 UTC, and on pushes to `main` that change `sponsorkit.config.ts`, `package.json`, `pnpm-lock.yaml`, or `.github/workflows/scheduler.yml`.

### Required secret

Add a repository secret named **`SPONSORKIT_GITHUB_TOKEN`**:

1. Create a [classic personal access token](https://github.com/settings/tokens) with the `read:user` and `read:org` scopes.
2. Store it under **Settings → Secrets and variables → Actions**.

`GITHUB_TOKEN` is not a substitute. It can list public sponsors, but GitHub omits dollar amounts, and SponsorKit then drops those sponsors from the image.

### Manual run

Open **Actions → Scheduler → Run workflow**.

If GitHub shows that the schedule was disabled after 60 days of inactivity, click **Enable workflow** on that page (or run `gh workflow enable Scheduler`) after merging. Daily commits of `.github/last-sponsors-run` keep the cron enabled even when the sponsor list is unchanged.

### Local generation

Set `SPONSORKIT_GITHUB_TOKEN` in your environment or a secret manager (do not paste it on the command line; that can land in shell history):

```sh
printf 'SPONSORKIT_GITHUB_TOKEN: '
read -s SPONSORKIT_GITHUB_TOKEN
echo
export SPONSORKIT_GITHUB_TOKEN
export SPONSORKIT_GITHUB_LOGIN=hugorcd
pnpm i
pnpm build
```
