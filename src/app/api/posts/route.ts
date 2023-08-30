import data from "./data.json";
import { NextResponse, NextRequest } from "next/server";

export async function GET(request: NextRequest) {
    const url = new URL(request.url);
    const category = url.searchParams.get("category");
    const search = url.searchParams.get("search");
    const limit = Number(url.searchParams.get("limit")) || 10;
    const start = Number(url.searchParams.get("start")) || 0;

    let filteredPosts = data.posts;

    if(category) {
        filteredPosts = filteredPosts.filter(post => post.categories.includes(+category));
    }

    if(search) {
        filteredPosts = filteredPosts.filter(post =>
          post.title.toLowerCase().includes(search.toLowerCase())
        );
    }

    const paginatedPosts = filteredPosts.slice(start, start + limit);

    const response = {
        hasMore: filteredPosts.length > start + limit,
        posts: paginatedPosts
    };

    return NextResponse.json(response);
}
