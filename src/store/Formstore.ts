"use client";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export type Student = {
  id: string;
  createdAt: number;
  fname: string;
  sname: string;
  address: string;
  phone: string;
  school: string;
  gpa: number;
  talent: string;
  reason: string;
  branch: string;
  university: string;
  media?: StudentMedia[];
};

export type StudentMedia = {
  id: string;
  name: string;
  type: string;
  size: number;
  dataUrl: string; // base64 for persistence demo
};

interface StudentState {
  students: Student[];
  add: (s: Student) => void;
}

export const useStudentStore = create<StudentState>()(
  persist(
    (set) => ({
      students: [],
      add: (s) => set((st) => ({ students: [...st.students, s] })),
    }),
    {
      name: "students-store",
      storage: createJSONStorage(() => localStorage),
      version: 1,
    }
  )
);
