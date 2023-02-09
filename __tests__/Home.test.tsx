import { render, screen, within } from '@testing-library/react'
import { describe, expect, test } from "vitest";
import Navbar from '../src/components/Navbar';

test('home', () => {
    //expect(1).equals(1);
    render(<Navbar />)
    expect(screen.getByText( "MOTTAGNINGSKOMMITTÉN")).toBeDefined()
    //const main = within(screen.getByRole('main'))
    //expect(
        //main.getByRole('heading', { level: 1, name: /welcome to next\.js!/i })
    //).toBeDefined()
    //const footer = within(screen.getByRole('contentinfo'))
    //const link = within(footer.getByRole('link'))
    //expect(link.getByRole('img', { name: /vercel logo/i })).toBeDefined()
})
