import Centered from "@components/Centered";
import Latex from "@components/Latex";

interface Props {
    readonly code: string;
}

export default function DisplayLatex({code}: Props) {
    return <Centered><p><Latex code={"\\displaystyle " + code} /></p></Centered>;
}

