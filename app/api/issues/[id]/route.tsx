import { issueSchema } from "@/app/validationSchema";
import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
    const body = await request.json();
    const validation = issueSchema.safeParse(body);

    if (!validation.success)
        return NextResponse.json(validation.error.format(), { status: 400 });

    const issue = await prisma.issue.findUnique({
        where: {
            id: parseInt(params.id)
        }
    });

    if (!issue)
        return NextResponse.json({
            error: 'Invalid Issue'
        }, { status: 400 });
    
    const update = await prisma.issue.update({
        where: {
            id: issue.id
        },
        data: {
            title: body.title,
            description: body.description
        }
    });

    if (update) return NextResponse.json(issue, {status:200})
};


export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
    const issue = await prisma.issue.findUnique({
        where: {
            id: parseInt(params.id)
        }
    });

    if(!issue)
        return NextResponse.json({error: 'Invalid Issue'}, {status: 400});

    await prisma.issue.delete({
        where: {
            id: parseInt(params.id)
        }
    });

    return NextResponse.json({})
}