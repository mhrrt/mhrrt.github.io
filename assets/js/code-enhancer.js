document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll(".code-container").forEach((container) => {
    const pre = container.querySelector("pre");
    const code = pre.querySelector("code");
    const copyBtn = container.querySelector(".copy-btn");
    const editBtn = container.querySelector(".edit-btn");

    // Copy functionality
    copyBtn.addEventListener("click", () => {
      navigator.clipboard.writeText(code.innerText).then(() => {
        copyBtn.textContent = "Copied!";
        setTimeout(() => (copyBtn.textContent = "Copy"), 2000);
      });
    });

    // Edit functionality
    editBtn.addEventListener("click", () => {
      const textarea = document.createElement("textarea");
      textarea.value = code.innerText;
      textarea.style.width = "100%";
      textarea.style.height = "auto";
      pre.replaceWith(textarea);

      // Save button
      const saveBtn = document.createElement("button");
      saveBtn.textContent = "Save";
      saveBtn.className = "save-btn";
      container.appendChild(saveBtn);

      saveBtn.addEventListener("click", () => {
        code.innerText = textarea.value;
        textarea.replaceWith(pre);
        saveBtn.remove();
      });
    });
  });
});
