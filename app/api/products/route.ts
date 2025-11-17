import { NextResponse } from "next/server";
import axios from "axios";

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const search = url.searchParams.get("search") || "";

    const res = await axios.get("https://dummyjson.com/products");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const products = res.data.products.filter((p: any) =>
      p.title.toLowerCase().includes(search.toLowerCase())
    );

    return NextResponse.json({ products });
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const res = await axios.post("https://dummyjson.com/products/add", data);
    return NextResponse.json(res.data);
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to add product" },
      { status: 500 }
    );
  }
}
