"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { useStudentStore } from "@/store/Formstore";

type SortKey = "name" | "gpa";
type SortDir = "asc" | "desc";

export default function StudentsPage() {
  const students = useStudentStore((s) => s.students);
  const [sortKey, setSortKey] = useState<SortKey>("name");
  const [sortDir, setSortDir] = useState<SortDir>("asc");

  const sorted = useMemo(() => {
    const list = [...students];
    list.sort((a, b) => {
      if (sortKey === "name") {
        const an = `${a.fname} ${a.sname}`.trim().toLocaleLowerCase();
        const bn = `${b.fname} ${b.sname}`.trim().toLocaleLowerCase();
        const cmp = an.localeCompare(bn);
        return sortDir === "asc" ? cmp : -cmp;
      }
      if (sortKey === "gpa") {
        const cmp = a.gpa - b.gpa;
        return sortDir === "asc" ? cmp : -cmp;
      }
      return 0;
    });
    return list;
  }, [students, sortKey, sortDir]);

  const toggleSort = (key: SortKey) => {
    if (key === sortKey) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir("asc");
    }
  };

  const arrow = (key: SortKey) =>
    sortKey === key ? (
      <span className="ml-1 text-gray-500">{sortDir === "asc" ? "▲" : "▼"}</span>
    ) : null;

  return (
    <main className="mx-auto w-full max-w-4xl p-6">
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">รายชื่อนักศึกษา</h1>
        <Link href="/" className="text-sm text-emerald-700 hover:underline">
          กลับหน้าแรก
        </Link>
      </div>

      <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-emerald-50">
            <tr>
              <th scope="col" className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                <button
                  type="button"
                  onClick={() => toggleSort("name")}
                  className="inline-flex items-center text-gray-700 hover:text-gray-900"
                  aria-sort={sortKey === "name" ? (sortDir === "asc" ? "ascending" : "descending") : "none"}
                >
                  ชื่อ {arrow("name")}
                </button>
              </th>
              <th scope="col" className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                <button
                  type="button"
                  onClick={() => toggleSort("gpa")}
                  className="inline-flex items-center text-gray-700 hover:text-gray-900"
                  aria-sort={sortKey === "gpa" ? (sortDir === "asc" ? "ascending" : "descending") : "none"}
                >
                  GPA {arrow("gpa")}
                </button>
              </th>
              <th scope="col" className="px-4 py-3 text-left text-sm font-semibold text-gray-700">เพิ่มเติม</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {sorted.length === 0 ? (
              <tr>
                <td colSpan={3} className="px-4 py-6 text-center text-sm text-gray-600">
                  ไม่มีข้อมูลนักศึกษา กรุณาบันทึกจากหน้าแบบฟอร์ม
                </td>
              </tr>
            ) : (
              sorted.map((s) => (
                <tr key={s.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm text-gray-900">{s.fname} {s.sname}</td>
                  <td className="px-4 py-3 text-sm text-gray-900">{s.gpa.toFixed(2)}</td>
                  <td className="px-4 py-3 text-sm">
                    <Link href={`/students/${s.id}`} className="text-emerald-700 hover:underline">
                      ดูรายละเอียด
                    </Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </main>
  );
}
