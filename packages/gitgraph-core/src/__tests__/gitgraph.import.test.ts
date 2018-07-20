import "jest";
import { GitgraphCore } from "../";
import { readFileSync } from "fs";
import { join } from "path";
import { Template } from "../template";

describe("Gitgraph.import", () => {
  it("should render two commits from git2json", () => {
    const data = JSON.parse(
      readFileSync(join(__dirname, "./git2json-two-commits.json"), "utf-8"),
    );

    const gitgraph = new GitgraphCore();
    gitgraph.import(data);
    const { commits } = gitgraph.getRenderedData();

    expect(commits).toMatchObject([
      {
        subject: "second",
        x: 0,
        y: 80,
      },
      {
        subject: "first",
        x: 0,
        y: 0,
      },
    ]);
  });

  it("should render two branches from git2json", () => {
    const data = JSON.parse(
      readFileSync(join(__dirname, "./git2json-two-branches.json"), "utf-8"),
    );

    const gitgraph = new GitgraphCore();
    gitgraph.import(data);
    const { commits } = gitgraph.getRenderedData();

    expect(commits).toMatchObject([
      {
        subject: "third",
        x: 0,
        y: 160,
      },
      {
        subject: "second",
        x: 50,
        y: 80,
      },
      {
        subject: "first",
        x: 0,
        y: 0,
      },
    ]);
  });

  it("should compute style for 2 branches", () => {
    const data = JSON.parse(
      readFileSync(join(__dirname, "./git2json-two-branches.json"), "utf-8"),
    );

    const template = new Template({
      colors: ["red", "green", "blue"],
    });
    const gitgraph = new GitgraphCore({ template });
    gitgraph.import(data);
    const { commits } = gitgraph.getRenderedData();

    expect(commits).toMatchObject([
      {
        subject: "third",
        style: {
          color: "red",
        },
      },
      {
        subject: "second",
        style: {
          color: "green",
        },
      },
      {
        subject: "first",
        style: {
          color: "red",
        },
      },
    ]);
  });
});
