import { render, screen, within } from '@testing-library/react'
import { describe, expect, test, vi } from "vitest";
import Navbar from '../src/components/Navbar';
import SideMenu from '../src/components/SideMenu';
import SideButton from '../src/components/SideButton';
import { Uppdrag } from '@prisma/client';
import AssignmentData from '../src/components/AssignmentData';
import { prisma } from "../src/server/db"
import { createInnerTRPCContext } from "../src/server/api/trpc";
import { appRouter } from "../src/server/api/root";

vi.mock('next/router', () => require('next-router-mock')); //Needed for componens that use next/router

/*
* Test that Navbar renders correct
*/
// test('home', () => {
//     render(<Navbar />)
//     expect(screen.getByText( "MOTTAGNINGSKOMMITTÉN")).toBeDefined()
// })



/*
* Test that correct SideMenu renders, if user is MK/admin
*/
describe("SideMenu admin", async () => {
    const mkUser = await prisma.user.upsert({
        where: { email: 'test@test.test' },
        create: {
            name: 'Test Testsson',
            email: 'test@test.test',
            password: 'testing',
            nollk: 'MK',
            year: 2023,
            accepted: true
        },
        update: {}
    })

    const ctx = createInnerTRPCContext({
        session: {
            user: {...mkUser, isAdmin: mkUser.nollk === "MK" },
            expires: "1",
        },
    });

    const caller = appRouter.createCaller(ctx);

    test("show correct buttons for MK", async () => {
        await caller.user.getUserStatus();
        // const status = await caller.user.getUserStatus();
        // const nollk = await caller.user.getUserNollk({id: mkUser.id});
        // expect(status).toBe(true);
        // expect(nollk?.nollk).toBe("MK");

        render(<SideMenu/>);
        const sideMenu = within(screen.getByRole('navigation'))
        expect(sideMenu.getByRole('button', { name: /Granska/i })).toBeDefined()
        expect(sideMenu.getByRole('button', { name: /Konton/i })).toBeDefined()
        await caller.user.deleteUser({ id: mkUser.id });
    })
})

/*
* Test that correct SideMenu renders, if user is NollK
*/

// describe.todo("SideMenu not admin", async () => {
//     const dummyUser = await prisma.user.upsert({
//         where: { email: "test@test.com" },
//         create: {
//             name: "test",
//             nollk: "test",
//             email: "test@test.com",
//             password: "test",
//             accepted: true,
//             year: 2023
//         },
//         update: {
//             name: "test",
//         }
//     });

//     const ctx = createInnerTRPCContext({
//         session: {
//             user: {...dummyUser, isAdmin: dummyUser.nollk === "NollKIT" },
//             expires: "1",
//         },
//     });

//     test("show correct buttons for NollK", () => {
//         render(<SideMenu/>);
//         const sideMenu = within(screen.getByRole('navigation'))
//         expect(sideMenu.getByRole('button', { name: /Mina nolluppdrag/i })).toBeDefined()
//         expect(sideMenu.getByRole('button', { name: /Arkiv/i })).toBeDefined()
//     })
// })


// describe("SideButtons", () => {
//     test("should show all buttons with right naming", () => {
//         render(<SideButton link={'login'}>
//                 Chalmers nolluppdrag
//                 </SideButton>);
//         const sideButton = within(screen.getByRole('link'))
//         expect(sideButton.getByRole('button', { name: /Chalmers nolluppdrag/i })).toBeDefined()
//     })
//     // skipping testing the link for now
// })

// describe("AssignmentData", () => {
//     const testInfo: Uppdrag[] = [
//         {
//             year: 2023,
//             nollk: 'NollKIT',
//             author: {
//                 connect: {
//                     id: 'ITNollK'
//             }},
//             title: 'BrITney Spears',
//             desc: 'Nollan ska göra en parido på Britney spears musikvideo Oops I did it again.',
//             place: 'Campus',
//             time: 'Under Mottagningen',
//             participants: 4,
//             motivation: 'Banger uppdrag',
//             private: false
//         }
//     ];

//     test("Should print info about a Uppdrag for anyone viewing", () => {
//         render(<AssignmentData data={testInfo}/>);
//         const page = within(screen.getByRole('assignments'));
//         expect(page.getByText(/Hängigt uppdrag/i)).toBeDefined();
//         expect(page.getByText(/false/i)).toBeDefined();
//     })
// })
