import {Component} from "preact";

import {type JSXChildren} from "@root/tech-debt";

import "./SpoilerBlock.css";

interface Props {
    readonly children: JSXChildren;
    readonly buttonLabel?: string;
    readonly expandByDefault?: boolean;
}

interface State {
    expanded: boolean;
}

export default class SpoilerBlock extends Component<Props, State> {
    constructor(props: Props) {
        super();
        this.handleButtonClick = this.handleButtonClick.bind(this);

        this.state = {
            expanded: !!props.expandByDefault,
        };
    }

    handleButtonClick() {
        this.setState((state) => ({expanded: !state.expanded}));
    }

    render() {
        const buttonLabel: string =
            (this.props.buttonLabel)
            ? this.props.buttonLabel
            : "Spoiler";

        if (this.state.expanded) {
            return <p>
                <div className="spoiler-block">
                    <button type="button" onClick={this.handleButtonClick}>
                        {/* this.state.expanded ? `Hide ${buttonLabel}` : `Show ${buttonLabel}` */}
                        {`Hide ${buttonLabel}`}
                    </button>
                    {this.state.expanded && this.props.children}
                </div>
            </p>;
        } else {
            return <p><button type="button" onClick={this.handleButtonClick}>
                {`Show ${buttonLabel}`}
            </button></p>;
        }

    }
}

