import { describe, expect, it } from "vitest";

describe("GOL rules", () => {
  it.each`
    cellState  | neighbours | expectedCellState
    ${"ALIVE"} | ${0}       | ${"DEAD"}
    ${"ALIVE"} | ${1}       | ${"DEAD"}
    ${"ALIVE"} | ${2}       | ${"ALIVE"}
    ${"ALIVE"} | ${3}       | ${"ALIVE"}
    ${"ALIVE"} | ${4}       | ${"DEAD"}
    ${"ALIVE"} | ${5}       | ${"DEAD"}
    ${"ALIVE"} | ${6}       | ${"DEAD"}
    ${"ALIVE"} | ${7}       | ${"DEAD"}
    ${"ALIVE"} | ${8}       | ${"DEAD"}
    ${"DEAD"}  | ${0}       | ${"DEAD"}
    ${"DEAD"}  | ${1}       | ${"DEAD"}
    ${"DEAD"}  | ${2}       | ${"DEAD"}
    ${"DEAD"}  | ${3}       | ${"ALIVE"}
    ${"DEAD"}  | ${4}       | ${"DEAD"}
    ${"DEAD"}  | ${5}       | ${"DEAD"}
    ${"DEAD"}  | ${6}       | ${"DEAD"}
    ${"DEAD"}  | ${7}       | ${"DEAD"}
    ${"DEAD"}  | ${8}       | ${"DEAD"}
  `("test %", ({ cellState, neighbours, expectedCellState }) => {
    const next = evolveCell(cellState, neighbours);

    expect(next).toEqual(expectedCellState);
  });

  it("cell dies because of under population", () => {
    const next = evolveCell("ALIVE", 0);

    expect(next).toEqual("DEAD");
  });

  it("cell dies because of under population", () => {
    const next = evolveCell("ALIVE", 1);

    expect(next).toEqual("DEAD");
  });

  it("survives with two neighbours", () => {
    const next = evolveCell("ALIVE", 2);

    expect(next).toEqual("ALIVE");
  });

  it("survives with three neighbours", () => {
    const next = evolveCell("ALIVE", 3);

    expect(next).toEqual("ALIVE");
  });

  it("dies because of overcrowding", () => {
    const next = evolveCell("ALIVE", 4);

    expect(next).toEqual("DEAD");
  });

  it("three cells reproduce", () => {
    const next = evolveCell("DEAD", 3);

    expect(next).toEqual("ALIVE");
  });
});

type CellState = "ALIVE" | "DEAD";

const evolveCell = (cellState: CellState, livingNeighbours: number) => {
  switch (livingNeighbours) {
    case 1:
      return "DEAD";

    case 2:
    case 3:
      return "ALIVE";
  }
  return livingNeighbours === 2 ? "ALIVE" : "DEAD";
};
