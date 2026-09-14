# Our Secret Garden

Create a beautiful single-page website (no tabs, no multi-page navigation) that feels like a personal, intimate digital keepsake for my girlfriend’s 22nd birthday.

Overall feeling & tone

Soft, warm, loving and personal — not formal or “generous gift.” It should feel like something written quietly between two people who talk every day. Natural affection, gentle intimacy, the kind of care that already exists in our calls and poems. Avoid anything that sounds like charity or distance.

Visual style

Old bookish + floral aesthetic

Dominant colors: warm cream/off-white, soft brown, muted sage green

Realistic soft pink and white tulips (her favorite flower) used generously but elegantly — some as corner frames, some scattered, some as subtle decorations

Subtle aged paper / parchment texture in the background

Elegant serif typography for a classic book feel

Clean, refined, modern UI/UX with generous white space and smooth interactions

Fully responsive (beautiful on both phone and desktop)

Structure (single page only)

Hero / opening section

Soft tulip arrangement

A short, warm, personal opening message that feels loving and close (not generic). Something that quietly says this was made with real care and affection for her.

A gentle call-to-action like “Begin reading” or “Open the poems”

The 22 Poems section

Present all 22 poems in a smooth, elegant way on the same page (vertical scroll with clear poem cards, or a soft horizontal book-like pager, or a gentle flip-style experience — choose whatever feels most bookish and pleasant).

Each poem should have its own clear space so it feels like turning a page.

Load the poems from a simple JSON array so they are easy to edit later.

JSON structure example:

[

  {

    "title": "Poem title here",

    "content": "Line 1\nLine 2\nLine 3\nLine 4\nLine 5\nLine 6\nLine 7\nLine 8"

  }

]

Start with 22 placeholder poems (I will replace the content later). Each should be formatted as an 8-line poem.

Closing section

Soft, quiet closing note that feels intimate and real.

Small tulip details again.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/11ce948a-f000-475e-a424-f9adc990687f).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
