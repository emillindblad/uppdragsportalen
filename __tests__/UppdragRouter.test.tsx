import { createInnerTRPCContext } from "../src/server/api/trpc";
import { appRouter } from "../src/server/api/root";
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
    const dummyUser = await prisma.user.upsert({
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
            user: {...dummyUser, isAdmin: true },
            expires: "1",
        },
    });

    const caller = appRouter.createCaller(ctx);

    const input: RouterInputs["uppdrag"]["create"] = {
        year: 2023,
        nollk: 'test',
        status: 'SUBMITTED',
        title: 'test',
        desc: 'test',
        place: 'test',
        time: 'test',
        participants: 9999,
        motivation: 'test',
        private: false,
        status: 'DRAFT'
    }

    const uppdrag = await caller.uppdrag.create(input)
    const uppdragById = await caller.uppdrag.getById({ id: uppdrag.id })

    test("fetch by year", async () => {
        const byYear = await caller.uppdrag.getByYear({ year: 2023 })
        expect(byYear.length).toBeGreaterThanOrEqual(1);
    })

    test("create uppdrag", () => {
        expect(uppdragById).toMatchObject(input);
    })

    test("fetch all and delete one", async () => {
        const allUppdrag = await caller.uppdrag.getAll();
        const initalLength = allUppdrag.length;

        await caller.uppdrag.delete({ id: uppdrag.id });
        const afterDeleteUppdrag = await caller.uppdrag.getAll();

        expect(afterDeleteUppdrag.length).lessThan(initalLength);
    })
})
