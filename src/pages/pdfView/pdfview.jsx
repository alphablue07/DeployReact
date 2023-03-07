// import dynamic from "next/dynamic";
import { lazy, Suspense } from "react";
import { useEffect, useState } from "react"


const InvoicePDF = lazy(() => import("../../components/media/pdf"), {
    ssr: false,
  });


const View = () => {

    // eslint-disable-next-line no-unused-vars
    const [client, setClient] = useState(false)

    useEffect(() => {
        setClient(true)
    }, [])

    return(
        <Suspense fallback={<div>Loading...</div>}>
            <InvoicePDF/>
        </Suspense>
    );
};


export default View