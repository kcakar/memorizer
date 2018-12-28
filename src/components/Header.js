/*  eslint-disable no-unused-vars*/
import React from "react";
import {Button,Fab} from "rmwc"
import language from '../data/Language';



class Header extends React.Component{
    constructor(){
        super();
        this.renderUserSection=this.renderUserSection.bind(this);
    }

    renderUserSection(){
        const siteLang=this.props.settings.siteLanguage;
        return(
            <ul>
                <ul>
                    <li className="user-info">
                        <span>{this.props.user.userName}</span>
                    </li>
                    <ul>
                        <li><Button dense onClick={this.props.logout}>{language.header[siteLang].btn_logout}</Button></li>
                        <li><Button dense onClick={this.props.showWorkSets}>{language.header[siteLang].btn_worksets}</Button></li>
                    </ul>
                </ul>
                <li className="nav-settings" onClick={this.props.showSetup}>
                    <img src={this.props.user.photoURL} alt=""/>
                    <Fab className="btn-settings" mini>settings</Fab>
                </li>
            </ul>
        );
    }

    render(){
        return (
        <header>
            <div className="top-line"></div>
            <nav>
                <div className="brand" onClick={this.props.showLanding}>
                    <figure></figure>
                    <span>Memorizer</span>
                </div>
                {this.props.didLogin ? this.renderUserSection():""}
            </nav>
        </header>
        );
    }
}

export default Header