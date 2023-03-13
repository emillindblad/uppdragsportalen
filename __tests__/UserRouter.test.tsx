import { createInnerTRPCContext } from "../src/server/api/trpc";
import { appRouter } from "../src/server/api/root";
import { describe, expect, test } from "vitest"
import { prisma } from "../src/server/db"
import { compareSync } from "bcrypt";


test("unauthed should not be able to fetch uppdrag", async () => {
    // Create InnerContext with no session, i.e not logged in
    const ctx = createInnerTRPCContext({ session: null });
    const caller = appRouter.createCaller(ctx);

    await expect(caller.uppdrag.getAll()).rejects.toThrowError();
})


describe('user', async () => {

    
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
        update: {
            name: "test",
        }
    });
    
    const ctx = createInnerTRPCContext({
        session: {
            user: {...dummyUser, isAdmin: dummyUser.nollk === "MK" },
            expires: "1",
        },
    });
    
    const caller = appRouter.createCaller(ctx);

    let userID: string;
    const userID2: string = dummyUser.id;


    test("fetch user by id", async () => {
        const userID = await caller.user.getUser({ id: dummyUser.id })
        expect(userID?.id).toBe(userID2);
    })

    test("fetch user nollk", async () => {
        const nollk = await caller.user.getUserNollk({ id: dummyUser.id })
        expect(nollk?.nollk).toBe("test");
    })

    test("update name and email", async () => {
        await caller.user.updateNameEmail({ id: dummyUser.id, name: "test2", email: "test2@test.com" })
        const updatedUser = await caller.user.getUser({ id: dummyUser.id })
        expect(updatedUser?.name).toBe("test2");
        expect(updatedUser?.email).toBe("test2@test.com");
    })

    test("update all info", async () => {

        await caller.user.updateAllInfo({ id: dummyUser.id, name: "test3", email: "test3@test.com", password: "test2" })
        const updatedUser = await caller.user.getUser({ id: dummyUser.id })
        expect(updatedUser?.name).toBe("test3");
        expect(updatedUser?.email).toBe("test3@test.com")
        const isPasswordSame = compareSync("test2", updatedUser!.password)
        expect(isPasswordSame).toBe(true)
    })
   
    test("get user status", async () => {
        const status = await caller.user.getUserStatus()
        expect(status).toBe(false)
    })

    test("register new user", async () => {
        const user = await caller.user.registerNewUser({ name: "test4", nollk: "test4", email: "test4@test.com", password: "test2" })
        userID = user.id
        const newUser = await caller.user.getUser({ id: userID })
        expect(newUser).toBeDefined()
    })

    test("get all users pending acceptance", async () => {
        const users = await caller.user.getAllUsersPendingAccept()
        expect(users.length).toBeGreaterThanOrEqual(1)
    })

    test("accept user", async () => {
        await caller.user.acceptUser({ id: userID })
        const newUser = await caller.user.getUser({ id: userID })
        expect(newUser?.accepted).toBe(true)
    })

    test("get all accepted users", async () => {
        const users = await caller.user.getAllAcceptedUsers()
        const newUser = users.find(user => user.id === userID)
        expect(newUser?.name).toBe("test4")
    })

    test("remove user", async () => {
        await caller.user.deleteUser({ id: userID })
        await caller.user.deleteUser({id: dummyUser.id})
        const newUser = await caller.user.getUser({ id: dummyUser.id})
        expect(newUser).toBeNull()
    })


    // run seed script


})
