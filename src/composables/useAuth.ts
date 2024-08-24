import { storeToRefs } from "pinia";
import { useUserStore } from "@/stores/user";
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useToast } from "@/composables/useToast";
import {
  app,
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "@/firebase/firebaseConfig";

const auth = getAuth(app);

export default function useAuth() {
  const { user } = storeToRefs(useUserStore());
  const { addToast } = useToast();
  const USER_STORE = useUserStore();
  const isLoading = ref(false);
  const router = useRouter();
  const error = ref<string | null>(null);

  const signUp = async (email: string, password: string) => {
    isLoading.value = true;
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );
      USER_STORE.user = userCredential.user;
      router.push({ name: "Home" });

      addToast({
        message: "Sign up successful!",
        type: "success",
      });
    } catch (err: any) {
      error.value = err.message;

      addToast({
        message: `Sign up failed: ${error.value}`,
        type: "error",
      });
    } finally {
      isLoading.value = false;
    }
  };

  const signIn = async (email: string, password: string) => {
    isLoading.value = true;
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password,
      );
      USER_STORE.user = userCredential.user;
      router.push({ name: "Home" });

      addToast({
        message: "Sign in successful!",
        type: "success",
      });
    } catch (err: any) {
      error.value = err.message;

      addToast({
        message: `Sign in failed: ${error.value}`,
        type: "error",
      });
    } finally {
      isLoading.value = false;
    }
  };

  const initAuth = () => {
    onAuthStateChanged(auth, (state) => {
      user.value = state;
    });
  };

  const logOut = async () => {
    isLoading.value = true;
    try {
      await signOut(auth);
      USER_STORE.user = null;
      router.push({ name: "SignIn" });

      addToast({
        message: "Log out successful!",
        type: "success",
      });
    } catch (err: any) {
      error.value = err.message;
    } finally {
      isLoading.value = false;
    }
  };

  return {
    USER: user,
    isLoading,
    error,
    signUp,
    signIn,
    initAuth,
    logOut,
  };
}
