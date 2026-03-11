interface Props {
    readonly name: string;
}

export default function Plant({name}: Props) {
    return <span className="moneymaking-plant">PLANT {name}</span>;
}

