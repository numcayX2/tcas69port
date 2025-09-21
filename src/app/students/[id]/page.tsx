import { use } from "react";
import StudentDetailClient from "./Client";

export default function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  return <StudentDetailClient id={id} />;
}

