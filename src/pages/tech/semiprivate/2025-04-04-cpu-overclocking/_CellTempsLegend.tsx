const content = `\
Ambient Temperature

Ryzen Master CCD0
Ryzen Master CCD1

CCD0 Core
CCD1 Core
CCD0 Tdie
CCD1 Tdie

CPU Package Power
Vcore
Wall Power

Ryzen Master PPT
Ryzen Master TDC
Ryzen Master EDC
`;

export default function CellTempsLegend() {
    return <td>{content}</td>
}
