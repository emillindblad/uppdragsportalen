import type { FC } from "react"

export const ErrorText: FC<{text: string}> = ({ text }) => {
    return (
        <p className="mt-1 text-sm text-red-500">{text}</p>
    )
}
