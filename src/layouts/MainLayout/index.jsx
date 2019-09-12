import React from "react";
import {Header} from "../../containers";

export default class MainLayout extends React.Component {
    render() {
        return (
            <div>
                <Header/>
                {this.props.children}
            </div>
        )
    }
}
