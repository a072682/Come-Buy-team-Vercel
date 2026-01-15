
//取得圖片

// 引入環境變數
import cloudinary from "../utils/cloudinary/cloudinaryConfig";

export async function getSingleImage(public_id) {

  if (!public_id) {
    throw new Error("public_id 不存在，無法取得圖片資訊");
  }

  try {
    const result = await cloudinary.api.resource(public_id);

    return {
      public_id: result.public_id,
      url: result.secure_url,
      width: result.width,
      height: result.height,
      format: result.format,
      bytes: result.bytes,
      created_at: result.created_at,
      resource_type: result.resource_type,
    };
  } catch (error) {
    throw new Error("Cloudinary 取得圖片資訊失敗");
  }
}
