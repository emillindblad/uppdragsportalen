import { render, screen, within } from '@testing-library/react'
import { describe, expect, test, vi } from "vitest";
import MyApp from '../src/pages/_app'
import Navbar from '../src/components/Navbar';
import SideMenu from '../src/components/SideMenu';
import SideButton from '../src/components/SideButton';
import mockRouter from 'next-router-mock'
import { Uppdrag } from '@prisma/client';
import AssignmentData from '../src/components/AssignmentData';

vi.mock('next/router', () => require('next-router-mock')); //Needed for componens that use next/router

test('home', () => {
    render(<Navbar />)
    expect(screen.getByText( "MOTTAGNINGSKOMMITTÉN")).toBeDefined()
})

describe.todo("SideMenu isMk=true/false", () => {
    test("should show buttons for MK all the time", () => {
        render(<SideMenu/>);
        const sideMenu = within(screen.getByRole('navigation'))
        expect(sideMenu.getByRole('button', { name: /Granska/i })).toBeDefined()
        expect(sideMenu.getByRole('button', { name: /Konton/i })).toBeDefined()
    })

    test("should show buttons for NollK all the time", () => {
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
            id: "123",
            year: 2023,
            nollk: 'NollKIT',
            title: 'Hängigt uppdrag',
            desc: 'Sven hittar säkert på något som blir rent av nekat',
            place: 'Din mamma',
            time: '12:01',
            participants: 2,
            motivation: 'Hej PR!',
            private: false,
            authorId: 'MK',
            status: 'APPROVED'
        }
    ];

    test("Should print info about a Uppdrag for anyone viewing", () => {
        render(<AssignmentData data={testInfo}/>);
        const page = within(screen.getByRole('assignments'));
        expect(page.getByText(/Hängigt uppdrag/i)).toBeDefined();
        expect(page.getByText(/false/i)).toBeDefined();
    })
})
