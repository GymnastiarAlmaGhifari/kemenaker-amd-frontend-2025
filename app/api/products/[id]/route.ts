import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

// PUT /api/products/[id]
export async function PUT(
  req: NextRequest,
  context: { params: { id: string } | Promise<{ id: string }> }
) {
  try {
    // ambil id, tunggu jika params berupa Promise
    const { id } = await context.params;
    const data = await req.json();

    const res = await axios.put(`https://dummyjson.com/products/${id}`, data);

    return NextResponse.json(res.data);
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to update product" },
      { status: 500 }
    );
  }
}

// DELETE /api/products/[id]
export async function DELETE(
  req: NextRequest,
  context: { params: { id: string } | Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;

    const res = await axios.delete(`https://dummyjson.com/products/${id}`);

    return NextResponse.json(res.data);
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to delete product" },
      { status: 500 }
    );
  }
}
