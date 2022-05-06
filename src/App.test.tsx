import { arrayDataIsVerified } from "./utils";

const bowieAlbums = [
  "Space Oddity",
  "The Man Who Sold the World",
  "Hunky Dory",
  "Ziggy Stardust"
];

test("validates array data", () => {
  expect(arrayDataIsVerified(bowieAlbums)).toBeTruthy();
});