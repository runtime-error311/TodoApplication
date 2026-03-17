import { ReactNode } from "react"
import { ErrorBoundary } from "react-error-boundary"
import { ErrorFallback } from "./ErrorFallback";

type Props = {
    children:ReactNode;
}
const ErrorWrapper = ({children}:Props)=>{
    return <ErrorBoundary FallbackComponent={ErrorFallback} >{children}</ErrorBoundary>
}

export default ErrorWrapper;