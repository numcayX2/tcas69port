import Link from "next/link";
import RegForm from "@/components/RegForm";

export default function Home() {
  return (
    <main className="mx-auto w-full max-w-5xl p-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-gray-900">TCAS69 Portfolio</h1>
          <p className="text-sm text-gray-600">กรอกแบบฟอร์มด้านล่าง หรือดูรายชื่อนักศึกษาที่บันทึกแล้ว</p>
        </div>
        <Link
          href="/students"
          className="inline-flex items-center justify-center rounded-md bg-emerald-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-emerald-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600"
        >
          ไปที่รายชื่อนักศึกษา
        </Link>
      </div>

      <RegForm />
    </main>
  );
}

