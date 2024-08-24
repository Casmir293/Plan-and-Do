import { ref } from "vue";

export const useToast = () => {
  const toasts = ref<Toast[]>([]);

  const addToast = (toast: Toast) => {
    const timeout = toast.timeout ?? 4000;
    const toastId = Math.random().toString(36).substr(2, 9) + Date.now();
    const id = toast.id ?? toastId;

    const preparedToast = {
      ...toast,
      timeout,
      id,
    };

    toasts.value.push(preparedToast);

    setTimeout(() => {
      removeToast(id);
    }, timeout);
  };

  const removeToast = (id: string) => {
    toasts.value = toasts.value.filter((toast) => toast.id !== id);
  };

  return {
    toasts,
    addToast,
    removeToast,
  };
};
