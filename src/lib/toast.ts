// Simple in-browser toast notification system (no external deps)
type ToastType = "success" | "error" | "info" | "warning";

let _container: HTMLDivElement | null = null;

function getContainer(): HTMLDivElement {
  if (_container) return _container;
  _container = document.createElement("div");
  _container.setAttribute("aria-live", "polite");
  _container.setAttribute("aria-label", "Notifications");
  Object.assign(_container.style, {
    position: "fixed",
    bottom: "1.5rem",
    right: "1.5rem",
    zIndex: "9999",
    display: "flex",
    flexDirection: "column",
    gap: "0.75rem",
    pointerEvents: "none",
  });
  document.body.appendChild(_container);
  return _container;
}

const TYPE_STYLES: Record<ToastType, { bg: string; border: string; icon: string }> = {
  success: {
    bg: "linear-gradient(135deg,#f0fdf4,#dcfce7)",
    border: "#86efac",
    icon: "✓",
  },
  error: {
    bg: "linear-gradient(135deg,#fef2f2,#fee2e2)",
    border: "#fca5a5",
    icon: "✕",
  },
  info: {
    bg: "linear-gradient(135deg,#eff6ff,#dbeafe)",
    border: "#93c5fd",
    icon: "ℹ",
  },
  warning: {
    bg: "linear-gradient(135deg,#fffbeb,#fef3c7)",
    border: "#fbbf24",
    icon: "⚠",
  },
};

export function toast(message: string, type: ToastType = "info", duration = 3200) {
  if (typeof window === "undefined") return;
  const container = getContainer();

  const el = document.createElement("div");
  const styles = TYPE_STYLES[type];

  Object.assign(el.style, {
    display: "flex",
    alignItems: "center",
    gap: "0.625rem",
    padding: "0.75rem 1rem",
    borderRadius: "0.875rem",
    background: styles.bg,
    border: `1.5px solid ${styles.border}`,
    boxShadow: "0 8px 32px rgba(16,24,40,0.12)",
    pointerEvents: "auto",
    cursor: "pointer",
    maxWidth: "22rem",
    opacity: "0",
    transform: "translateY(12px) scale(0.97)",
    transition: "all 0.25s cubic-bezier(0.22,1,0.36,1)",
    fontSize: "0.8125rem",
    fontWeight: "600",
    color: "#1A1A1A",
    fontFamily: "system-ui, sans-serif",
  });

  el.innerHTML = `<span style="font-size:1rem;flex-shrink:0">${styles.icon}</span><span>${message}</span>`;
  el.setAttribute("role", "status");

  el.onclick = () => dismiss();

  container.appendChild(el);

  requestAnimationFrame(() => {
    el.style.opacity = "1";
    el.style.transform = "translateY(0) scale(1)";
  });

  function dismiss() {
    el.style.opacity = "0";
    el.style.transform = "translateY(4px) scale(0.97)";
    setTimeout(() => {
      el.remove();
    }, 250);
  }

  const timer = setTimeout(dismiss, duration);
  el.onclick = () => {
    clearTimeout(timer);
    dismiss();
  };
}
