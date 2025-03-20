import axiosInsatnce from "@/lib/axiosInstance";
import { SignUpSchema } from "@/types/schema";
import { z } from "zod";
import { toast } from "react-hot-toast";
import { create } from "zustand";
import { User } from "@/types/type";

interface AuthState {
  authUser: User | null;
  loading: boolean;
  checkingAuth: boolean;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
  signUp: (data: {
    name: string;
    email: string;
    password: string;
  }) => Promise<void>;
  login: (data: { email: string; password: string }) => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  authUser: null,
  loading: false,
  checkingAuth: true,
  login: async (data) => {
    set({ loading: true });
    try {
      const result = await axiosInsatnce.post("/user/login", data);
      if (result.data.success === false) {
        set({ loading: false });
        toast.error(result.data.message);
        return;
      }
      set({ authUser: result.data.user });
    } catch (error: any) {
      set({ loading: false });

      const errorMessage =
        error.response?.data?.message || "Something went wrong";

      console.error("Signup Error:", error.response?.data || error.message); // ✅ Print the backend error
      toast.error(errorMessage);
    }
  },
  checkAuth: async () => {
    try {
      const result = await axiosInsatnce.get("/user/me");
      set({ authUser: result.data.user });
    } catch (error: any) {
      console.error("Check Auth Error:", error.message); // ✅ Print the backend error
    } finally {
      set({ checkingAuth: false });
    }
  },
  signUp: async (signUpdata: z.infer<typeof SignUpSchema>) => {
    set({ loading: true });
    try {
      const result = await axiosInsatnce.post("/user/signup", signUpdata);

      if (result.data.success === false) {
        set({ loading: false });
        toast.error(result.data.message);
        return;
      }

      set({ authUser: result.data.newUser });
      toast.success("Sign up successful");
    } catch (error: any) {
      set({ loading: false });

      const errorMessage =
        error.response?.data?.message || "Something went wrong";

      console.error("Signup Error:", error.response?.data || error.message); // ✅ Print the backend error
      toast.error(errorMessage);
    } finally {
      set({ loading: false });
    }
  },
  logout: async () => {
    set({ loading: true });
    try {
      await axiosInsatnce.post("/user/logout");

      set({ authUser: null });
    } catch (error: any) {
      set({ loading: false });

      const errorMessage =
        error.response?.data?.message || "Something went wrong";

      console.error("Logout Error:", error.response?.data || error.message); // ✅ Print the backend error
      toast.error(errorMessage);
    } finally {
      set({ loading: false });
    }
  },
}));
