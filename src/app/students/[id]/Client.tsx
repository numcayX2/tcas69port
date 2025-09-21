"use client";

import Link from "next/link";
import Image from "next/image";
import { useStudentStore } from "@/store/Formstore";
import type { StudentMedia } from "@/store/Formstore";

export default function StudentDetailClient({ id }: { id: string }) {
  const students = useStudentStore((s) => (Array.isArray(s.students) ? s.students : []));
  const student = students.find((x) => x && x.id === id);

  if (!student) {
    return (
      <main className="mx-auto w-full max-w-3xl p-6">
        <div className="rounded-lg border border-gray-200 bg-white p-6 text-center shadow-sm">
          <p className="mb-4 text-gray-700">ไม่พบข้อมูลนักศึกษา</p>
          <Link href="/students" className="text-emerald-700 hover:underline">กลับหน้ารายชื่อ</Link>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto w-full max-w-3xl p-6">
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">รายละเอียดนักศึกษา</h1>
        <Link href="/students" className="text-sm text-emerald-700 hover:underline">กลับหน้ารายชื่อ</Link>
      </div>

      <div className="space-y-4 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <Row label="ชื่อ-สกุล" value={`${student.fname} ${student.sname}`} />
        <Row label="GPA" value={student.gpa.toFixed(2)} />
        <Row label="ที่อยู่" value={student.address} />
        <Row label="โทรศัพท์" value={student.phone} />
        <Row label="โรงเรียน" value={student.school} />
        <Row label="สาขา" value={student.branch} />
        <Row label="มหาวิทยาลัย" value={student.university} />
        <Row label="ความสามารถ" value={student.talent} />
        <Row label="เหตุผล" value={student.reason} />
        <Row label="บันทึกเมื่อ" value={new Date(student.createdAt).toLocaleString()} />

        {student.media && student.media.length > 0 && (
          <div className="pt-2">
            <div className="mb-2 text-sm font-medium text-gray-700">สื่อผลงาน/กิจกรรม/รางวัล</div>
            <MediaGrid items={student.media} />
          </div>
        )}
      </div>
    </main>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid grid-cols-3 gap-3">
      <div className="col-span-1 text-sm font-medium text-gray-600">{label}</div>
      <div className="col-span-2 text-sm text-gray-900">{value}</div>
    </div>
  );
}

function MediaGrid({ items }: { items: StudentMedia[] }) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      {items.map((m) => (
        <div key={m.id} className="overflow-hidden rounded-lg border border-gray-200">
          {m.type.startsWith("image/") ? (
            <Image src={m.dataUrl} alt={m.name} width={800} height={400} unoptimized className="h-52 w-full object-cover" />
          ) : m.type.startsWith("video/") ? (
            <video src={m.dataUrl} controls className="h-52 w-full object-cover" />
          ) : (
            <div className="p-4">
              <div className="text-sm font-medium text-gray-900">{m.name}</div>
              <a href={m.dataUrl} target="_blank" rel="noreferrer" className="text-sm text-emerald-700 hover:underline">เปิดไฟล์</a>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

