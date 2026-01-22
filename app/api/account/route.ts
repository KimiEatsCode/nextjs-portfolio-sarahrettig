import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { PrismaClient } from "@prisma/client";
import { authOptions, clearLinkedProviders } from "@/lib/auth";

const globalForPrisma = globalThis as unknown as {
	prisma: PrismaClient | undefined;
};

const prisma = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== "production") {
	globalForPrisma.prisma = prisma;
}

export async function DELETE() {
	const session = await getServerSession(authOptions);

	if (!session?.user?.id) {
		return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
	}

	try {
		await prisma.user.delete({ where: { id: session.user.id } });
		clearLinkedProviders(session.user.id);
	} catch (error) {
		console.error("Account deletion failed", error);
		return NextResponse.json(
			{ error: "Unable to delete account." },
			{ status: 500 },
		);
	}

	return NextResponse.json({ ok: true });
}
