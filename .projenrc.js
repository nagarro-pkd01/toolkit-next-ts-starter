const { JsonFile, Project } = require("projen");

const project = new Project({
  name: "toolkit-next-ts-starter",
  defaultReleaseBranch: "main",
});

new JsonFile(project, ".projen/project-metadata.json", {
  obj: {
    managedBy: "projen",
    stack: "nextjs-strict-typescript-template",
    notes: [
      "Run `npm run projen` after changing .projenrc.js",
      "Core project lifecycle and metadata are tracked here",
    ],
  },
});

project.synth();
