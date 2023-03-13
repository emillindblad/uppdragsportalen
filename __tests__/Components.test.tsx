import { render, screen, within } from '@testing-library/react'
import { describe, expect, test, vi } from "vitest";
import Navbar from '../src/components/Navbar';
import SideMenu from '../src/components/SideMenu';
import SideButton from '../src/components/SideButton';
import { Uppdrag } from '@prisma/client';
import AssignmentData from '../src/components/AssignmentData';

vi.mock('next/router', () => require('next-router-mock')); //Needed for componens that use next/router

/*
* Test that Navbar renders correct
*/
test('home', () => {
    render(<Navbar />)
    expect(screen.getByText( "MOTTAGNINGSKOMMITTÉN")).toBeDefined()
})


/*
* Test that correct buttons renders, if user is MK or NollK
*/
describe.todo("SideMenu isMk=true/false", () => {
    test("show correct buttons for MK", () => {
        render(<SideMenu/>);
        const sideMenu = within(screen.getByRole('navigation'))
        expect(sideMenu.getByRole('button', { name: /Granska/i })).toBeDefined()
        expect(sideMenu.getByRole('button', { name: /Konton/i })).toBeDefined()
    })

    test("show correct buttons for NollK", () => {
        render(<SideMenu/>);
        const sideMenu = within(screen.getByRole('navigation'))
        expect(sideMenu.getByRole('button', { name: /Mina nolluppdrag/i })).toBeDefined()
        expect(sideMenu.getByRole('button', { name: /Arkiv/i })).toBeDefined()
    })
})

describe("SideButtons", () => {
    test("should show all buttons with right naming", () => {
        render(<SideButton link={'login'}>
                Chalmers nolluppdrag
                </SideButton>);
        const sideButton = within(screen.getByRole('link'))
        expect(sideButton.getByRole('button', { name: /Chalmers nolluppdrag/i })).toBeDefined()
    })
    // skipping testing the link for now
})

describe("AssignmentData", () => {
    const testInfo: Uppdrag[] = [
        {
            year: 2023,
            nollk: 'NollKIT',
            author: {
                connect: {
                    id: nollkitUser.id
            }},
            title: 'BrITney Spears',
            desc: 'Nollan ska göra en parido på Britney spears musikvideo Oops I did it again.',
            place: 'Campus',
            time: 'Under Mottagningen',
            participants: 4,
            motivation: 'Banger uppdrag',
            private: false
        }
    ];

    test("Should print info about a Uppdrag for anyone viewing", () => {
        render(<AssignmentData data={testInfo}/>);
        const page = within(screen.getByRole('assignments'));
        expect(page.getByText(/Hängigt uppdrag/i)).toBeDefined();
        expect(page.getByText(/false/i)).toBeDefined();
    })
})
