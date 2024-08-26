import { BarLoader, HashLoader } from "react-spinners";


function MyLoader() {
    return <>
        <div style={{position: "absolute", top: 0}}>
            <BarLoader color="#171d4a" width={"100vw"} />
        </div>
    </>
}

export default MyLoader;