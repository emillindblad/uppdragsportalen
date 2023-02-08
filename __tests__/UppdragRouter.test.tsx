import type { inferProcedureInput } from "@trpc/server";
import { createInnerTRPCContext } from "../src/server/api/trpc";
import { type AppRouter, appRouter } from "../src/server/api/root";
import { expect, test } from "vitest"

const ctx =  createInnerTRPCContext({ session: null });
const caller = appRouter.createCaller(ctx);

test("uppdrag router", async () => {

    type Input = inferProcedureInput<AppRouter["example"]["hello"]>;
    const input: Input = {
        text: "test"
    };

    const example = await caller.example.hello(input);

    expect(example).toMatchObject({ greeting: "Hello test" })
});

test("get uppdrag from id", async () => {

    type Input = inferProcedureInput<AppRouter["uppdrag"]["getUppdragFromId"]>;
    const input: Input = {
        id: '123456789'
    }

    const example = await caller.uppdrag.getUppdragFromId(input);

    expect(example).toMatchObject(
        {
            id: '123456789',
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
    );
})
