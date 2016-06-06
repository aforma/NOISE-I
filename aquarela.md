## Aquarela

Boilerplate for high-res generative artwork. (WIP)

### Usage:
Write your generative code using the HTML Canvas API inside `src/scripts/sketchjs`

You can preview your artwork inside the browser running `npm start`

`npm run print` to run your algorithm in a server-based canvas (`node-canvas`).

When your algorithm is complete, just call `env.done` to save the image at `print/NAME_OF_THE_ARTWORK`.

If you want to save an image, but continue to run the algorithm, call `env.save`.

