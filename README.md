# Advera Creative website

Official public website: https://advera-creative.onrender.com/

Source: a simple static HTML/CSS site with no build dependencies. Public design examples are explicitly speculative; don't claim past client results.

## Publishing

Render service: https://dashboard.render.com/static/srv-dbomr65g1s2s73fn0cp0
Workspace: Advera's workspace
Git branch: `main`
Build command: `echo 'Static site ready'`
Publish directory: `.`

**Important:** This service was initially created from the public GitHub repository URL, not a Render-connected Git provider credential. Consequently the service may report `autoDeploy: yes` yet not detect new commits. After changing files, manually deploy the latest commit using Render's dashboard until GitHub is connected *inside Render*.

To enable GitHub auto-deploy: in Render Account Settings, add GitHub to Git Deployment Credentials, grant the Render GitHub application repository access to `creativeadvera-arch/advera-website`, and ensure the service's Git Credentials/Auto-Deploy setting uses that connection. Verify success with an actual test commit and a corresponding new Render deployment; don't presume a setting alone proves it works.

## Site files

- `index.html`: approved main landing page, pricing, services, FAQs and email CTA
- `privacy.html`: public enquiry data-handling notice
- `favicon.svg`: site browser icon
- `robots.txt`, `sitemap.xml`: crawler guidance
- `render.yaml`: static site Blueprint for reference

No direct payment processor, website analytics, client portal or lead form has been configured. Leads contact `creativeadvera@gmail.com` via email links. Don't add scripts or additional data collection without updating the privacy notice.
