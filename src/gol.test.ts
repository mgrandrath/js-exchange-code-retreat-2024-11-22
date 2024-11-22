import { describe, expect, it } from "vitest";

describe("GOL rules", () => {
  it("cell dies because of under population", () => {
    const next = evolveCell("ALIVE", 2);

    expect(next).toEqual("DEAD");
  });
});
