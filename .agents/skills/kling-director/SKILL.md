---
name: kling-director
description: Direct and prompt short-form Kling image-to-video or text-to-video clips, including timed shot plans, camera motion, subject preservation, native audio, and pre-render checks. Use for Kling, Higgsfield Kling, social video, product reels, or turning supplied images into cinematic clips.
---

# Kling Director

Create production-ready Kling prompts without inventing current pricing, model access,
credit costs, or platform capabilities.

## Required inputs

Collect or infer only when safe:

- source image(s) and the intended role of each image;
- platform and aspect ratio (default to `9:16` for Reels/TikTok);
- exact duration;
- creative objective, subject, mood, and desired final beat;
- whether dialogue, music, sound design, captions, or a clean text-safe area is needed;
- non-negotiable visual details such as identity, logo, colors, UI, or product shape.

Do not start a paid render until the user has approved the final plan and cost. If live
pricing, free credits, model availability, or limits matter, verify them from the
provider immediately before recommending a model. Distinguish confirmed facts from
inferences and never describe an integration as installed unless it is actually
available in the current environment.

## Choose the workflow

1. Prefer **image-to-video** when the user supplies brand art, a character, product
   imagery, screenshots, or a composition that must be preserved.
2. Use **start/end frames** when the transformation or destination composition matters
   more than improvisational motion.
3. Use **multi-shot** only when the selected interface supports it and the story cannot
   be communicated as one continuous move. For clips under 10 seconds, prefer one shot
   or at most three clearly timed beats.
4. Use **text-to-video** only when no source composition needs to survive.

## Direct the clip

Build one causal visual idea rather than a list of unrelated effects. Allocate time in
seconds and make the final beat long enough to read. For a seven-second social clip,
use this default rhythm unless the concept requires another:

- `0.0–1.5s` — hook with an immediately legible subject and restrained motion;
- `1.5–5.0s` — develop one transformation or camera move;
- `5.0–7.0s` — resolve, reduce motion, and hold the hero composition.

Specify only camera moves that can coexist. Use concrete cinematography language such
as slow dolly-in, locked-off macro, orbit, crane, handheld follow, rack focus, or focal
length. State the subject action separately from camera motion. Describe lighting,
depth, material response, atmosphere, and motion cadence in observable terms.

Do not ask the video model to typeset important copy. Preserve a clean text-safe area
and add exact captions, logos, and calls to action in an editor after generation.

## Compose the generation prompt

Write the final prompt in this order:

1. **Format and intent** — duration, aspect ratio, genre, and commercial purpose.
2. **Opening frame** — subject, composition, environment, lighting, and lens.
3. **Timed motion** — chronological beats with subject action and camera behavior.
4. **Final frame** — exact resolved composition and how long it holds.
5. **Look and physics** — palette, materials, light, depth, motion quality, realism.
6. **Audio** — ambience, effects, music arc, and dialogue only when supported.
7. **Preservation constraints** — what must remain unchanged.

Use positive, specific instructions. Keep the main prompt coherent; do not pad it with
synonym chains. Put failure prevention in a short constraints block, for example:

```text
Preserve the supplied character's identity, silhouette, proportions, costume, palette,
and emblem. Maintain stable anatomy and consistent geometry. No extra characters,
unmotivated cuts, camera shake, flicker, warping, duplicated objects, or generated text.
```

When animating UI or artwork, request parallax, light travel, particles, camera depth,
and localized secondary motion rather than asking every element to morph.

## Output contract

Return these sections:

### Recommended setup

- workflow/model, with live availability clearly marked as verified or unverified;
- duration, aspect ratio, resolution, source-frame mapping, and audio setting;
- a one-sentence explanation of why the setup fits.

### Director timeline

A compact table with timecode, picture, camera, and audio columns.

### Final Kling prompt

One paste-ready prompt, followed by a separate preservation/negative block if the
interface provides such a field.

### Post-production

List exact copy overlays, logo placement, sound finishing, and export notes. Keep vital
text inside social-platform safe zones.

### Pre-render check

Confirm source-image quality, aspect ratio, duration, model capability, estimated
credit cost, remaining allowance, output count, and user approval. Mark unknown live
values as `VERIFY IN HIGGSFIELD` rather than guessing.

## Quality gate

Before delivering, ensure that:

- all timed beats fit within the requested duration;
- the camera instruction is physically coherent;
- the subject has one primary action per beat;
- preservation requirements are explicit;
- no essential copy depends on AI-generated lettering;
- current pricing/free-tier claims are sourced or clearly unverified;
- the prompt can be pasted without explanatory prose.
