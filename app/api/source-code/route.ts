import { NextRequest, NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const filePath = searchParams.get("path");

  if (!filePath) {
    return NextResponse.json({ error: "Missing file path" }, { status: 400 });
  }

  const normalizedPath = filePath.replaceAll("\\", "/").replace(/^\/+/, "");

  if (normalizedPath.includes("..")) {
    return NextResponse.json({ error: "Invalid file path" }, { status: 400 });
  }

  const possiblePaths = [
    path.join(/* turbopackIgnore: true */ process.cwd(), normalizedPath),
    path.join(process.cwd(), "app", normalizedPath),
    path.join(process.cwd(), "components", normalizedPath),
  ];


  for (const fullPath of possiblePaths) {
    try {
      const code = await fs.readFile(
        /* turbopackIgnore: true */ fullPath,
        "utf-8"
      );

      return NextResponse.json({ code, resolvedPath: fullPath });
    } catch {}
  }

  return NextResponse.json(
    {
      error: "File not found",
      requestedPath: normalizedPath,
      triedPaths: possiblePaths,
    },
    { status: 404 }
  );
}
