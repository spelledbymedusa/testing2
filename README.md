# testing2

## Project skills

This repository includes a reusable [Kling Director skill](.agents/skills/kling-director/SKILL.md)
for planning short-form Kling image-to-video clips. It is intentionally model- and
platform-aware, but requires the operator to verify live model availability, pricing,
credits, and duration limits before promising a render.

Ask the agent to “use Kling Director” and provide the source image(s), target platform,
duration, and creative goal. The skill returns a timed shot plan, a ready-to-paste
generation prompt, preservation constraints, and a pre-render checklist.
