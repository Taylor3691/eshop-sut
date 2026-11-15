// Ví dụ file checks cho run-checklist.mjs (lấy từ HW03, EShop Web Admin).
// Mỗi pha là một nhóm mục chạy theo thứ tự: chỉ xem → form → môi trường đặc biệt → empty state / dừng backend.
// Mỗi mục là một hàm async (ctx, id) và PHẢI gọi ctx.rec(id, quan_sát, ảnh, gợi_ý).
// Quan sát ghi số đo / sự kiện thật, không ghi "Pass" hay "Fail".

const tab = async (page, name) => { await page.click(`li:text-is("${name}")`); await page.waitForTimeout(350); };

export const phases = [
  {
    name: "1. Chỉ xem",
    items: {
      // Mỗi màn có đúng 1 <h1> mô tả nội dung màn đó
      "GUI-01-01": async ({ newPage, login, shot, rec, cfg }, id) => {
        const p = await newPage();
        await p.goto(cfg.baseUrl);
        const loginH1 = await p.locator("h1").allInnerTexts();
        const imgs = [await shot(p, id, [`Login: ${loginH1.length} thẻ <h1> ${JSON.stringify(loginH1)}`])];
        await login(p);
        const obs = [`Login: ${loginH1.length} thẻ <h1> ${JSON.stringify(loginH1)}`];
        for (const t of cfg.tabs || []) {
          await tab(p, t);
          const h1 = await p.locator("h1").allInnerTexts();
          obs.push(`${t}: ${h1.length} thẻ <h1> ${JSON.stringify(h1)}`);
        }
        imgs.push(await shot(p, `${id}-2`, obs.slice(1)));
        rec(id, obs, imgs, obs.some((o) => !/: 1 thẻ/.test(o)) ? "Có thể Failed" : "Có thể Passed");
        await p.context().close();
      },
      // Tiêu đề tab trình duyệt mô tả màn đang mở
      "GUI-01-21": async ({ newPage, login, shot, rec, cfg }, id) => {
        const p = await newPage();
        await login(p);
        const titles = [];
        for (const t of cfg.tabs || []) { await tab(p, t); titles.push(`${t} → "${await p.title()}"`); }
        rec(id, titles, [await shot(p, id, titles)], new Set(titles.map((s) => s.split("→")[1])).size === 1 ? "Có thể Failed" : "Có thể Passed");
        await p.context().close();
      },
    },
  },
  {
    name: "2. Form",
    items: {
      // Mọi trường nhập có nhãn hiển thị (không chỉ placeholder)
      "GUI-02-01": async ({ newPage, login, shot, rec, outline }, id) => {
        const p = await newPage();
        await login(p);
        await tab(p, "Sản phẩm");
        const fields = await p.$$eval("input, select, textarea", (els) => els.map((e) => {
          const lab = (e.id && document.querySelector(`label[for="${e.id}"]`)) || e.closest("label");
          return { tag: e.tagName.toLowerCase(), ph: e.getAttribute("placeholder") || "", label: lab ? lab.innerText.trim() : "" };
        }));
        const noLabel = fields.filter((f) => !f.label);
        await outline(p.locator("input:not([type=hidden]), select, textarea"));
        const obs = [`${fields.length} trường, ${noLabel.length} trường không có <label>`, ...noLabel.map((f) => `${f.tag} placeholder="${f.ph}"`)];
        rec(id, obs, [await shot(p, id, obs.slice(0, 8))], noLabel.length ? "Có thể Failed" : "Có thể Passed");
        await p.context().close();
      },
    },
  },
];
