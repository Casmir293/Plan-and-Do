import { useToast } from "vue-toastification";
import { storeToRefs } from "pinia";
import { useTaskStore } from "@/stores/taskStore";
import { ref } from "vue";
import { logger } from "@/utils/helpers";
import useAuth from "./useAuth";
import {
  db,
  getDocs,
  addDoc,
  collection,
  doc,
  updateDoc,
} from "@/services/firebaseServices";

export default function useTask() {
  const TASK_STORE = useTaskStore();
  const { tasks } = storeToRefs(useTaskStore());
  const { userId } = useAuth();
  const toast = useToast();
  const isLoading = ref(false);
  const error = ref<ErrorResponse | string | null>(null);

  const fetchTasks = async () => {
    try {
      const querySnapshot = await getDocs(
        collection(db, `users/${userId}/tasks`),
      );

      const response = querySnapshot.docs.map((doc) => {
        return { id: doc.id, ...doc.data() };
      });
      TASK_STORE.tasks = response as Task[];

      return response;
    } catch (err: any) {
      error.value = err as ErrorResponse;

      logger("Error fetching tasks ==>", error);
      toast.error(`Fetch tasks failed: ${error.value.code}`, {
        timeout: 3000,
      });
    } finally {
      isLoading.value = false;
    }
  };

  const addTask = async (payload: TaskDataForm) => {
    isLoading.value = true;

    try {
      await addDoc(collection(db, `users/${userId}/tasks`), payload);

      await fetchTasks();

      toast.success("Task added successfully", {
        timeout: 3000,
      });
    } catch (err: any) {
      error.value = err as ErrorResponse;

      logger("Error adding task ==>", error);

      toast.error(`Add task failed: ${error.value.code}`, {
        timeout: 3000,
      });
    } finally {
      isLoading.value = false;
    }
  };

  const updateTask = async (
    taskId: string,
    updatedData: Partial<TaskDataForm>,
  ) => {
    isLoading.value = true;

    try {
      const taskRef = doc(db, `users/${userId}/tasks`, taskId);
      await updateDoc(taskRef, updatedData);

      await fetchTasks();

      toast.success("Task updated successfully", {
        timeout: 3000,
      });
    } catch (err: any) {
      error.value = err as ErrorResponse;

      logger("Error updating task ==>", error);

      toast.error(`Update task failed: ${error.value.code}`, {
        timeout: 3000,
      });
    } finally {
      isLoading.value = false;
    }
  };

  return { TASKS: tasks, isLoading, fetchTasks, addTask, updateTask };
}
