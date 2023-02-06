import type { inferProcedureInput } from "@trpc/server";
import { expect, test } from "vitest"
import { type AppRouter, appRouter } from "../src/server/api/root";
import { createInnerTRPCContext } from "../src/server/api/trpc";

test("uppdrag router", async () => {
    const ctx =  createInnerTRPCContext({ session: null });
    const caller = appRouter.createCaller(ctx);

    type Input = inferProcedureInput<AppRouter["example"]["hello"]>;
    const input: Input = {
        text: "test"
    };

    const example = await caller.example.hello(input);

    expect(example).toMatchObject({ greeting: "Hello test" })
});
