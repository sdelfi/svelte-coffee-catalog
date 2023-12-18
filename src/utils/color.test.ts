import { randomFlatColor } from "./color";

describe("randomFlatColor", () => {
  it("Генерирует корректное значение цвета", () => {
    const colorRegex = /^#[0-9a-fA-F]{6}$/;

    const color = randomFlatColor();
    expect(color).toMatch(colorRegex);
  });
});
