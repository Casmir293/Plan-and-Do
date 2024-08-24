import { useToast } from "vue-toastification";
import { storeToRefs } from "pinia";
import { useUserStore } from "@/stores/userStore";
import { ref, unref } from "vue";
import { logger } from "@/utils/helpers";
import { useRouter } from "vue-router";
import {
  app,
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  db,
  doc,
  setDoc,
  getDoc,
} from "@/services/firebaseServices";

const auth = getAuth(app);

export default function useAuth() {
  const { user, userId, myProfile, isLoggedIn } = storeToRefs(useUserStore());
  const USER_STORE = useUserStore();
  const toast = useToast();
  const isLoading = ref(false);
  const router = useRouter();
  const error = ref<ErrorResponse | string | null>(null);

  const whoAmI = async (userId: any) => {
    try {
      const docRef = doc(db, "users", userId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        USER_STORE.myProfile = docSnap.data() as MyProfile;
      } else {
        await logOut();
        toast.error("User doesn't exist", {
          timeout: 3000,
        });
      }
    } catch (err: any) {
      error.value = err as ErrorResponse;

      await logOut();
      logger("Error fetching user ==>", error);

      toast.error(`Fetch profile failed: ${error.value}`, {
        timeout: 3000,
      });
    }
  };

  const signUp = async (name: string, email: string, password: string) => {
    isLoading.value = true;

    try {
      const payload = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );

      await setDoc(doc(db, "users", payload.user.uid), {
        name: name,
        email: email,
      });

      router.push({ name: "SignIn" });

      toast.success("Account Created! Sign in.", {
        timeout: 3000,
      });
    } catch (err: any) {
      error.value = err as ErrorResponse;

      logger("Error signing up ==>", error);

      toast.error(`Sign up failed: ${error.value.code}`, {
        timeout: 3000,
      });
    } finally {
      isLoading.value = false;
    }
  };

  const signIn = async (email: string, password: string) => {
    isLoading.value = true;

    try {
      const payload = await signInWithEmailAndPassword(auth, email, password);
      USER_STORE.user = payload.user;
      USER_STORE.userId = payload.user.uid;
      const profileId = payload.user.uid;

      await whoAmI(profileId);
      router.push({ name: "Home" });

      toast.success("Sign in successful", {
        timeout: 3000,
      });
    } catch (err: any) {
      error.value = err as ErrorResponse;

      logger("Error signing in ==>", error);
      toast.error(`Sign in failed: ${error.value.code}`, {
        timeout: 3000,
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
      USER_STORE.userId = null;
      USER_STORE.myProfile = null;

      router.push({ name: "SignIn" });
    } catch (err: any) {
      error.value = err as ErrorResponse;

      logger("Error logging out ==>", error);
      toast.error(`Logout failed: ${error.value.code}`, {
        timeout: 3000,
      });
    } finally {
      isLoading.value = false;
    }
  };

  return {
    USER: user,
    userId: unref(userId),
    myProfile: unref(myProfile),
    isLoading,
    isLoggedIn: unref(isLoggedIn),
    whoAmI,
    signUp,
    signIn,
    initAuth,
    logOut,
  };
}
