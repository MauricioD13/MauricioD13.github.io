import { test, expect } from "@playwright/test";

// Covers the full-screen, scroll-pinned infinite diagram panel section
// (src/layouts/components/DiagramPanelSection.astro).

test.describe("Diagram panel section", () => {
  test("pins on scroll, scrubs panels, and unpins to continue the page", async ({ page }) => {
    await page.goto("/");

    const getState = () =>
      page.evaluate(() => {
        const st = (window as any).ScrollTrigger?.getAll()[0];
        return {
          scrollY: window.scrollY,
          progress: st?.progress ?? null,
          isActive: st?.isActive ?? null,
          activeDot: document
            .querySelector('[data-panel-dot][aria-current="true"]')
            ?.getAttribute("aria-label"),
        };
      });

    const before = await getState();
    expect(before.progress).toBe(0);
    expect(before.activeDot).toBe("Go to diagram 1");

    // Scroll into the pinned range and confirm it advances through the panels.
    await page.mouse.wheel(0, 1500);
    await page.waitForTimeout(400);
    const mid = await getState();
    expect(mid.isActive).toBe(true);
    expect(mid.progress).toBeGreaterThan(0);
    expect(mid.progress).toBeLessThan(1);
    expect(mid.scrollY).toBeGreaterThan(before.scrollY);

    // Keep scrolling until the loop completes and the section unpins.
    await page.mouse.wheel(0, 3000);
    await page.waitForTimeout(400);
    const after = await getState();
    expect(after.isActive).toBe(false);
    expect(after.progress).toBe(1);

    // Page must keep progressing normally past the section (not trapped in the pin).
    const beforeFurther = after.scrollY;
    await page.mouse.wheel(0, 800);
    await page.waitForTimeout(400);
    const further = await getState();
    expect(further.scrollY).toBeGreaterThan(beforeFurther);
  });

  test("panels actually translate during the scrub (not just progress ticking)", async ({ page }) => {
    await page.goto("/");
    const getTransforms = () =>
      page.evaluate(() =>
        Array.from(document.querySelectorAll("[data-panel]")).map(
          (el) => getComputedStyle(el).transform,
        ),
      );

    const before = await getTransforms();
    await page.mouse.wheel(0, 1500);
    await page.waitForTimeout(400);
    const during = await getTransforms();

    expect(during).not.toEqual(before);
  });

  test("respects prefers-reduced-motion by falling back to a static stacked layout", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/");

    const state = await page.evaluate(() => {
      const st = (window as any).ScrollTrigger?.getAll() ?? [];
      const pinWrap = document.querySelector("[data-panels-pin]");
      return {
        scrollTriggerCount: st.length,
        pinWrapIsAuto: pinWrap?.classList.contains("h-auto"),
        dotsHidden: document.querySelector("[data-panel-dots]")?.classList.contains("hidden"),
      };
    });

    expect(state.scrollTriggerCount).toBe(0);
    expect(state.pinWrapIsAuto).toBe(true);
    expect(state.dotsHidden).toBe(true);
  });
});

test.describe("Diagram panel section — layout", () => {
  test("fills the viewport with no horizontal overflow", async ({ page }) => {
    await page.goto("/");

    const pinWrapBox = await page.locator("[data-panels-pin]").boundingBox();
    const viewport = page.viewportSize();
    expect(viewport).not.toBeNull();
    if (!pinWrapBox || !viewport) throw new Error("missing layout data");

    expect(pinWrapBox.width).toBeCloseTo(viewport.width, 0);
    // Allow browser UI (address bar etc.) to shrink the *available* height slightly;
    // the panel must never exceed the viewport, only ever be <= it.
    expect(pinWrapBox.height).toBeLessThanOrEqual(viewport.height + 1);

    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth > window.innerWidth,
    );
    expect(overflow).toBe(false);
  });

  test("no layout shift while scrubbing through the panels", async ({ page }) => {
    await page.goto("/");
    const widthAt = () =>
      page.evaluate(() => document.documentElement.scrollWidth);

    const w0 = await widthAt();
    await page.mouse.wheel(0, 1000);
    await page.waitForTimeout(300);
    const w1 = await widthAt();
    await page.mouse.wheel(0, 1000);
    await page.waitForTimeout(300);
    const w2 = await widthAt();

    expect(w1).toBe(w0);
    expect(w2).toBe(w0);
  });
});
