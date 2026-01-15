
import { NextResponse } from "next/server";
import { getSingleImage } from "@/apiData/cloudinary/getSingleImage";

export async function GET(req) {
  try {
    //對前端的資料進行解構
    const { searchParams } = new URL(req.url);
    //取得圖片id
    const public_id = searchParams.get("public_id");

    if (!public_id) {
      return NextResponse.json(
        { error: "缺少 public_id" },
        { status: 400 }
      );
    }

    const imageInfo = await getSingleImage(public_id);

    if (!imageInfo) {
      return NextResponse.json(
        { error: "圖片不存在" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      data: imageInfo,
    });
  } catch (error) {
    console.error("取得圖片資訊失敗：", error);

    return NextResponse.json(
      { error: error.message || "取得圖片資訊失敗" },
      { status: 500 }
    );
  }
}

//前端範例
// axios.get("/api/cloudinary/getSingleImage", {
//   params: {
//     public_id: "articles/abc123",
//   },
// });