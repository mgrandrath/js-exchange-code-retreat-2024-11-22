import { describe, expect, it } from "vitest";

describe("GOL rules", () => {
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
});

type CellState = "ALIVE" | "DEAD";


const evolveCell = (cellState: CellState, livingNeighbours: number) => {
  switch (livingNeighbours) {
    case 1:
      return "DEAD";
    case 2:
      case 3:
        return "ALIVE"

  }
  return livingNeighbours === 2 ? "ALIVE" : "DEAD";
};
