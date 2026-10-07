"use strict";

(() => {
  const languageButton = document.querySelector(".language-toggle");
  const storageKey = "hang-gu-language";
  const visual = document.querySelector(".research-visual");
  const lensPanel = document.querySelector(".lens-panel");
  const lensButtons = [...document.querySelectorAll(".lens-tabs button")];
  const filterButtons = [...document.querySelectorAll(".project-filters button")];
  const projectCount = document.querySelector(".project-count");
  const progress = document.querySelector(".reading-progress span");
  const lenses = {
    vision: {
      en: "How can visual representations contribute when labeled examples are scarce?",
      zh: "当标注样本有限时，视觉表征能为学习带来什么？",
    },
    text: {
      en: "How can language and document context complement what an image tells us?",
      zh: "语言与文档语境，如何补充图像传达的信息？",
    },
    evaluation: {
      en: "How sensitive are our conclusions to validation choices and data artifacts?",
      zh: "验证方式与数据伪影，会如何影响我们的研究结论？",
    },
  };

  function updateProgress() {
    const available = document.documentElement.scrollHeight - window.innerHeight;
    const value = available > 0 ? Math.min(1, Math.max(0, window.scrollY / available)) : 0;
    if (progress) progress.style.transform = `scaleX(${value})`;
  }

  function setLens(topic) {
    if (!lenses[topic] || !visual || !lensPanel) return;
    visual.dataset.topic = topic;
    lensButtons.forEach((button) => {
      const selected = button.dataset.topic === topic;
      button.setAttribute("aria-selected", String(selected));
      button.tabIndex = selected ? 0 : -1;
    });
    lensPanel.setAttribute("aria-labelledby", `lens-${topic}`);
    lensPanel.dataset.en = lenses[topic].en;
    lensPanel.dataset.zh = lenses[topic].zh;
    lensPanel.textContent = lenses[topic][document.documentElement.lang === "zh-CN" ? "zh" : "en"];
  }

  function filterProjects(filter) {
    if (!["all", "public", "applied"].includes(filter)) return;
    filterButtons.forEach((button) => button.setAttribute("aria-pressed", String(button.dataset.filter === filter)));
    document.querySelectorAll("[data-project-group]").forEach((group) => {
      group.hidden = filter !== "all" && group.dataset.projectGroup !== filter;
    });
    const count = [...document.querySelectorAll(".featured-projects > article, .engineering-grid > article")]
      .filter((card) => filter === "all" || card.closest("[data-project-group]").dataset.projectGroup === filter).length;
    if (projectCount) {
      projectCount.dataset.en = `${count} selected projects`;
      projectCount.dataset.zh = `${count} 个精选项目`;
      projectCount.textContent = projectCount.dataset[document.documentElement.lang === "zh-CN" ? "zh" : "en"];
    }
    window.requestAnimationFrame(updateProgress);
  }

  function setLanguage(language) {
    const isChinese = language === "zh";
    const key = isChinese ? "zh" : "en";
    document.documentElement.lang = isChinese ? "zh-CN" : "en";

    document.querySelectorAll("[data-en][data-zh]").forEach((element) => {
      element.textContent = element.dataset[key];
    });
    document.querySelectorAll("[data-en-label][data-zh-label]").forEach((element) => {
      element.setAttribute("aria-label", element.dataset[`${key}Label`]);
    });
    document.title = isChinese ? "顾航 — 学术研究与工程实践" : "Hang Gu — Research & Engineering";
    const description = document.querySelector('meta[name="description"]');
    description.content = isChinese
      ? "顾航，计算机讲师、前端工程师。关注多模态学习、严谨评估与数据系统，记录研究、工程实践和学习笔记。"
      : "Hang Gu — lecturer, frontend engineer, and researcher interested in multimodal learning, reliable evaluation, and data systems.";
    languageButton.setAttribute("aria-label", isChinese ? "Switch to English" : "切换为中文");
    languageButton.innerHTML = isChinese
      ? '<span class="active-language" aria-hidden="true">中</span><span class="language-divider" aria-hidden="true">/</span><span aria-hidden="true">EN</span>'
      : '<span aria-hidden="true">中</span><span class="language-divider" aria-hidden="true">/</span><span class="active-language" aria-hidden="true">EN</span>';
    try {
      window.localStorage.setItem(storageKey, key);
    } catch {
      // Language switching remains usable when browser storage is unavailable.
    }
    window.requestAnimationFrame(updateProgress);
  }

  const lensControls = document.querySelector(".research-lenses");
  if (lensControls) lensControls.hidden = false;
  lensButtons.forEach((button, index) => {
    button.addEventListener("click", () => setLens(button.dataset.topic));
    button.addEventListener("keydown", (event) => {
      let next;
      if (event.key === "ArrowRight") next = (index + 1) % lensButtons.length;
      else if (event.key === "ArrowLeft") next = (index - 1 + lensButtons.length) % lensButtons.length;
      else if (event.key === "Home") next = 0;
      else if (event.key === "End") next = lensButtons.length - 1;
      else return;
      event.preventDefault();
      setLens(lensButtons[next].dataset.topic);
      lensButtons[next].focus();
    });
  });
  const toolbar = document.querySelector(".project-toolbar");
  if (toolbar) toolbar.hidden = false;
  filterButtons.forEach((button) => button.addEventListener("click", () => filterProjects(button.dataset.filter)));

  let scrollQueued = false;
  window.addEventListener("scroll", () => {
    if (scrollQueued) return;
    scrollQueued = true;
    window.requestAnimationFrame(() => {
      updateProgress();
      scrollQueued = false;
    });
  }, { passive: true });
  window.addEventListener("resize", updateProgress);
  updateProgress();

  if (languageButton) {
    languageButton.hidden = false;
    languageButton.addEventListener("click", () => {
      setLanguage(document.documentElement.lang === "zh-CN" ? "en" : "zh");
    });
    try {
      if (window.localStorage.getItem(storageKey) === "zh") setLanguage("zh");
    } catch {
      // The default English page is complete without stored preferences.
    }
  }

  const navigationLinks = [...document.querySelectorAll('.site-header nav a[href^="#"]')];
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        navigationLinks.forEach((link) => {
          if (link.hash === `#${entry.target.id}`) link.setAttribute("aria-current", "location");
          else link.removeAttribute("aria-current");
        });
      });
    }, { rootMargin: "-12% 0px -55% 0px", threshold: 0 });
    navigationLinks.forEach((link) => {
      const section = document.querySelector(link.hash);
      if (section) observer.observe(section);
    });

    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        });
      }, { threshold: 0.08 });
      document.querySelectorAll(".section-heading, .research-item, .project-card, .engineering-grid article, .notebook-entry, .about-copy, .background-details, .closing").forEach((element) => {
        element.classList.add("reveal");
        revealObserver.observe(element);
      });
    }
  }
})();
