import { uniqId } from "@/utils/uniqId";

describe("uniqId", () => {
  test("Возвращает уникальный идентификатор", () => {
    const id1 = uniqId();
    const id2 = uniqId();

    expect(typeof id1).toBe("string");
    expect(typeof id2).toBe("string");

    expect(id1).not.toEqual(id2);
  });
});
