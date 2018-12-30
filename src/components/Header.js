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
            <li className="navigation__user">
                <div className="container">
                    <div className="user-info">
                        <span>{this.props.user.userName}</span>
                    </div>
                    <div className="buttons">
                        <Button dense onClick={this.props.logout}>{language.header[siteLang].btn_logout}</Button>
                    </div>
                </div>
                <div className="nav-settings" onClick={this.props.showSetup}>
                    <img src={this.props.user.photoURL} alt=""/>
                    <Fab className="btn-settings" mini>settings</Fab>
                </div>
            </li>
        );
    }

    render(){
        const siteLang=this.props.settings.siteLanguage;
        return (
        <header>
            <div className="top-line"></div>
            <nav>
                <div className="brand" onClick={this.props.showLanding}>
                    <figure></figure>
                    <span>Memorizer</span>
                </div>
                <ul className="navigation">
                    <li onClick={this.props.showYourSpace}>Your Space</li>
                    <li onClick={this.props.showWorkSets}>{language.header[siteLang].btn_worksets}</li>
                    {this.props.didLogin ? this.renderUserSection():""}
                </ul>
            </nav>
        </header>
        );
    }
}

export default Header