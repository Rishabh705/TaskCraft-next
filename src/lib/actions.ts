"use server"

import { revalidateTag } from "next/cache"

export async function customRevalidatePath(path: string) {
    revalidateTag(path)
}