import site from "./src/_data/site.js";

export default function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("src/assets");
  return {
    pathPrefix: site.pathPrefix,
    dir: { input: "src", output: "_site" }
  };
}
