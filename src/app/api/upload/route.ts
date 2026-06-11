import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { writeFile, mkdir } from "fs/promises";
import path from "path";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    // 1. Authenticate user
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Yetkisiz işlem. Lütfen giriş yapın." }, { status: 401 });
    }

    // 2. Parse form data
    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    if (!file) {
      return NextResponse.json({ error: "Dosya bulunamadı." }, { status: 400 });
    }

    // 3. Convert file to buffer
    const buffer = Buffer.from(await file.arrayBuffer());

    // 4. Generate unique file name
    const timestamp = Date.now();
    const originalName = file.name;
    const extension = path.extname(originalName);
    // Sanitize the file basename
    const sanitizedBasename = path.basename(originalName, extension)
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]/g, "-")
      .replace(/-+/g, "-");
    const filename = `${sanitizedBasename}-${timestamp}${extension}`;

    // 5. Ensure upload directory exists inside public
    const uploadDir = path.join(process.cwd(), "public", "uploads");
    await mkdir(uploadDir, { recursive: true });

    // 6. Write file to disk
    const filePath = path.join(uploadDir, filename);
    await writeFile(filePath, buffer);

    const fileUrl = `/uploads/${filename}`;
    return NextResponse.json({ success: true, url: fileUrl });
  } catch (error) {
    const err = error as { message?: string };
    console.error("Local file upload error:", error);
    return NextResponse.json({ error: "Görsel yüklenirken bir hata oluştu: " + err.message }, { status: 500 });
  }
}
