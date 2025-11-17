import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const data = await req.json();
    const res = await axios.put(
      `https://dummyjson.com/products/${params.id}`,
      data
    );
    return NextResponse.json(res.data);
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to update product" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const res = await axios.delete(
      `https://dummyjson.com/products/${params.id}`
    );
    return NextResponse.json(res.data);
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to delete product" },
      { status: 500 }
    );
  }
}
