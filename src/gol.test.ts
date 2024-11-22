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

  it("should evolve a cell with neighbours", () => {
    const neighbourhood: CellState[][] = [
      ["DEAD", "DEAD", "DEAD"],
      ["DEAD", "ALIVE", "DEAD"],
      ["DEAD", "DEAD", "ALIVE"],
    ]
    const next = evolveNeighbourhood(neighbourhood)

    expect(next).toEqual("DEAD")
  })
});

type CellState = "ALIVE" | "DEAD";

const evolveCell = (cellState: CellState, livingNeighbours: number) => {
  switch (livingNeighbours) {
    case 1:
      return "DEAD";

    case 2:
      return cellState;
    case 3:
      return "ALIVE";
  }
  return livingNeighbours === 2 ? "ALIVE" : "DEAD";
};
