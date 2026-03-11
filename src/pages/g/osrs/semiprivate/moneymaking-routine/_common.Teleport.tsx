interface Props {
    readonly name: string;
}

export default function Teleport({to}: Props) {
    return <span className="moneymaking-teleport">TELEPORT {to}</span>;
}

