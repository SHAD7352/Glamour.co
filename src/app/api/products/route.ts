import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

const filePath = path.join(process.cwd(), 'src', 'data', 'products', 'products.json');

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const id = url.searchParams.get('id');

    const data = await fs.readFile(filePath, 'utf-8');
    const products = JSON.parse(data);

    if (id) {
      // Return single product if ID is provided
      const product = products.find(p => p.id == parseInt(id));
      return product ? NextResponse.json(product) : NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    // Return all products if no ID
    return NextResponse.json(products);
  } catch (error) {
    console.error("Error loading products:", error);
    return NextResponse.json({ error: "Failed to load products" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const newProduct = await request.json();
    const data = await fs.readFile(filePath, 'utf-8');
    const products = JSON.parse(data);
    const maxId = products.length > 0 ? Math.max(...products.map(p => p.id)) : 0;
    newProduct.id = maxId + 1;
    products.push(newProduct);
    await fs.writeFile(filePath, JSON.stringify(products, null, 2));
    return NextResponse.json(newProduct, { status: 201 });
  } catch (error) {
    console.error("Error creating product:", error);
    return NextResponse.json({ error: "Failed to create product" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const updatedProduct = await request.json();
    const data = await fs.readFile(filePath, 'utf-8');
    const products = JSON.parse(data);
    const index = products.findIndex(p => p.id === updatedProduct.id);
    if (index === -1) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }
    products[index] = { ...products[index], ...updatedProduct };
    await fs.writeFile(filePath, JSON.stringify(products, null, 2));
    return NextResponse.json(products[index]);
  } catch (error) {
    console.error("Error updating product:", error);
    return NextResponse.json({ error: "Failed to update product" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const url = new URL(request.url);
    const id = parseInt(url.searchParams.get('id') || '');
    if (!id) {
      return NextResponse.json({ error: "Product ID is required" }, { status: 400 });
    }
    const data = await fs.readFile(filePath, 'utf-8');
    const products = JSON.parse(data);
    const index = products.findIndex(p => p.id === id);
    if (index === -1) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }
    const deletedProduct = products.splice(index, 1)[0];
    await fs.writeFile(filePath, JSON.stringify(products, null, 2));
    return NextResponse.json(deletedProduct);
  } catch (error) {
    console.error("Error deleting product:", error);
    return NextResponse.json({ error: "Failed to delete product" }, { status: 500 });
  }
}
