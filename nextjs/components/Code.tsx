import {PropsWithChildren} from "react";

export function Code({children}: PropsWithChildren) {
    return <span className={'border rounded border-blue-700 bg-blue-100 text-blue-600 py-0.5 px-1'}>{children}</span>
}