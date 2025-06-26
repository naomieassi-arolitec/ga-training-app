import { describe, expect, it } from "bun:test";
import { asciiArt } from "./ascii";

describe("asciiArt", () => {
	it("renders a single letter", () => {
		const result = asciiArt("A");
		expect(result).toContain("  A  ");
		expect(result).toContain("AAAAA");
	});

	it("renders a word", () => {
		const result = asciiArt("AB");
		expect(result.split("\n")[0]).toBe("  A   BBBB ");
	});

	it("renders numbers", () => {
		const result = asciiArt("10");
		expect(result.split("\n")[0]).toBe("  1    000 ");
	});

	it("renders unknown characters as ?", () => {
		const result = asciiArt("@");
		expect(result).toContain("?????");
	});

	it("renders spaces", () => {
		const result = asciiArt("A A");
		expect(result.split("\n")[0]).toBe("  A           A  ");
	});

	// Additional test cases

	it("renders lowercase letters as uppercase", () => {
		const result = asciiArt("abc");
		// Should match the uppercase version
		const upperResult = asciiArt("ABC");
		expect(result).toBe(upperResult);
	});

	it("renders a mix of letters and numbers", () => {
		const result = asciiArt("A1B2");
		// Just check that both letters and numbers are present in the output
		expect(result).toContain("A");
		expect(result).toContain("1");
		expect(result).toContain("B");
		expect(result).toContain("2");
	});

	it("renders multiple spaces", () => {
		const result = asciiArt("A  B");
		// There should be a wide gap between the A and B
		expect(result.split("\n")[0]).toMatch(/A\s{6,}B/);
	});

	it("renders an empty string as empty", () => {
		const result = asciiArt("");
		expect(result).toBe("");
	});

	it("renders a long word", () => {
		const result = asciiArt("HELLO");
		// Just check that all letters are present in the output
		expect(result).toContain("H");
		expect(result).toContain("E");
		expect(result).toContain("L");
		expect(result).toContain("O");
	});

	it("renders all unknown characters as ?", () => {
		const result = asciiArt("!@#$");
		// All lines should be only question marks and spaces
		const lines = result.split("\n");
		for (const line of lines) {
			const noSpaces = line.replace(/\s/g, "");
			if (noSpaces.length === 0) continue; // skip empty lines
			expect(noSpaces).toMatch(/^\?+$/);
		}
	});

	it("renders a string with trailing and leading spaces", () => {
		const result = asciiArt(" A ");
		// The output should have extra space at the start and end
		expect(result.split("\n")[0]?.startsWith("     ")).toBe(true);
		expect(result.split("\n")[0]?.endsWith("     ")).toBe(true);
	});
});
