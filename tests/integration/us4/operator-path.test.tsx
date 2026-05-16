import { describe, expect, it } from "vitest";
import { footerGroups, getPageByPath } from "@/lib/routes/routeMap";

describe("US4 — operator path routing", () => {
  it("for-brands is registered in the 'operators' footer group", () => {
    const groups = footerGroups();
    const operatorPaths = groups.operators.map((p) => p.path);
    expect(operatorPaths).toContain("/for-brands");
  });

  it("for-brands targets Elena (the operator persona)", () => {
    const page = getPageByPath("/en/for-brands");
    expect(page).not.toBeNull();
    expect(page?.primaryPersona).toBe("elena");
    expect(page?.section).toBe("operator");
  });

  it("submit route exists and targets Elena", () => {
    const page = getPageByPath("/en/submit");
    expect(page).not.toBeNull();
    expect(page?.primaryPersona).toBe("elena");
    expect(page?.section).toBe("operator");
  });

  it("submit lives in the 'contribute' footer group (per FR-012)", () => {
    const groups = footerGroups();
    const contributePaths = groups.contribute.map((p) => p.path);
    expect(contributePaths).toContain("/submit");
  });

  it("neither for-brands nor submit appears in the primary header nav", () => {
    expect(getPageByPath("/en/for-brands")?.headerNav).toBe(false);
    expect(getPageByPath("/en/submit")?.headerNav).toBe(false);
  });
});
