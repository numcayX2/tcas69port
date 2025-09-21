"use client";

import { useForm } from "react-hook-form";
import { useStudentStore } from "../store/Formstore";
import type { ReactNode } from "react";
import type { StudentMedia } from "@/store/Formstore";

export type FormValues = {
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
  mediaFiles?: FileList | null;
};

export default function RegForm() {
  const add = useStudentStore((s) => s.add);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormValues>({
    defaultValues: {
      fname: "",
      sname: "",
      address: "",
      phone: "",
      school: "",
      gpa: 0,
      talent: "",
      reason: "",
      branch: "",
      university: "",
      mediaFiles: undefined,
    },
  });

  const readFileAsDataURL = (file: File) =>
    new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });

  const onSubmit = async (data: FormValues) => {
    const files = data.mediaFiles ? Array.from(data.mediaFiles) : [];
    const MAX_FILES = 5;
    const MAX_SIZE = 3 * 1024 * 1024; // 3MB
    if (files.length > MAX_FILES) {
      alert(`อัปโหลดได้ไม่เกิน ${MAX_FILES} ไฟล์`);
      return;
    }
    const oversize = files.find((f) => f.size > MAX_SIZE);
    if (oversize) {
      alert("ไฟล์ต้องมีขนาดไม่เกิน 3MB ต่อไฟล์");
      return;
    }

    let media: StudentMedia[] = [];
    if (files.length) {
      media = await Promise.all(
        files.map(async (f) => ({
          id: crypto.randomUUID(),
          name: f.name,
          type: f.type,
          size: f.size,
          dataUrl: await readFileAsDataURL(f),
        }))
      );
    }

    add({
      id: crypto.randomUUID(),
      createdAt: Date.now(),
      fname: data.fname,
      sname: data.sname,
      address: data.address,
      phone: data.phone,
      school: data.school,
      gpa: Number(data.gpa),
      talent: data.talent,
      reason: data.reason,
      branch: data.branch,
      university: data.university,
      media,
    });
    reset();
    alert("บันทึกสำเร็จ");
  };

  return (
    <div className="mx-auto w-full max-w-3xl rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-1">
          <h2 className="text-2xl font-semibold text-gray-900">สมัคร Portfolio (TCAS69)</h2>
          <p className="text-sm text-gray-600">กรอกข้อมูลให้ครบถ้วนเพื่อส่งใบสมัคร</p>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <Field label="ชื่อ (First Name)" error={errors.fname?.message}>
            <input
              className="block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 shadow-sm outline-none ring-2 ring-transparent placeholder:text-gray-400 focus:border-emerald-500 focus:ring-emerald-500"
              placeholder="กรอกชื่อ"
              {...register("fname", { required: "จำเป็น" })}
            />
          </Field>
          <Field label="สกุล (Last Name)" error={errors.sname?.message}>
            <input
              className="block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 shadow-sm outline-none ring-2 ring-transparent placeholder:text-gray-400 focus:border-emerald-500 focus:ring-emerald-500"
              placeholder="กรอกนามสกุล"
              {...register("sname", { required: "จำเป็น" })}
            />
          </Field>
        </div>

        <Field label="ที่อยู่ (Address)" error={errors.address?.message}>
          <textarea
            className="block h-28 w-full resize-y rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 shadow-sm outline-none ring-2 ring-transparent placeholder:text-gray-400 focus:border-emerald-500 focus:ring-emerald-500"
            placeholder="บ้านเลขที่ / ถนน / เขต / จังหวัด"
            {...register("address", { required: "จำเป็น", minLength: { value: 5, message: "อย่างน้อย 5 อักขระ" } })}
          />
        </Field>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          <Field label="เบอร์โทร (Phone)" error={errors.phone?.message}>
            <input
              className="block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 shadow-sm outline-none ring-2 ring-transparent placeholder:text-gray-400 focus:border-emerald-500 focus:ring-emerald-500"
              inputMode="numeric"
              placeholder="ตัวอย่าง 0891234567"
              {...register("phone", { required: "จำเป็น", pattern: { value: /^\d{9,10}$/, message: "กรอกตัวเลข 9-10 หลัก" } })}
            />
          </Field>
          <Field label="โรงเรียน (School)" error={errors.school?.message}>
            <input
              className="block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 shadow-sm outline-none ring-2 ring-transparent placeholder:text-gray-400 focus:border-emerald-500 focus:ring-emerald-500"
              placeholder="ชื่อโรงเรียน"
              {...register("school", { required: "จำเป็น" })}
            />
          </Field>
          <Field label="GPA" error={errors.gpa?.message}>
            <input
              className="block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 shadow-sm outline-none ring-2 ring-transparent placeholder:text-gray-400 focus:border-emerald-500 focus:ring-emerald-500"
              type="number"
              step="0.01"
              placeholder="เช่น 3.25"
              {...register("gpa", {
                required: "จำเป็น",
                min: { value: 0, message: "ขั้นต่ำ 0.00" },
                max: { value: 4, message: "ไม่เกิน 4.00" },
                valueAsNumber: true,
              })}
            />
          </Field>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <Field label="สาขา (Branch)" error={errors.branch?.message}>
            <input
              className="block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 shadow-sm outline-none ring-2 ring-transparent placeholder:text-gray-400 focus:border-emerald-500 focus:ring-emerald-500"
              placeholder="เช่น วิทยาการคอมพิวเตอร์"
              {...register("branch", { required: "จำเป็น" })}
            />
          </Field>
          <Field label="มหาวิทยาลัย (University)" error={errors.university?.message}>
            <input
              className="block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 shadow-sm outline-none ring-2 ring-transparent placeholder:text-gray-400 focus:border-emerald-500 focus:ring-emerald-500"
              placeholder="ชื่อมหาวิทยาลัย"
              {...register("university", { required: "จำเป็น" })}
            />
          </Field>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <Field label="ความสามารถ (Talent)" error={errors.talent?.message}>
            <input
              className="block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 shadow-sm outline-none ring-2 ring-transparent placeholder:text-gray-400 focus:border-emerald-500 focus:ring-emerald-500"
              placeholder="ตัวอย่าง ร้องเพลง, แข่งขันโอลิมปิกวิชาการ"
              {...register("talent", { required: "จำเป็น" })}
            />
          </Field>
          <Field label="เหตุผล (Reason)" error={errors.reason?.message}>
            <textarea
              className="block h-28 w-full resize-y rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 shadow-sm outline-none ring-2 ring-transparent placeholder:text-gray-400 focus:border-emerald-500 focus:ring-emerald-500"
              placeholder="ทำไมถึงอยากเข้าคณะ/มหาวิทยาลัยนี้"
              {...register("reason", { required: "จำเป็น" })}
            />
          </Field>
        </div>

        <div className="space-y-2">
          <label className="mb-1 block text-sm font-medium">สื่อผลงาน/กิจกรรม/รางวัล (อัปโหลดได้สูงสุด 5 ไฟล์, ≤ 3MB/ไฟล์)</label>
          <input
            type="file"
            multiple
            accept="image/*,video/*,application/pdf"
            className="block w-full cursor-pointer rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 shadow-sm file:mr-4 file:rounded-md file:border-0 file:bg-emerald-600 file:px-3 file:py-2 file:text-sm file:font-medium file:text-white hover:file:bg-emerald-500"
            {...register("mediaFiles")}
          />
          <p className="text-xs text-gray-500">รองรับรูปภาพ, วิดีโอ และ PDF</p>
        </div>

        <div className="flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={() => reset()}
            className="inline-flex items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600"
          >
            ล้างข้อมูล
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex items-center justify-center rounded-md bg-emerald-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-emerald-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? "กำลังบันทึก..." : "ส่ง Portfolio"}
          </button>
        </div>
      </form>
    </div>
  );
}

/** Small helper for label + error layout */
function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: ReactNode;
}) {
  return (
    <div>
      <label className="mb-1 block text-sm font-medium text-gray-800">{label}</label>
      {children}
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
}
