import { render, screen, within } from '@testing-library/react'
import { describe, expect, test, vi } from "vitest";
import Navbar from '../src/components/Navbar';
import SideMenu from '../src/components/SideMenu';
import mockRouter from 'next-router-mock'

vi.mock('next/router', () => require('next-router-mock')); //Needed for componens that use next/router

test('home', () => {
    render(<Navbar />)
    expect(screen.getByText( "MOTTAGNINGSKOMMITTÉN")).toBeDefined()
})

describe("SideMenu isMk=true test button", () => {
    test("should show button Granska all the time", () => {
        render(<SideMenu isMK = {true}/>);
        const sideMenu = within(screen.getByRole('navigation'))
        expect(sideMenu.getByRole('button', { name: /Granska/i })).toBeDefined()
    })
})