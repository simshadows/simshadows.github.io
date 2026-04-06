interface Props {
    readonly to: string;
}

export default function Teleport({to}: Props) {
    return <span className="moneymaking-teleport">TELEPORT {to}</span>;
}

