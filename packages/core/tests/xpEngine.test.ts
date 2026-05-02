import { describe, it, expect } from "vitest";
import { calculateLevel, xpProgressInLevel, addXp } from "../src/engine/xpEngine";
import type { Player } from "../src/schema/Player";

function makePlayer(xpTotal: number, level: number): Player {
  return { id: "p1", name: "Test", activeArchetypeId: "rocker", xpTotal, level, nodeProgress: {} };
}

describe("calculateLevel", () => {
  it("level 1 at 0 XP", () => expect(calculateLevel(0)).toBe(1));
  it("level 1 at 99 XP", () => expect(calculateLevel(99)).toBe(1));
  it("level 2 at 100 XP", () => expect(calculateLevel(100)).toBe(2));
  it("level 2 at 219 XP", () => expect(calculateLevel(219)).toBe(2));
  it("level 3 at 220 XP", () => expect(calculateLevel(220)).toBe(3));
});

describe("xpProgressInLevel", () => {
  it("returns 50% at midpoint of level 1 (50 XP)", () => {
    const { current, required, percent } = xpProgressInLevel(50);
    expect(current).toBe(50);
    expect(required).toBe(100);
    expect(percent).toBeCloseTo(0.5);
  });

  it("returns 50% at midpoint of level 2 (160 XP)", () => {
    // Level 2 starts at 100 XP, costs 120 XP; midpoint = 100 + 60 = 160
    const { current, required, percent } = xpProgressInLevel(160);
    expect(current).toBe(60);
    expect(required).toBe(120);
    expect(percent).toBeCloseTo(0.5);
  });
});

describe("addXp", () => {
  it("does not mutate the input player", () => {
    const player = makePlayer(99, 1);
    addXp(player, 1);
    expect(player.xpTotal).toBe(99);
    expect(player.level).toBe(1);
  });

  it("triggers level-up when XP crosses threshold", () => {
    const result = addXp(makePlayer(99, 1), 1);
    expect(result.xpTotal).toBe(100);
    expect(result.level).toBe(2);
  });

  it("no level-up when threshold not crossed", () => {
    const result = addXp(makePlayer(0, 1), 50);
    expect(result.xpTotal).toBe(50);
    expect(result.level).toBe(1);
  });
});
