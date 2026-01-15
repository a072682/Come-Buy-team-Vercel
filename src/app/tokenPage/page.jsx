import TokenPage from "@/singlePages/google/TokenPage/TokenPage";
import { Suspense } from "react";

export default function page() {
  return (
    <>
      <Suspense fallback={<div>頁面載入中...</div>}>
        <TokenPage />
      </Suspense>
    </>
  );
}