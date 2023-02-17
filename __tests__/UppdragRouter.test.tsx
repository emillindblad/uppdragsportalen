import type { inferProcedureInput } from "@trpc/server";
import { createInnerTRPCContext } from "../src/server/api/trpc";
import { type AppRouter, appRouter } from "../src/server/api/root";
import { describe, expect, test } from "vitest"
import { prisma } from "../src/server/db"
import type { RouterInputs } from "../src/utils/api";


test("unauthed should not be able to fetch uppdrag", async () => {
    // Create InnerContext with no session, i.e not logged in
    const ctx = createInnerTRPCContext({ session: null });
    const caller = appRouter.createCaller(ctx);

    await expect(caller.uppdrag.getAll()).rejects.toThrowError();
})

describe('uppdrag', async () => {
    const user = await prisma.user.upsert({
        where: { email: "test@test.com" },
        create: {
            name: "test",
            nollk: "test",
            email: "test@test.com",
            password: "test",
            accepted: true,
            year: 2023
        },
        update: {}
    });
    const ctx = createInnerTRPCContext({
        session: {
            user,
            expires: "1",
        },
    });
    const caller = appRouter.createCaller(ctx);

    test("fetch all uppdrag ", async () => {
        const res = await caller.uppdrag.getAll();
        expect(res).toBeDefined();
    });

    test("create uppdrag", async () => {
        const input: RouterInputs["uppdrag"]["add"] = {
            year: 1969,
            nollk: 'MK',
            title: 'Secret MK uppdrag',
            desc: 'MK fick för sig att göra ett uppdrag',
            place: 'Macken',
            time: 'LP2',
            participants: 1000,
            motivation: 'Mycket bra',
            private: false
        }

        const user = await caller.uppdrag.add(input)
        const userById = await caller.uppdrag.getById({ id: user.id })

        expect(userById).toMatchObject(input);
    })

    test.todo("fetch all and delete one", async () => {
        const allUppdrag = await caller.uppdrag.getAll();
        const initalLength = allUppdrag.length;

        await caller.uppdrag.delete(input);
        const afterDeleteUppdrag = await caller.uppdrag.getAll();

        expect(afterDeleteUppdrag.length).lessThan(initalLength);


    })
})
