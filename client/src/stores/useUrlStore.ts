import axiosInsatnce from "@/lib/axiosInstance";
import { Url } from "@/types/type";
import toast from "react-hot-toast";
import { create } from "zustand";

export interface UrlState {
  urls: Url[];
  loadingUrl: boolean;
  singleOrginal: string;
  getAllUrls: () => Promise<void>;
  storeUrl: (data: { originalUrl: string }) => Promise<void>;
  getSingleOrginal: (data: { shortenedUrl: string }) => Promise<void>;
  deleteUrl: (data: { shortenedUrlId: string }) => Promise<void>;
}

export const useUrlStore = create<UrlState>((set, get) => ({
  urls: [],
  singleOrginal: "",
  loadingUrl: true,
  getAllUrls: async () => {
    set({ loadingUrl: true });
    try {
      const result = await axiosInsatnce.get("/url");
      set({ urls: result.data.urls });
      toast.success("Urls fetched successfully");
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || "Something went wrong";
      console.error("Error in getAllUrls", error);
      toast.error(errorMessage);
    } finally {
      set({ loadingUrl: false });
    }
  },
  storeUrl: async (data) => {
    set({ loadingUrl: true });
    try {
      const result = await axiosInsatnce.post("/url/storeUrl", data);
      if (result.data.success === false) {
        toast.error(result.data.message);
        return;
      }
      set((state) => ({ urls: [...state.urls, result.data.url] }));
      toast.success("URL stored successfully!");
    } catch (error: any) {
      console.error("Error in storeUrl", error);
      toast.error(error.response?.data?.message || "Failed to store the URL.");
    } finally {
      set({ loadingUrl: false });
    }
  },
  getSingleOrginal: async (data) => {
    set({ loadingUrl: true });
    try {
      const result = await axiosInsatnce.get(`/url/${data.shortenedUrl}`);
      if (result.data.success === false) {
        toast.error(result.data.message);
        return;
      }
      set({ singleOrginal: result.data.originalUrl });
    } catch (error: any) {
      console.error("Error in getSingleOrginal", error);
    }
  },
  deleteUrl: async (data: { shortenedUrlId: string }) => {
    set({ loadingUrl: true });
    try {
      await axiosInsatnce.delete(`/url/${data.shortenedUrlId}`);
      get().getAllUrls();
      toast.success("Url deleted successfully");
    } catch (error: any) {
      console.error("Error in storeUrl", error);
      toast.error(error.response?.data?.message || "Failed to store the URL.");
    } finally {
      set({ loadingUrl: false });
    }
  },
}));
